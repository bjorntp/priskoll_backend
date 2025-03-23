import { ProductType } from "./Product";

type OldPricesType = {
  newPrice: number;
  oldPrice: number;
  updatedAt: Date;
}

export type PriceHistoryType = {
  id?: number;
  productId: string;
  oldPrice: number;
  priceAfter: number;
  changePercentage: number;
  createdAt?: string;
  updatedAt?: string;
  Product: ProductType;
  OldPrices: OldPricesType[];
};
