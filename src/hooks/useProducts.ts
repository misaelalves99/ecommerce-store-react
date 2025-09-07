// src/hooks/useProducts.ts

import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { ProductContextType } from "../types/ProductContextType";

export function useProducts(): ProductContextType {
  return useContext(ProductContext);
}
