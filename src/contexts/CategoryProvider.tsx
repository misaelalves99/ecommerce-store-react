// src/contexts/CategoryProvider.tsx

import { ReactNode, useState } from "react";
import { CategoryContext } from "./CategoryContext";
import { Category } from "../types/Category";
import { categories as initialCategories } from "../mocks/categories";
import { CategoryContextType } from "../types/CategoryContextType";

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

  const updateCategory: CategoryContextType["updateCategory"] = (id, data) => {
    setCategories(categories.map(c => 
      c.id === id ? { ...c, name: data.name, description: data.description } : c
    ));
  };

  const deleteCategory: CategoryContextType["deleteCategory"] = (id) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}
