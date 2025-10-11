import { useState } from 'react';
import { useAccount } from 'wagmi';
import { CheckCircle, Loader2, Coins } from 'lucide-react';
import { NFT } from '@/lib/api';
import { formatPrice, ipfsToGateway } from '@/lib/utils';
import MintModal from './MintModal';

interface NFTCardProps {
  nft: NFT;
  onMintSuccess?: () => void;
}

export default function NFTCard({ nft, onMintSuccess }: NFTCardProps) {
  const { isConnected } = useAccount();
  const [showMintModal, setShowMintModal] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  // Check if NFT is minted based on the API response
  const isMinted = nft.minted;

  // Get rarity from attributes
  const rarity = nft.attributes?.find(attr => attr.trait_type === 'Rarity')?.value || 'Common';

  const handleMintClick = () => {
    if (isMinted) {
      // Show already minted message
      alert('This NFT has already been minted!');
      return;
    }
    setShowMintModal(true);
  };

  const handleMintSuccess = () => {
    setIsMinting(false);
    setShowMintModal(false);
    onMintSuccess?.();
  };

  return (
    <>
      <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-2xl dark:bg-gray-800">
        {/* Minted Badge */}
        {isMinted && (
          <div className="absolute top-4 right-4 z-10 flex items-center space-x-1 rounded-full bg-green-500 px-3 py-1 text-xs font-medium text-white">
            <CheckCircle className="h-3 w-3" />
            <span>Minted</span>
          </div>
        )}

        {/* Image */}
        <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={ipfsToGateway(nft.image)}
            alt={nft.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {nft.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              #{nft.tokenId}
            </p>
          </div>

          {/* Rarity Badge */}
          <div className="mb-4">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              rarity === 'Legendary' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
              rarity === 'Epic' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
              rarity === 'Rare' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
              'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
            }`}>
              {rarity}
            </span>
          </div>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {nft.description}
          </p>

          {/* Price */}
          <div className="mb-4">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {formatPrice(nft.price)} ETH
            </p>
            <p className="text-xs text-gray-500">
              Gas fees additional
            </p>
          </div>

          {/* Mint Button */}
          <button
            onClick={handleMintClick}
            disabled={!isConnected || isMinting}
            className={`w-full rounded-lg py-3 font-medium transition-all ${
              isMinted
                ? 'bg-green-600 text-white cursor-not-allowed opacity-75'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isMinting ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Minting...</span>
              </div>
            ) : isMinted ? (
              <div className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Already Minted</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Coins className="h-4 w-4" />
                <span>Mint Now</span>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mint Modal */}
      <MintModal
        nft={nft}
        isOpen={showMintModal}
        onClose={() => setShowMintModal(false)}
        onSuccess={handleMintSuccess}
      />
    </>
  );
}
