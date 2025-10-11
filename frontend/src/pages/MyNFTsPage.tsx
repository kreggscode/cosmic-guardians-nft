import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { getNFTsByOwner, NFT } from '@/lib/api';
import NFTCard from '@/components/NFTCard';
import { Loader2, AlertCircle, Package } from 'lucide-react';

export default function MyNFTsPage() {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && address) {
      loadMyNFTs();
    } else {
      setLoading(false);
    }
  }, [address, isConnected]);

  const loadMyNFTs = async () => {
    if (!address) return;

    try {
      setLoading(true);
      setError(null);
      const data = await getNFTsByOwner(address);
      setNfts(data);
    } catch (err: any) {
      console.error('Failed to load NFTs:', err);
      setError(err.message || 'Failed to load your NFTs');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 h-16 w-16 text-gray-400" />
          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            Wallet Not Connected
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please connect your wallet to view your NFTs
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          My NFT Collection
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          View all the NFTs you own from this collection
        </p>
      </div>

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
            <div className="flex min-h-[40vh] items-center justify-center">
              <div className="text-center">
                <Package className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  No NFTs Yet
                </h2>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                  You haven't minted any NFTs from this collection yet
                </p>
                <a
                  href="/mint"
                  className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-medium text-white hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <span>Browse Collection</span>
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                <p className="text-center text-gray-600 dark:text-gray-400">
                  You own <span className="font-bold text-purple-600 dark:text-purple-400">{nfts.length}</span> NFT{nfts.length !== 1 ? 's' : ''} from this collection
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {nfts.map((nft) => (
                  <NFTCard key={nft.tokenId} nft={nft} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
