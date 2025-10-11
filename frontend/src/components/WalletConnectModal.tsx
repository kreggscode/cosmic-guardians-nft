import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { X, Wallet, Smartphone, QrCode } from 'lucide-react';

export default function WalletConnectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    // Check if user has seen the modal before
    const hasSeenModal = localStorage.getItem('hasSeenWalletModal');
    
    // Auto-open modal on first visit if not connected
    if (!hasSeenModal && !isConnected) {
      // Delay to let page load first
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('hasSeenWalletModal', 'true');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isConnected]);

  // Close modal when wallet connects
  useEffect(() => {
    if (isConnected) {
      setIsOpen(false);
    }
  }, [isConnected]);

  if (!isOpen) return null;

  const handleConnect = (connector: any) => {
    connect({ connector });
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl animate-slide-up">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Connect Your Wallet
              </h2>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose your preferred wallet to start minting NFTs
          </p>
        </div>

        {/* Wallet Options */}
        <div className="p-6 space-y-3">
          {connectors.map((connector) => {
            const isMetaMask = connector.name.toLowerCase().includes('metamask');
            const isWalletConnect = connector.name.toLowerCase().includes('walletconnect');
            const isCoinbase = connector.name.toLowerCase().includes('coinbase');

            return (
              <button
                key={connector.id}
                onClick={() => handleConnect(connector)}
                className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 group-hover:from-purple-200 group-hover:to-blue-200 dark:group-hover:from-purple-900/50 dark:group-hover:to-blue-900/50 transition-colors">
                    {isMetaMask && <Smartphone className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                    {isWalletConnect && <QrCode className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                    {isCoinbase && <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                    {!isMetaMask && !isWalletConnect && !isCoinbase && <Wallet className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {connector.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {isMetaMask && 'Mobile & Browser'}
                      {isWalletConnect && 'Scan QR Code'}
                      {isCoinbase && 'Coinbase Wallet'}
                      {!isMetaMask && !isWalletConnect && !isCoinbase && 'Connect'}
                    </p>
                  </div>
                </div>
                <div className="text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-b-2xl border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            By connecting your wallet, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}
