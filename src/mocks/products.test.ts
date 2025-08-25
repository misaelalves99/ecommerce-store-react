// src/mocks/products.test.ts

import { products } from "./products";
import { categories } from "./categories";
import { brands } from "./brands";

describe("products mock", () => {
  it("deve conter 3 produtos", () => {
    expect(products).toHaveLength(3);
  });

  it("cada produto deve ter as propriedades corretas", () => {
    for (const product of products) {
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("description");
      expect(product).toHaveProperty("sku");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("stock");
      expect(product).toHaveProperty("categoryId");
      expect(product).toHaveProperty("brandId");
      expect(product).toHaveProperty("isActive");
      expect(product).toHaveProperty("category");
      expect(product).toHaveProperty("brand");
    }
  });

  it("category e brand devem existir no mock correspondente", () => {
    for (const product of products) {
      expect(categories).toContain(product.category);
      expect(brands).toContain(product.brand);
    }
  });

  it("preços e estoques devem ser números válidos", () => {
    for (const product of products) {
      expect(typeof product.price).toBe("number");
      expect(product.price).toBeGreaterThanOrEqual(0);

      expect(typeof product.stock).toBe("number");
      expect(product.stock).toBeGreaterThanOrEqual(0);
    }
  });

  it("isActive deve ser booleano", () => {
    for (const product of products) {
      expect(typeof product.isActive).toBe("boolean");
    }
  });
});
