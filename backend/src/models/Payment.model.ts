import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  tokenId: number;
  buyer: string;
  currency: string;
  amount: string;
  amountUSD: number;
  status: 'pending' | 'confirmed' | 'failed' | 'expired';
  paymentMethod: 'eth' | 'btc' | 'usdt' | 'usdc' | 'other';
  transactionHash?: string;
  paymentAddress?: string;
  expiresAt?: Date;
  confirmedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    tokenId: {
      type: Number,
      required: true,
    },
    buyer: {
      type: String,
      required: true,
      lowercase: true,
    },
    currency: {
      type: String,
      required: true,
      uppercase: true,
    },
    amount: {
      type: String,
      required: true,
    },
    amountUSD: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'failed', 'expired'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['eth', 'btc', 'usdt', 'usdc', 'other'],
      required: true,
    },
    transactionHash: {
      type: String,
    },
    paymentAddress: {
      type: String,
    },
    expiresAt: {
      type: Date,
    },
    confirmedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
PaymentSchema.index({ tokenId: 1 });
PaymentSchema.index({ buyer: 1 });
PaymentSchema.index({ status: 1 });
PaymentSchema.index({ transactionHash: 1 });

export const PaymentModel = mongoose.model<IPayment>('Payment', PaymentSchema);
