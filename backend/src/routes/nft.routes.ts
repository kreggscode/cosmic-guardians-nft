import express from 'express';
import multer from 'multer';
import { NFTController } from '../controllers/nft.controller';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const nftController = new NFTController();

// Get all NFTs
router.get('/', nftController.getAllNFTs);

// Get NFT by token ID
router.get('/:tokenId', nftController.getNFTByTokenId);

// Get NFTs by owner
router.get('/owner/:address', nftController.getNFTsByOwner);

// Create new NFT (upload image and metadata)
router.post('/create', upload.single('image'), nftController.createNFT);

// Get voucher for minting
router.post('/voucher/:tokenId', nftController.getVoucher);

// Mark NFT as minted (called after successful blockchain transaction)
router.post('/minted/:tokenId', nftController.markAsMinted);

// Get collection stats
router.get('/stats/collection', nftController.getCollectionStats);

export default router;
