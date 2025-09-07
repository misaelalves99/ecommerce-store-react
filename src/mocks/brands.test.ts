// src/mocks/brands.test.ts

import { brands } from "./brands";
import type { Brand } from "../types/Brand";

describe("brands mock", () => {
  it("deve conter 4 marcas", () => {
    expect(brands).toHaveLength(4);
  });

  it("cada marca deve ter id, name e createdAt corretos", () => {
    for (const brand of brands) {
      // Tipo correto
      const b: Brand = brand;
      expect(typeof b.id).toBe("number");
      expect(typeof b.name).toBe("string");
      expect(typeof b.createdAt).toBe("string");
    }
  });

  it("deve ter marcas específicas esperadas", () => {
    const names = brands.map((b) => b.name);
    expect(names).toEqual(expect.arrayContaining(["Nike", "Adidas", "Apple", "Samsung"]));
  });

  it("datas devem estar em formato ISO válido", () => {
    for (const brand of brands) {
      const date = new Date(brand.createdAt);
      expect(date.toISOString()).toBe(brand.createdAt);
    }
  });

  it("não deve conter ids duplicados", () => {
    const ids = brands.map((b) => b.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("nomes das marcas não devem estar vazios", () => {
    for (const brand of brands) {
      expect(brand.name.trim().length).toBeGreaterThan(0);
    }
  });
});
