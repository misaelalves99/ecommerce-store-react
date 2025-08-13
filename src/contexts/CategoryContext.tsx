// src/contexts/CategoryContext.tsx

import { createContext } from "react";
import { CategoryContextType } from "../types/CategoryContextType";

export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  addCategory: () => {},
});
