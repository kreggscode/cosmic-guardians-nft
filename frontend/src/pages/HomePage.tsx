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
    <div className="space-y-12 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-delay"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-float-delay-2"></div>
      </div>

      {/* Hero Section */}
      <section className="text-center relative">
        <div className="mx-auto max-w-4xl">
          {/* Glowing Badge */}
          <div className="mb-6 inline-flex items-center space-x-2 rounded-full bg-purple-100 dark:bg-purple-900/30 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 animate-fade-in">
            <Sparkles className="h-4 w-4 animate-pulse" />
            <span>Limited Collection • 15 Unique NFTs</span>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl animate-fade-in">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Cosmic Guardians
            </span>
            <br />
            <span className="text-gray-900 dark:text-white drop-shadow-lg">NFT Collection</span>
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-400 animate-fade-in-delay max-w-2xl mx-auto leading-relaxed">
            Collect legendary guardians from across the cosmos. Each NFT is unique with 
            <span className="text-purple-600 dark:text-purple-400 font-semibold"> gasless minting</span> and 
            <span className="text-blue-600 dark:text-blue-400 font-semibold"> multi-currency support</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-delay-2">
            <Link
              to="/mint"
              className="group relative flex items-center space-x-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-10 py-5 text-lg font-bold text-white hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all shadow-2xl hover:shadow-purple-500/50 hover:scale-110 transform overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <Sparkles className="h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
              <span>Start Minting Now</span>
            </Link>
            <a
              href="#features"
              className="rounded-xl border-2 border-purple-600 dark:border-purple-400 px-10 py-5 text-lg font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all hover:scale-110 transform backdrop-blur-sm"
            >
              Explore Features
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
          <div className="group rounded-2xl bg-gradient-to-br from-purple-50 to-white p-8 shadow-xl dark:from-purple-900/20 dark:to-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-purple-100 dark:border-purple-800">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg group-hover:scale-110 transition-transform">
              <Sparkles className="h-8 w-8 text-white animate-pulse" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              ⚡ Gasless Minting
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              We use lazy minting technology. You don't pay any gas fees until someone buys
              your NFT. The buyer pays all costs!
            </p>
          </div>

          <div className="group rounded-2xl bg-gradient-to-br from-blue-50 to-white p-8 shadow-xl dark:from-blue-900/20 dark:to-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-blue-100 dark:border-blue-800">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:scale-110 transition-transform">
              <DollarSign className="h-8 w-8 text-white animate-pulse" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              💰 Multi-Currency
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Pay with ETH, BTC, USDT, USDC, or other cryptocurrencies. We support multiple
              payment options for your convenience.
            </p>
          </div>

          <div className="group rounded-2xl bg-gradient-to-br from-green-50 to-white p-8 shadow-xl dark:from-green-900/20 dark:to-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-green-100 dark:border-green-800">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg group-hover:scale-110 transition-transform">
              <Package className="h-8 w-8 text-white animate-pulse" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
              🔒 IPFS Storage
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
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
