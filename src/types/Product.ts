// src/types/Product.ts

export interface Category {
  id: number;
  name: string;
  description?: string;
  createdAt?: string;
}

export interface Brand {
  id: number;
  name: string;
  createdAt?: string;
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

// Novo tipo para criar produtos: usa nome em vez de id
export interface NewProduct {
  name: string;
  description: string;
  sku: string;
  price: number;
  stock: number;
  isActive: boolean;
  categoryName: string;
  brandName: string;
}
