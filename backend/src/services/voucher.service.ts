import { ethers } from 'ethers';

export interface NFTVoucher {
  tokenId: number;
  price: string;
  tokenURI: string;
  signature: string;
}

export class VoucherService {
  private signer: ethers.Wallet;

  constructor(privateKey: string) {
    this.signer = new ethers.Wallet(privateKey);
  }

  /**
   * Create a signed voucher for lazy minting
   */
  async createVoucher(
    tokenId: number,
    price: string,
    tokenURI: string
  ): Promise<NFTVoucher> {
    // Create hash of voucher data (must match contract's _hashVoucher)
    const hash = ethers.solidityPackedKeccak256(
      ['uint256', 'uint256', 'string'],
      [tokenId, price, tokenURI]
    );

    // Sign the hash
    const signature = await this.signer.signMessage(ethers.getBytes(hash));

    return {
      tokenId,
      price,
      tokenURI,
      signature,
    };
  }

  /**
   * Verify a voucher signature
   */
  verifyVoucher(voucher: NFTVoucher): boolean {
    try {
      const hash = ethers.solidityPackedKeccak256(
        ['uint256', 'uint256', 'string'],
        [voucher.tokenId, voucher.price, voucher.tokenURI]
      );

      const recoveredAddress = ethers.verifyMessage(
        ethers.getBytes(hash),
        voucher.signature
      );

      return recoveredAddress.toLowerCase() === this.signer.address.toLowerCase();
    } catch (error) {
      console.error('Voucher verification error:', error);
      return false;
    }
  }

  /**
   * Get signer address
   */
  getSignerAddress(): string {
    return this.signer.address;
  }
}

// Singleton instance
let voucherServiceInstance: VoucherService | null = null;

export const getVoucherService = (): VoucherService => {
  if (!voucherServiceInstance) {
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('PRIVATE_KEY not configured in environment');
    }
    voucherServiceInstance = new VoucherService(privateKey);
  }
  return voucherServiceInstance;
};
