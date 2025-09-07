// src/mocks/products.test.ts

import { products } from "./products";
import { categories } from "./categories";
import { brands } from "./brands";
import type { Product } from "../types/Product";

describe("products mock", () => {
  it("deve conter 3 produtos", () => {
    expect(products).toHaveLength(3);
  });

  it("cada produto deve ter as propriedades corretas", () => {
    for (const product of products) {
      const p: Product = product;
      expect(typeof p.id).toBe("number");
      expect(typeof p.name).toBe("string");
      expect(p.name.trim().length).toBeGreaterThan(0);
      expect(typeof p.description).toBe("string");
      expect(typeof p.sku).toBe("string");
      expect(p.sku.trim().length).toBeGreaterThan(0);
      expect(typeof p.price).toBe("number");
      expect(p.price).toBeGreaterThanOrEqual(0);
      expect(typeof p.stock).toBe("number");
      expect(p.stock).toBeGreaterThanOrEqual(0);
      expect(typeof p.categoryId).toBe("number");
      expect(typeof p.brandId).toBe("number");
      expect(typeof p.isActive).toBe("boolean");
      expect(p.category).toBeDefined();
      expect(p.brand).toBeDefined();
    }
  });

  it("ids e SKUs devem ser únicos", () => {
    const ids = products.map((p) => p.id);
    const skus = products.map((p) => p.sku);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(skus).size).toBe(skus.length);
  });

  it("category e brand devem existir nos mocks correspondentes", () => {
    for (const product of products) {
      expect(categories.map(c => c.id)).toContain(product.categoryId);
      expect(brands.map(b => b.id)).toContain(product.brandId);
    }
  });

  it("produtos inativos devem ter isActive false e ativos true", () => {
    for (const product of products) {
      expect([true, false]).toContain(product.isActive);
    }
  });
});
