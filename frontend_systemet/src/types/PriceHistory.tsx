import { Product } from "./Product";

type OldPrices = {
  newPrice: number;
  oldPrice: number;
  updatedAt: Date;
}

export type PriceHistory = {
  id?: number;
  productId: string;
  oldPrice: number;
  priceAfter: number;
  changePercentage: number;
  createdAt?: string;
  updatedAt?: string;
  Product: Product;
  OldPrices: OldPrices[];
};
