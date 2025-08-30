// src/contexts/CategoryContext.ts

import { createContext } from "react";
import { CategoryContextType } from "../types/CategoryContextType";

export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  addCategory: () => {},
  deleteCategory: () => {},
});
