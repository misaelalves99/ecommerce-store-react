// src/types/ProductContextType.ts

import { Product, NewProduct } from "./Product";

export interface ProductContextType {
  products: Product[];
  addProduct: (product: NewProduct) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (id: number) => void;
}
