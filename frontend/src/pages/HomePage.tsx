import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCollectionStats, CollectionStats } from '@/lib/api';
import { TrendingUp, Package, DollarSign, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [stats, setStats] = useState<CollectionStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getCollectionStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl animate-fade-in">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
              Cosmic Guardians
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">NFT Collection</span>
          </h1>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-400 animate-fade-in-delay">
            Collect legendary guardians from across the cosmos. Each NFT is unique with gasless minting
            and multi-currency support.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-delay-2">
            <Link
              to="/mint"
              className="group flex items-center space-x-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg font-medium text-white hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              <span>Start Minting</span>
            </Link>
            <a
              href="#features"
              className="rounded-lg border-2 border-purple-600 px-8 py-4 text-lg font-medium text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-900/20 transition-all hover:scale-105 transform"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {!loading && stats && (
        <section className="grid gap-6 md:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all hover:scale-105 transform animate-slide-up">
            <div className="mb-2 flex items-center justify-between">
              <Package className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.total}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Supply</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all hover:scale-105 transform animate-slide-up-delay">
            <div className="mb-2 flex items-center justify-between">
              <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.minted}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Minted</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all hover:scale-105 transform animate-slide-up-delay-2">
            <div className="mb-2 flex items-center justify-between">
              <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.available}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800 hover:shadow-xl transition-all hover:scale-105 transform animate-slide-up-delay-3">
            <div className="mb-2 flex items-center justify-between">
              <DollarSign className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {parseFloat(stats.floorPrice).toFixed(4)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Floor Price (ETH)</p>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section id="features" className="space-y-8">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Why Choose Our NFTs?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Innovative features that make minting easy and affordable
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              Gasless Minting
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              We use lazy minting technology. You don't pay any gas fees until someone buys
              your NFT. The buyer pays all costs!
            </p>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              Multi-Currency Support
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Pay with ETH, BTC, USDT, USDC, or other cryptocurrencies. We support multiple
              payment options for your convenience.
            </p>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-lg dark:bg-gray-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
              <Package className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              IPFS Storage
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              All NFT images and metadata are stored on IPFS, ensuring permanent and
              decentralized storage of your digital assets.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-12 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mb-8 text-lg opacity-90">
          Connect your wallet and start minting exclusive NFTs today
        </p>
        <Link
          to="/mint"
          className="inline-flex items-center space-x-2 rounded-lg bg-white px-8 py-4 text-lg font-medium text-purple-600 hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
        >
          <Sparkles className="h-5 w-5" />
          <span>Browse Collection</span>
        </Link>
      </section>
    </div>
  );
}
