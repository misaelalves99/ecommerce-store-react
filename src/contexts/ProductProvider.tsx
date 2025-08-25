// src/contexts/ProductProvider.tsx

import { ReactNode, useState } from "react";
import { Product, OmitProduct } from "../types/Product";
import { products as initialProducts } from "../mocks/products";
import { categories as mockCategories } from "../mocks/categories";
import { brands as mockBrands } from "../mocks/brands";
import { ProductContext } from "./ProductContext";
import type { ProductContextType } from "../types/ProductContextType";

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct: ProductContextType["addProduct"] = (product: OmitProduct) => {
    const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    const category = mockCategories.find((c) => c.id === product.categoryId);
    const brand = mockBrands.find((b) => b.id === product.brandId);

    const newProduct: Product = {
      ...product,
      id: newId,
      category,
      brand,
    };

    setProducts([...products, newProduct]);
  };

  const removeProduct: ProductContextType["removeProduct"] = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
