// src/types/BrandContextType.ts

import { Brand } from "./Brand";

export interface BrandContextType {
  brands: Brand[];
  addBrand: (brand: Omit<Brand, "id" | "createdAt">) => void; // espera objeto { name }
}
