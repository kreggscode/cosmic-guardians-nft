import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { getNFTs, NFT } from '@/lib/api';
import NFTCard from '@/components/NFTCard';
import MintModal from '@/components/MintModal';
import { Loader2, AlertCircle } from 'lucide-react';

export default function MintPage() {
  const { isConnected } = useAccount();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [filter, setFilter] = useState<'all' | 'available' | 'minted'>('available');

  useEffect(() => {
    loadNFTs();
  }, [filter]);

  const loadNFTs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data: NFT[];
      if (filter === 'available') {
        data = await getNFTs(false);
      } else if (filter === 'minted') {
        data = await getNFTs(true);
      } else {
        data = await getNFTs();
      }
      
      setNfts(data);
    } catch (err: any) {
      console.error('Failed to load NFTs:', err);
      setError(err.message || 'Failed to load NFTs');
    } finally {
      setLoading(false);
    }
  };

  const handleMintSuccess = () => {
    loadNFTs();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Mint Your NFT
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Choose from our exclusive collection and mint your favorite NFT
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-lg bg-white p-1 shadow-md dark:bg-gray-800">
          <button
            onClick={() => setFilter('available')}
            className={`rounded-lg px-6 py-2 text-sm font-medium transition-all ${
              filter === 'available'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            Available
          </button>
          <button
            onClick={() => setFilter('minted')}
            className={`rounded-lg px-6 py-2 text-sm font-medium transition-all ${
              filter === 'minted'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            Minted
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`rounded-lg px-6 py-2 text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* Wallet Connection Warning */}
      {!isConnected && (
        <div className="mx-auto max-w-2xl rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            <div>
              <p className="font-medium text-yellow-900 dark:text-yellow-300">
                Wallet Not Connected
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                Please connect your wallet to mint NFTs
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mx-auto max-w-2xl rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <div>
              <p className="font-medium text-red-900 dark:text-red-300">Error</p>
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* NFT Grid */}
      {!loading && !error && (
        <>
          {nfts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                No NFTs found in this category
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {nfts.map((nft) => (
                <NFTCard
                  key={nft.tokenId}
                  nft={nft}
                  onMintSuccess={() => setSelectedNFT(null)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Mint Modal */}
      {selectedNFT && (
        <MintModal
          nft={selectedNFT}
          isOpen={!!selectedNFT}
          onClose={() => setSelectedNFT(null)}
          onSuccess={handleMintSuccess}
        />
      )}
    </div>
  );
}
