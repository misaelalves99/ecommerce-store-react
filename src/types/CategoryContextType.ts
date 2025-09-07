// src/types/CategoryContextType.ts

import { Category } from "./Category";

export interface CategoryContextType {
  categories: Category[];
  addCategory: (categoryData: { name: string; description?: string }) => void;
  updateCategory: (id: number, data: { name: string; description: string }) => void;
  deleteCategory: (id: number) => void;
}
