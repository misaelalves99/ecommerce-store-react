// src/contexts/BrandContext.ts

import { createContext } from 'react';
import { BrandContextType } from '../types/BrandContextType';

// Context padrão com valores vazios
export const BrandContext = createContext<BrandContextType>({
  brands: [],
  addBrand: () => {},
  removeBrand: () => {},
});
