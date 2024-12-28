import { Product } from "./Product";

type OldPrices = {
  newPrice: number;
  oldPrice: number;
  updateAt: Date;
}

export type PriceHistory = {
  id?: number;
  productId: string;
  priceBefore: number;
  priceAfter: number;
  changePercentage: number;
  createdAt?: string;
  updatedAt?: string;
  Product: Product;
  oldPrices: OldPrices[];
};
