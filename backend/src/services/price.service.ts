import axios from 'axios';

export interface PriceData {
  currency: string;
  priceUSD: number;
  timestamp: Date;
}

export class PriceService {
  private cache: Map<string, { price: number; timestamp: number }> = new Map();
  private cacheDuration = 60000; // 1 minute

  /**
   * Get cryptocurrency price in USD from CoinGecko
   */
  async getPrice(currency: string): Promise<number> {
    const currencyLower = currency.toLowerCase();
    
    // Check cache
    const cached = this.cache.get(currencyLower);
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.price;
    }

    try {
      // Map currency symbols to CoinGecko IDs
      const coinGeckoIds: { [key: string]: string } = {
        eth: 'ethereum',
        btc: 'bitcoin',
        usdt: 'tether',
        usdc: 'usd-coin',
        matic: 'matic-network',
        bnb: 'binancecoin',
      };

      const coinId = coinGeckoIds[currencyLower] || currencyLower;

      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price`,
        {
          params: {
            ids: coinId,
            vs_currencies: 'usd',
          },
          headers: process.env.COINGECKO_API_KEY
            ? { 'x-cg-pro-api-key': process.env.COINGECKO_API_KEY }
            : {},
        }
      );

      const price = response.data[coinId]?.usd;
      if (!price) {
        throw new Error(`Price not found for ${currency}`);
      }

      // Update cache
      this.cache.set(currencyLower, {
        price,
        timestamp: Date.now(),
      });

      return price;
    } catch (error) {
      console.error(`Error fetching price for ${currency}:`, error);
      throw new Error(`Failed to fetch price for ${currency}`);
    }
  }

  /**
   * Convert USD amount to cryptocurrency amount
   */
  async convertUSDToCrypto(usdAmount: number, currency: string): Promise<string> {
    const price = await this.getPrice(currency);
    const cryptoAmount = usdAmount / price;
    
    // Format with appropriate decimals
    const decimals = currency.toLowerCase() === 'btc' ? 8 : 6;
    return cryptoAmount.toFixed(decimals);
  }

  /**
   * Convert cryptocurrency amount to USD
   */
  async convertCryptoToUSD(cryptoAmount: string, currency: string): Promise<number> {
    const price = await this.getPrice(currency);
    return parseFloat(cryptoAmount) * price;
  }

  /**
   * Get multiple prices at once
   */
  async getPrices(currencies: string[]): Promise<Map<string, number>> {
    const prices = new Map<string, number>();
    
    await Promise.all(
      currencies.map(async (currency) => {
        try {
          const price = await this.getPrice(currency);
          prices.set(currency.toLowerCase(), price);
        } catch (error) {
          console.error(`Failed to get price for ${currency}:`, error);
        }
      })
    );

    return prices;
  }

  /**
   * Clear price cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}

// Singleton instance
let priceServiceInstance: PriceService | null = null;

export const getPriceService = (): PriceService => {
  if (!priceServiceInstance) {
    priceServiceInstance = new PriceService();
  }
  return priceServiceInstance;
};
