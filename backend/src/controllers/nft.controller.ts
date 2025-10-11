import { Request, Response } from 'express';
import { NFTModel } from '../models/NFT.model';
import { getVoucherService } from '../services/voucher.service';
import { getIPFSService } from '../services/ipfs.service';
import { MintedNFTTracker } from '../services/minted-tracker.service';
import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';

export class NFTController {
  /**
   * Get all NFTs
   */
  async getAllNFTs(req: Request, res: Response) {
    try {
      const { minted, limit = 50, offset = 0 } = req.query;

      // Try to load from nfts.json (backend data)
      try {
        const nftsPath = path.join(__dirname, '../data/nfts.json');
        const nftsData = JSON.parse(fs.readFileSync(nftsPath, 'utf-8'));
        
        // Convert to NFT format
        const nfts = nftsData.map((nft: any) => {
          return {
            tokenId: nft.tokenId,
            name: nft.name,
            description: nft.description,
            image: nft.image,
            imageHash: nft.imageHash,
            metadata: nft.metadata,
            metadataHash: nft.metadataHash,
            metadataGateway: nft.metadataGateway,
            attributes: nft.attributes,
            price: nft.price || '0.05',
            priceWei: ethers.parseEther(nft.price || '0.05').toString(),
            rarity: nft.attributes?.find((a: any) => a.trait_type === 'Rarity')?.value || 'Common',
            minted: MintedNFTTracker.isMinted(nft.tokenId),
            owner: null,
          };
        });

        // Filter by minted status if specified
        const filteredNFTs = minted !== undefined 
          ? nfts.filter(nft => nft.minted === (minted === 'true'))
          : nfts;

        // Apply pagination
        const paginatedNFTs = filteredNFTs.slice(Number(offset), Number(offset) + Number(limit));

        return res.json({
          success: true,
          data: paginatedNFTs,
          pagination: {
            total: filteredNFTs.length,
            limit: Number(limit),
            offset: Number(offset),
          },
        });
      } catch (fileError) {
        // If uploaded.json doesn't exist, return error
        console.error('uploaded.json not found:', fileError);
        return res.status(500).json({ 
          success: false, 
          error: 'NFT data not available. Please upload NFTs to IPFS first.' 
        });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Get NFT by token ID
   */
  async getNFTByTokenId(req: Request, res: Response) {
    try {
      const { tokenId } = req.params;
      const nft = await NFTModel.findOne({ tokenId: Number(tokenId) });

      if (!nft) {
        return res.status(404).json({ success: false, error: 'NFT not found' });
      }

      res.json({ success: true, data: nft });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Get NFTs by owner address
   */
  async getNFTsByOwner(req: Request, res: Response) {
    try {
      const { address } = req.params;

      // Try to load from uploaded.json (REAL IPFS data)
      try {
        const uploadedPath = path.join(__dirname, '../../../art-generator/uploaded.json');
        const uploadedData = JSON.parse(fs.readFileSync(uploadedPath, 'utf-8'));

        // Convert uploaded IPFS data to NFT format and filter by owner
        const ownedNFTs = Object.entries(uploadedData.metadata)
          .map(([tokenId, data]: [string, any]) => {
            const imageHash = uploadedData.images[tokenId]?.hash;
            return {
              tokenId: Number(tokenId),
              name: data.metadata.name,
              description: data.metadata.description,
              // Use IPFS.io gateway (better rate limiting than Pinata)
              image: imageHash ? `https://ipfs.io/ipfs/${imageHash}` : data.metadata.image,
              imageHash: imageHash,
              metadata: data.url,
              metadataHash: data.hash,
              metadataGateway: data.gateway,
              attributes: data.metadata.attributes,
              price: data.metadata.price || '0.05', // Return as readable ETH string
              priceWei: ethers.parseEther(data.metadata.price || '0.05').toString(), // Keep wei for contract
              rarity: data.metadata.attributes.find((a: any) => a.trait_type === 'Rarity')?.value || 'Common',
              minted: MintedNFTTracker.isMinted(Number(tokenId)), // Check if minted
              owner: MintedNFTTracker.isMinted(Number(tokenId)) ? MintedNFTTracker.getMintedNFTs()[tokenId]?.owner : null,
              transactionHash: MintedNFTTracker.isMinted(Number(tokenId)) ? MintedNFTTracker.getMintedNFTs()[tokenId]?.transactionHash : null,
              mintedAt: MintedNFTTracker.isMinted(Number(tokenId)) ? MintedNFTTracker.getMintedNFTs()[tokenId]?.mintedAt : null,
            };
          })
          .filter(nft => nft.minted && nft.owner?.toLowerCase() === address.toLowerCase());

        return res.json({ success: true, data: ownedNFTs });
      } catch (fileError) {
        // If uploaded.json doesn't exist, try MongoDB
        const nfts = await NFTModel.find({ owner: address.toLowerCase(), minted: true });

        res.json({ success: true, data: nfts });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Create new NFT (upload to IPFS and save to database)
   */
  async createNFT(req: Request, res: Response) {
    try {
      const { name, description, attributes, price } = req.body;
      const imageFile = req.file;

      if (!imageFile) {
        return res.status(400).json({ success: false, error: 'Image file required' });
      }

      // Upload image to IPFS
      const ipfsService = getIPFSService();
      const imageResult = await ipfsService.uploadFile(
        imageFile.path,
        imageFile.originalname
      );

      // Parse attributes
      const parsedAttributes = attributes ? JSON.parse(attributes) : [];

      // Create and upload metadata
      const metadataResult = await ipfsService.createAndUploadMetadata(
        name,
        description,
        imageResult.hash,
        parsedAttributes
      );

      // Get next token ID
      const lastNFT = await NFTModel.findOne().sort({ tokenId: -1 });
      const tokenId = lastNFT ? lastNFT.tokenId + 1 : 1;

      // Save to database
      const nft = new NFTModel({
        tokenId,
        name,
        description,
        image: imageResult.url,
        imageHash: imageResult.hash,
        metadata: metadataResult.url,
        metadataHash: metadataResult.hash,
        attributes: parsedAttributes,
        price: price || ethers.parseEther('0.05').toString(),
        minted: false,
      });

      await nft.save();

      // Clean up uploaded file
      fs.unlinkSync(imageFile.path);

      res.json({
        success: true,
        data: {
          nft,
          imageGateway: imageResult.gateway,
          metadataGateway: metadataResult.gateway,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Get voucher for minting
   */
  async getVoucher(req: Request, res: Response) {
    try {
      const { tokenId } = req.params;
      const { buyer } = req.body;

      if (!buyer) {
        return res.status(400).json({ success: false, error: 'Buyer address required' });
      }

      // Try to get NFT from uploaded.json
      try {
        const uploadedPath = path.join(__dirname, '../../../art-generator/uploaded.json');
        const uploadedData = JSON.parse(fs.readFileSync(uploadedPath, 'utf-8'));
        
        const nftData = uploadedData.metadata[tokenId];
        if (!nftData) {
          return res.status(404).json({ success: false, error: 'NFT not found' });
        }

        // Get NFT details
        const nft = {
          tokenId: Number(tokenId),
          price: nftData.metadata.price || '0.05',
          metadata: nftData.url,
          minted: false,
        };

        // Create voucher using ethers - MUST match contract's _hashVoucher function
        const voucher = {
          tokenId: nft.tokenId,
          price: ethers.parseEther(nft.price),
          tokenURI: nft.metadata,
        };

        // Hash exactly like the contract: keccak256(abi.encodePacked(tokenId, price, tokenURI))
        const messageHash = ethers.keccak256(
          ethers.solidityPacked(['uint256', 'uint256', 'string'], [voucher.tokenId, voucher.price, voucher.tokenURI])
        );

        // Sign the raw hash directly (this creates the signature that recover() expects)
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
        const signature = await wallet.signMessage(ethers.getBytes(messageHash));

        res.json({
          success: true,
          data: {
            tokenId: voucher.tokenId,
            price: voucher.price.toString(),
            tokenURI: voucher.tokenURI,
            signature: signature,
          },
        });
      } catch (fileError) {
        return res.status(500).json({ success: false, error: 'Unable to create voucher' });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Mark NFT as minted (called after successful transaction)
   */
  async markAsMinted(req: Request, res: Response) {
    try {
      const { tokenId } = req.params;
      const { owner, transactionHash } = req.body;

      if (!owner || !transactionHash) {
        return res.status(400).json({
          success: false,
          error: 'Owner address and transaction hash required',
        });
      }

      // Mark as minted using tracker
      MintedNFTTracker.markAsMinted(Number(tokenId), owner, transactionHash);

      // Return success response
      res.json({
        success: true,
        data: {
          tokenId: Number(tokenId),
          owner: owner.toLowerCase(),
          transactionHash,
          minted: true,
          mintedAt: new Date().toISOString(),
        }
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Get collection statistics
   */
  async getCollectionStats(req: Request, res: Response) {
    try {
      // Try to get stats from uploaded.json
      try {
        const uploadedPath = path.join(__dirname, '../../../art-generator/uploaded.json');
        const uploadedData = JSON.parse(fs.readFileSync(uploadedPath, 'utf-8'));
        
        const nfts = Object.entries(uploadedData.metadata).map(([tokenId, data]: [string, any]) => ({
          tokenId: Number(tokenId),
          price: data.metadata.price || '0.05',
          minted: false,
        }));

        const total = nfts.length;
        const minted = 0; // No NFTs minted yet
        const available = total;
        const floorPrice = Math.min(...nfts.map(nft => parseFloat(nft.price)));
        const totalVolume = 0; // No volume yet

        res.json({
          success: true,
          data: {
            total,
            minted,
            available,
            floorPrice: floorPrice.toString(),
            totalVolume: totalVolume.toString(),
          },
        });
      } catch (fileError) {
        // Fallback to basic stats
        res.json({
          success: true,
          data: {
            total: 15,
            minted: 0,
            available: 15,
            floorPrice: '0.05',
            totalVolume: '0',
          },
        });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
