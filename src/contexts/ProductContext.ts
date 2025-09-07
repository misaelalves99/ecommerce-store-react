// src/contexts/ProductContext.ts

import { createContext } from "react";
import { ProductContextType } from "../types/ProductContextType";

export const ProductContext = createContext<ProductContextType>({
  products: [],
  addProduct: () => {
    throw new Error("addProduct não foi implementado");
  },
  deleteProduct: () => {
    throw new Error("deleteProduct não foi implementado");
  },
  updateProduct: () => {
    throw new Error("updateProduct não foi implementado");
  },
});
