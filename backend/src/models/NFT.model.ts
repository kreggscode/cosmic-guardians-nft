import mongoose, { Document, Schema } from 'mongoose';

export interface INFT extends Document {
  tokenId: number;
  name: string;
  description: string;
  image: string;
  imageHash: string;
  metadata: string;
  metadataHash: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  price: string;
  owner?: string;
  minted: boolean;
  mintedAt?: Date;
  transactionHash?: string;
  voucher?: {
    signature: string;
    createdAt: Date;
    used: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const NFTSchema = new Schema<INFT>(
  {
    tokenId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageHash: {
      type: String,
      required: true,
    },
    metadata: {
      type: String,
      required: true,
    },
    metadataHash: {
      type: String,
      required: true,
    },
    attributes: [
      {
        trait_type: String,
        value: Schema.Types.Mixed,
      },
    ],
    price: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      lowercase: true,
    },
    minted: {
      type: Boolean,
      default: false,
    },
    mintedAt: {
      type: Date,
    },
    transactionHash: {
      type: String,
    },
    voucher: {
      signature: String,
      createdAt: Date,
      used: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
NFTSchema.index({ tokenId: 1 });
NFTSchema.index({ owner: 1 });
NFTSchema.index({ minted: 1 });

export const NFTModel = mongoose.model<INFT>('NFT', NFTSchema);
