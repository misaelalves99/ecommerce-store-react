// src/types/BrandContextType.ts

import { Brand } from './Brand';

export interface BrandContextType {
  brands: Brand[];
  addBrand: (brandData: { name: string }) => void;
  updateBrand: (id: number, name: string) => void;
  deleteBrand: (id: number) => void;
}
