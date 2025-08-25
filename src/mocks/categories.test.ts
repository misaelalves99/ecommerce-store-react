// src/mocks/categories.test.ts

import { categories } from "./categories";

describe("categories mock", () => {
  it("deve conter 4 categorias", () => {
    expect(categories).toHaveLength(4);
  });

  it("cada categoria deve ter id, name, description e createdAt", () => {
    for (const category of categories) {
      expect(category).toHaveProperty("id");
      expect(category).toHaveProperty("name");
      expect(category).toHaveProperty("description");
      expect(category).toHaveProperty("createdAt");
    }
  });

  it("nomes esperados devem estar presentes", () => {
    const names = categories.map((c) => c.name);
    expect(names).toContain("Eletrônicos");
    expect(names).toContain("Moda");
    expect(names).toContain("Casa e Decoração");
    expect(names).toContain("Esportes");
  });

  it("descrições devem estar corretas", () => {
    const descriptions = categories.map((c) => c.description);
    expect(descriptions).toContain("Produtos eletrônicos variados");
    expect(descriptions).toContain("Roupas e acessórios de moda");
    expect(descriptions).toContain("Produtos para casa e decoração");
    expect(descriptions).toContain("Equipamentos e acessórios esportivos");
  });

  it("createdAt deve estar em formato ISO válido", () => {
    for (const category of categories) {
      expect(() => new Date(category.createdAt)).not.toThrow();
      expect(new Date(category.createdAt).toISOString()).toBe(category.createdAt);
    }
  });
});
