// src/contexts/ProductContext.tsx

import { createContext } from "react";
import { ProductContextType } from "../types/ProductContextType";

export const ProductContext = createContext<ProductContextType | undefined>(undefined);
