import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface NFT {
  _id: string;
  tokenId: number;
  name: string;
  description: string;
  image: string;
  imageHash: string;
  metadata: string;
  metadataHash: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  price: string;
  owner?: string;
  minted: boolean;
  mintedAt?: string;
  transactionHash?: string;
}

export interface Voucher {
  tokenId: number;
  price: string;
  tokenURI: string;
  signature: string;
}

export interface Currency {
  symbol: string;
  name: string;
  priceUSD: number;
}

export interface CollectionStats {
  total: number;
  minted: number;
  available: number;
  floorPrice: string;
  totalVolume: string;
}

// NFT endpoints
export const getNFTs = async (minted?: boolean) => {
  const response = await api.get('/nft', { params: { minted } });
  return response.data.data as NFT[];
};

export const getNFTByTokenId = async (tokenId: number) => {
  const response = await api.get(`/nft/${tokenId}`);
  return response.data.data as NFT;
};

export const getNFTsByOwner = async (address: string) => {
  const response = await api.get(`/nft/owner/${address}`);
  return response.data.data as NFT[];
};

export const getVoucher = async (tokenId: number, buyer: string) => {
  const response = await api.post(`/nft/voucher/${tokenId}`, { buyer });
  return response.data.data as Voucher;
};

export const markAsMinted = async (
  tokenId: number,
  owner: string,
  transactionHash: string
) => {
  const response = await api.post(`/nft/minted/${tokenId}`, {
    owner,
    transactionHash,
  });
  return response.data.data as NFT;
};

export const getCollectionStats = async () => {
  const response = await api.get('/nft/stats/collection');
  return response.data.data as CollectionStats;
};

// Payment endpoints
export const getSupportedCurrencies = async () => {
  const response = await api.get('/payment/currencies');
  return response.data.data as Currency[];
};

export const calculatePrice = async (tokenId: number, currency: string) => {
  const response = await api.post('/payment/calculate', { tokenId, currency });
  return response.data.data;
};

export default api;
