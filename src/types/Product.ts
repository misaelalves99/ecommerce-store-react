// src/types/Product.ts

export interface Category {
  id: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  price: number;
  stock: number;
  categoryId: number;
  brandId: number;
  isActive: boolean;
  category?: Category;
  brand?: Brand;
}

// Tipo para criar produtos sem id (o id será gerado automaticamente)
export type OmitProduct = Omit<Product, "id" | "category" | "brand">;
