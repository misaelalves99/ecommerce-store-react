// src/mocks/brands.test.ts

import { brands } from "./brands";

describe("brands mock", () => {
  it("deve conter 4 marcas", () => {
    expect(brands).toHaveLength(4);
  });

  it("deve conter propriedades id, name e createdAt", () => {
    for (const brand of brands) {
      expect(brand).toHaveProperty("id");
      expect(brand).toHaveProperty("name");
      expect(brand).toHaveProperty("createdAt");
    }
  });

  it("deve ter marcas específicas esperadas", () => {
    const names = brands.map((b) => b.name);
    expect(names).toContain("Nike");
    expect(names).toContain("Adidas");
    expect(names).toContain("Apple");
    expect(names).toContain("Samsung");
  });

  it("datas devem estar em formato ISO válido", () => {
    for (const brand of brands) {
      expect(() => new Date(brand.createdAt)).not.toThrow();
      expect(new Date(brand.createdAt).toISOString()).toBe(brand.createdAt);
    }
  });
});
