// src/mocks/categories.test.ts

import { categories } from "./categories";
import type { Category } from "../types/Category";

describe("categories mock", () => {
  it("deve conter 4 categorias", () => {
    expect(categories).toHaveLength(4);
  });

  it("cada categoria deve ter id, name, description e createdAt corretos", () => {
    for (const category of categories) {
      const c: Category = category;
      expect(typeof c.id).toBe("number");
      expect(typeof c.name).toBe("string");
      expect(typeof c.description).toBe("string");
      expect(typeof c.createdAt).toBe("string");
    }
  });

  it("nomes esperados devem estar presentes", () => {
    const names = categories.map((c) => c.name);
    expect(names).toEqual(expect.arrayContaining(["Eletrônicos", "Moda", "Casa e Decoração", "Esportes"]));
  });

  it("descrições esperadas devem estar presentes", () => {
    const descriptions = categories.map((c) => c.description);
    expect(descriptions).toEqual(expect.arrayContaining([
      "Produtos eletrônicos variados",
      "Roupas e acessórios de moda",
      "Produtos para casa e decoração",
      "Equipamentos e acessórios esportivos"
    ]));
  });

  it("createdAt deve estar em formato ISO válido", () => {
    for (const category of categories) {
      const date = new Date(category.createdAt);
      expect(date.toISOString()).toBe(category.createdAt);
    }
  });

  it("não deve conter ids duplicados", () => {
    const ids = categories.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("nomes das categorias não devem estar vazios", () => {
    for (const category of categories) {
      expect(category.name.trim().length).toBeGreaterThan(0);
    }
  });
});
