// src/contexts/CategoryProvider.tsx

import { ReactNode, useState } from "react";
import { CategoryContext } from "./CategoryContext";
import { Category } from "../types/Category";
import { categories as initialCategories } from "../mocks/categories";
import type { CategoryContextType } from "../types/CategoryContextType";

interface CategoryProviderProps {
  children: ReactNode;
}

export function CategoryProvider({ children }: CategoryProviderProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const addCategory: CategoryContextType["addCategory"] = (categoryData) => {
    const newId = categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1;

    const newCategory: Category = {
      id: newId,
      name: categoryData.name,
      description: categoryData.description || "",
      createdAt: new Date().toISOString(),
    };

    setCategories([...categories, newCategory]);
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}
