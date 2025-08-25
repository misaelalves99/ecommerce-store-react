// src/types/ProductContextType.ts

import { Product, OmitProduct } from "./Product";

export interface ProductContextType {
  products: Product[];
  addProduct: (product: OmitProduct) => void;
  removeProduct: (id: number) => void; // remove produto pelo ID
}
