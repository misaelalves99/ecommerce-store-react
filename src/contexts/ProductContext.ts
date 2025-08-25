// src/contexts/ProductContext.ts

import { createContext } from "react";
import { ProductContextType } from "../types/ProductContextType";

// Context padrão com valores vazios
export const ProductContext = createContext<ProductContextType | undefined>(undefined);
