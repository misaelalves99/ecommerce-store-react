// src/contexts/ProductContext.ts

import { createContext } from "react";
import { ProductContextType } from "../types/ProductContextType";

// Criamos o contexto com tipo ProductContextType | undefined
export const ProductContext = createContext<ProductContextType | undefined>(undefined);
