import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`;
}

export function formatPrice(price: string): string {
  const num = parseFloat(price);
  if (num >= 1) {
    return num.toFixed(4);
  }
  return num.toFixed(6);
}

export function ipfsToGateway(ipfsUri: string): string {
  if (!ipfsUri || typeof ipfsUri !== 'string') {
    return 'https://via.placeholder.com/400x400?text=No+Image'; // Fallback image
  }

  if (ipfsUri.startsWith('ipfs://')) {
    const hash = ipfsUri.replace('ipfs://', '');
    return `https://ipfs.io/ipfs/${hash}`; // Using ipfs.io instead of Pinata
  }
  return ipfsUri;
}
