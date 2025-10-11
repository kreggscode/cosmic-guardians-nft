import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export interface IPFSUploadResult {
  hash: string;
  url: string;
  gateway: string;
}

export class IPFSService {
  private pinataApiKey: string;
  private pinataSecretKey: string;
  private pinataJWT?: string;

  constructor() {
    this.pinataApiKey = process.env.PINATA_API_KEY || '';
    this.pinataSecretKey = process.env.PINATA_SECRET_KEY || '';
    this.pinataJWT = process.env.PINATA_JWT;
  }

  /**
   * Upload file to IPFS via Pinata
   */
  async uploadFile(filePath: string, filename: string): Promise<IPFSUploadResult> {
    try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(filePath), filename);

      const metadata = JSON.stringify({
        name: filename,
      });
      formData.append('pinataMetadata', metadata);

      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
            pinata_api_key: this.pinataApiKey,
            pinata_secret_api_key: this.pinataSecretKey,
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      const hash = response.data.IpfsHash;
      return {
        hash,
        url: `ipfs://${hash}`,
        gateway: `https://gateway.pinata.cloud/ipfs/${hash}`,
      };
    } catch (error) {
      console.error('IPFS upload error:', error);
      throw new Error('Failed to upload file to IPFS');
    }
  }

  /**
   * Upload JSON metadata to IPFS
   */
  async uploadJSON(data: any, name: string): Promise<IPFSUploadResult> {
    try {
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        {
          pinataContent: data,
          pinataMetadata: {
            name,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            pinata_api_key: this.pinataApiKey,
            pinata_secret_api_key: this.pinataSecretKey,
          },
        }
      );

      const hash = response.data.IpfsHash;
      return {
        hash,
        url: `ipfs://${hash}`,
        gateway: `https://gateway.pinata.cloud/ipfs/${hash}`,
      };
    } catch (error) {
      console.error('IPFS JSON upload error:', error);
      throw new Error('Failed to upload JSON to IPFS');
    }
  }

  /**
   * Create NFT metadata and upload to IPFS
   */
  async createAndUploadMetadata(
    name: string,
    description: string,
    imageHash: string,
    attributes: Array<{ trait_type: string; value: string | number }>
  ): Promise<IPFSUploadResult> {
    const metadata = {
      name,
      description,
      image: `ipfs://${imageHash}`,
      attributes,
    };

    return this.uploadJSON(metadata, `${name}-metadata.json`);
  }

  /**
   * Get IPFS gateway URL
   */
  getGatewayUrl(hash: string): string {
    return `https://gateway.pinata.cloud/ipfs/${hash}`;
  }

  /**
   * Convert IPFS URI to gateway URL
   */
  ipfsToGateway(ipfsUri: string): string {
    if (ipfsUri.startsWith('ipfs://')) {
      const hash = ipfsUri.replace('ipfs://', '');
      return this.getGatewayUrl(hash);
    }
    return ipfsUri;
  }
}

// Singleton instance
let ipfsServiceInstance: IPFSService | null = null;

export const getIPFSService = (): IPFSService => {
  if (!ipfsServiceInstance) {
    ipfsServiceInstance = new IPFSService();
  }
  return ipfsServiceInstance;
};
