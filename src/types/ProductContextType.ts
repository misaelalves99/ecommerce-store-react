// src/types/ProductContextType.ts

import { Product, OmitProduct } from "./Product";

export interface ProductContextType {
  products: Product[];
  addProduct: (product: OmitProduct) => void;
  updateProduct?: (updatedProduct: Product) => void;
  deleteProduct: (id: number) => void;
}
