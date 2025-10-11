import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { X, Loader2, CheckCircle } from 'lucide-react';
import { NFT, getVoucher, markAsMinted, getSupportedCurrencies, Currency } from '@/lib/api';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/config/contract';
import { formatPrice, ipfsToGateway } from '@/lib/utils';
import { toast } from 'sonner';

interface MintModalProps {
  nft: NFT;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function MintModal({ nft, isOpen, onClose, onSuccess }: MintModalProps) {
  const { address } = useAccount();
  const [selectedCurrency, setSelectedCurrency] = useState('ETH');
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    if (isOpen) {
      loadCurrencies();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess && hash) {
      handleMintSuccess(hash);
    }
  }, [isSuccess, hash]);

  const loadCurrencies = async () => {
    try {
      const data = await getSupportedCurrencies();
      setCurrencies(data);
    } catch (error) {
      console.error('Failed to load currencies:', error);
    }
  };

  const handleMint = async () => {
    if (!address) {
      toast.error('Please connect your wallet');
      return;
    }

    try {
      setLoading(true);

      // Get voucher from backend
      const voucher = await getVoucher(nft.tokenId, address);

      // Call smart contract
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'lazyMint',
        args: [
          {
            tokenId: BigInt(voucher.tokenId),
            price: BigInt(voucher.price),
            tokenURI: voucher.tokenURI,
            signature: voucher.signature as `0x${string}`,
          },
        ],
        value: BigInt(voucher.price),
      });
    } catch (error: any) {
      console.error('Mint error:', error);
      toast.error(error.message || 'Failed to mint NFT');
      setLoading(false);
    }
  };

  const handleMintSuccess = async (txHash: string) => {
    try {
      // Update backend
      await markAsMinted(nft.tokenId, address!, txHash);
      
      toast.success('NFT minted successfully!');
      setLoading(false);
      onSuccess();
      
      // Close modal after a delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to update backend:', error);
      toast.error('NFT minted but failed to update database');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const isProcessing = loading || isPending || isConfirming;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isProcessing}
          className="absolute right-4 top-4 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-2xl font-bold">Mint NFT</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* NFT Preview */}
          <div>
            <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
              <img
                src={ipfsToGateway(nft.image)}
                alt={nft.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="mt-4 text-lg font-bold">{nft.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {nft.description}
            </p>
          </div>

          {/* Mint Details */}
          <div className="flex flex-col">
            {/* Currency Selection */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium">
                Payment Currency
              </label>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                disabled={isProcessing}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-700"
              >
                {currencies.map((currency) => (
                  <option key={currency.symbol} value={currency.symbol}>
                    {currency.name} ({currency.symbol})
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Note: Currently only ETH is supported for direct minting
              </p>
            </div>

            {/* Price */}
            <div className="mb-6 rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatPrice(nft.price)} ETH
              </p>
              {currencies.length > 0 && (
                <p className="mt-1 text-sm text-gray-500">
                  ≈ ${(parseFloat(formatPrice(nft.price)) * (currencies.find(c => c.symbol === 'ETH')?.priceUSD || 0)).toFixed(2)} USD
                </p>
              )}
            </div>

            {/* Status Messages */}
            {isSuccess && (
              <div className="mb-4 flex items-center space-x-2 rounded-lg bg-green-100 p-4 dark:bg-green-900/30">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                <p className="text-sm font-medium text-green-900 dark:text-green-300">
                  NFT minted successfully!
                </p>
              </div>
            )}

            {isProcessing && !isSuccess && (
              <div className="mb-4 flex items-center space-x-2 rounded-lg bg-blue-100 p-4 dark:bg-blue-900/30">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600 dark:text-blue-400" />
                <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                  {isPending && 'Waiting for confirmation...'}
                  {isConfirming && 'Transaction confirming...'}
                  {loading && !isPending && 'Preparing transaction...'}
                </p>
              </div>
            )}

            {/* Mint Button */}
            <button
              onClick={handleMint}
              disabled={isProcessing || isSuccess}
              className="mt-auto flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 font-medium text-white hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Minted!</span>
                </>
              ) : (
                <span>Mint NFT</span>
              )}
            </button>

            <p className="mt-4 text-xs text-gray-500 text-center">
              You will pay gas fees + NFT price
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
