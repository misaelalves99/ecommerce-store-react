// src/contexts/CategoryContext.ts

import { createContext } from "react";
import { CategoryContextType } from "../types/CategoryContextType";

// Context padrão com valores vazios
export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  addCategory: () => {},
  removeCategory: () => {}, // função vazia por padrão
});
