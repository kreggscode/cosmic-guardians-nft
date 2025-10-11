import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config/wagmi';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import WalletConnectModal from './components/WalletConnectModal';
import HomePage from './pages/HomePage';
import MintPage from './pages/MintPage';
import MyNFTsPage from './pages/MyNFTsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/mint" element={<MintPage />} />
                <Route path="/my-nfts" element={<MyNFTsPage />} />
              </Routes>
            </main>
            <WalletConnectModal />
            <Toaster position="bottom-right" />
          </div>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
