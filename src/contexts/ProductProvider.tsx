// src/contexts/ProductProvider.tsx

import { ReactNode, useState } from "react";
import { Product, NewProduct } from "../types/Product";
import { products as initialProducts } from "../mocks/products";
import { categories as mockCategories } from "../mocks/categories";
import { brands as mockBrands } from "../mocks/brands";
import { ProductContext } from "./ProductContext";
import { ProductContextType } from "../types/ProductContextType";

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Adiciona um produto usando nome de categoria e marca
  const addProduct = (product: NewProduct) => {
    const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;

    const category = mockCategories.find((c) => c.name === product.categoryName);
    const brand = mockBrands.find((b) => b.name === product.brandName);

    const newProduct: Product = {
      id: newId,
      name: product.name,
      description: product.description,
      sku: product.sku,
      price: product.price,
      stock: product.stock,
      isActive: product.isActive,
      category: category ? { ...category } : { id: 0, name: product.categoryName },
      brand: brand ? { ...brand } : { id: 0, name: product.brandName },
      categoryId: category?.id || 0,
      brandId: brand?.id || 0,
    };

    setProducts([...products, newProduct]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const contextValue: ProductContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
}
