import { Request, Response } from 'express';
import { PaymentModel } from '../models/Payment.model';
import { NFTModel } from '../models/NFT.model';
import { getPriceService } from '../services/price.service';
import { ethers } from 'ethers';

export class PaymentController {
  private supportedCurrencies = ['ETH', 'BTC', 'USDT', 'USDC', 'MATIC'];

  /**
   * Get supported currencies with current prices
   */
  async getSupportedCurrencies(req: Request, res: Response) {
    try {
      // Return simple ETH support for now
      const currencies = [{
        symbol: 'ETH',
        name: 'Ethereum',
        priceUSD: 3500, // Approximate price
        isSupported: true,
        network: 'Sepolia Testnet'
      }];

      res.json({ success: true, data: currencies });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Calculate price in different currency
   */
  async calculatePrice(req: Request, res: Response) {
    try {
      const { tokenId, currency } = req.body;

      if (!tokenId || !currency) {
        return res.status(400).json({
          success: false,
          error: 'Token ID and currency required',
        });
      }

      // Get NFT price
      const nft = await NFTModel.findOne({ tokenId: Number(tokenId) });
      if (!nft) {
        return res.status(404).json({ success: false, error: 'NFT not found' });
      }

      // Convert price from ETH to USD
      const priceService = getPriceService();
      const priceInETH = ethers.formatEther(nft.price);
      const ethPrice = await priceService.getPrice('eth');
      const priceInUSD = parseFloat(priceInETH) * ethPrice;

      // Convert to target currency
      let amount: string;
      let amountUSD: number;

      if (currency.toUpperCase() === 'ETH') {
        amount = priceInETH;
        amountUSD = priceInUSD;
      } else {
        amount = await priceService.convertUSDToCrypto(priceInUSD, currency);
        amountUSD = priceInUSD;
      }

      res.json({
        success: true,
        data: {
          tokenId: nft.tokenId,
          currency: currency.toUpperCase(),
          amount,
          amountUSD,
          priceInETH,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Create payment intent
   */
  async createPayment(req: Request, res: Response) {
    try {
      const { tokenId, buyer, currency } = req.body;

      if (!tokenId || !buyer || !currency) {
        return res.status(400).json({
          success: false,
          error: 'Token ID, buyer address, and currency required',
        });
      }

      // Verify NFT exists and is available
      const nft = await NFTModel.findOne({ tokenId: Number(tokenId) });
      if (!nft) {
        return res.status(404).json({ success: false, error: 'NFT not found' });
      }

      if (nft.minted) {
        return res.status(400).json({ success: false, error: 'NFT already minted' });
      }

      // Calculate price in selected currency
      const priceService = getPriceService();
      const priceInETH = ethers.formatEther(nft.price);
      const ethPrice = await priceService.getPrice('eth');
      const priceInUSD = parseFloat(priceInETH) * ethPrice;

      let amount: string;
      if (currency.toUpperCase() === 'ETH') {
        amount = priceInETH;
      } else {
        amount = await priceService.convertUSDToCrypto(priceInUSD, currency);
      }

      // Create payment record
      const payment = new PaymentModel({
        tokenId: nft.tokenId,
        buyer: buyer.toLowerCase(),
        currency: currency.toUpperCase(),
        amount,
        amountUSD: priceInUSD,
        status: 'pending',
        paymentMethod: this.getPaymentMethod(currency),
        expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
      });

      await payment.save();

      res.json({
        success: true,
        data: {
          paymentId: payment._id,
          tokenId: nft.tokenId,
          currency: currency.toUpperCase(),
          amount,
          amountUSD: priceInUSD,
          expiresAt: payment.expiresAt,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(req: Request, res: Response) {
    try {
      const { paymentId } = req.params;

      const payment = await PaymentModel.findById(paymentId);
      if (!payment) {
        return res.status(404).json({ success: false, error: 'Payment not found' });
      }

      // Check if payment expired
      if (
        payment.status === 'pending' &&
        payment.expiresAt &&
        payment.expiresAt < new Date()
      ) {
        payment.status = 'expired';
        await payment.save();
      }

      res.json({ success: true, data: payment });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Handle payment webhook (for external payment gateways like BTCPay)
   */
  async handleWebhook(req: Request, res: Response) {
    try {
      // This is a placeholder for payment gateway webhooks
      // Implementation depends on which payment gateway you use
      
      const { paymentId, status, transactionHash } = req.body;

      if (!paymentId) {
        return res.status(400).json({ success: false, error: 'Payment ID required' });
      }

      const payment = await PaymentModel.findById(paymentId);
      if (!payment) {
        return res.status(404).json({ success: false, error: 'Payment not found' });
      }

      // Update payment status
      payment.status = status;
      payment.transactionHash = transactionHash;
      if (status === 'confirmed') {
        payment.confirmedAt = new Date();
      }

      await payment.save();

      res.json({ success: true, data: payment });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  /**
   * Helper: Get currency full name
   */
  private getCurrencyName(symbol: string): string {
    const names: { [key: string]: string } = {
      ETH: 'Ethereum',
      BTC: 'Bitcoin',
      USDT: 'Tether',
      USDC: 'USD Coin',
      MATIC: 'Polygon',
    };
    return names[symbol] || symbol;
  }

  /**
   * Helper: Get payment method from currency
   */
  private getPaymentMethod(currency: string): 'eth' | 'btc' | 'usdt' | 'usdc' | 'other' {
    const method = currency.toLowerCase();
    if (['eth', 'btc', 'usdt', 'usdc'].includes(method)) {
      return method as 'eth' | 'btc' | 'usdt' | 'usdc';
    }
    return 'other';
  }
}
