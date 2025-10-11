import fs from 'fs';
import path from 'path';

const MINTED_NFTS_FILE = path.join(__dirname, '../../../minted-nfts.json');

// Initialize minted NFTs file if it doesn't exist
if (!fs.existsSync(MINTED_NFTS_FILE)) {
  fs.writeFileSync(MINTED_NFTS_FILE, JSON.stringify({}), 'utf-8');
}

export class MintedNFTTracker {
  static getMintedNFTs(): Record<string, any> {
    try {
      const data = fs.readFileSync(MINTED_NFTS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  }

  private static saveMintedNFTs(data: Record<string, any>): void {
    fs.writeFileSync(MINTED_NFTS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  }

  static isMinted(tokenId: number): boolean {
    const mintedNFTs = this.getMintedNFTs();
    return !!mintedNFTs[tokenId.toString()];
  }

  static markAsMinted(tokenId: number, owner: string, transactionHash: string): void {
    const mintedNFTs = this.getMintedNFTs();
    mintedNFTs[tokenId.toString()] = {
      tokenId,
      owner: owner.toLowerCase(),
      transactionHash,
      mintedAt: new Date().toISOString(),
    };
    this.saveMintedNFTs(mintedNFTs);
  }

  static getMintedByOwner(owner: string): any[] {
    const mintedNFTs = this.getMintedNFTs();
    return Object.values(mintedNFTs).filter((nft: any) =>
      nft.owner.toLowerCase() === owner.toLowerCase()
    );
  }

  static getAllMinted(): any[] {
    const mintedNFTs = this.getMintedNFTs();
    return Object.values(mintedNFTs);
  }
}
