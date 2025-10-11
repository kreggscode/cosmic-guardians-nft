import { Link } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Wallet, LogOut, Image } from 'lucide-react';
import { shortenAddress } from '@/lib/utils';

export default function Navbar() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-blue-600">
              <Image className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              NFT Collection
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/mint"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
            >
              Mint
            </Link>
            {isConnected && (
              <Link
                to="/my-nfts"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors"
              >
                My NFTs
              </Link>
            )}
          </div>

          {/* Wallet Connection */}
          <div>
            {isConnected ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 rounded-lg bg-purple-100 px-4 py-2 dark:bg-purple-900/30">
                  <Wallet className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-purple-900 dark:text-purple-300">
                    {shortenAddress(address!)}
                  </span>
                </div>
                <button
                  onClick={() => disconnect()}
                  className="flex items-center space-x-2 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Disconnect</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect({ connector: connectors[0] })}
                className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 text-sm font-medium text-white hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
