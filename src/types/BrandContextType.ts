// src/types/BrandContextType.ts

import { Brand } from "./Brand";

export interface BrandContextType {
  brands: Brand[];
  addBrand: (brand: Omit<Brand, "id" | "createdAt">) => void;
  deleteBrand?: (id: number) => void;
}
