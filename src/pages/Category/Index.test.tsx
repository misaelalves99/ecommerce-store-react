// src/pages/Category/Index.test.tsx

import { render, screen } from "@testing-library/react";
import CategoryPage from "./Index";
import { CategoryContext } from "../../contexts/CategoryContext";
import { MemoryRouter } from "react-router-dom";

// Mock das categorias
const mockCategories = [
  { id: 1, name: "Eletrônicos", description: "Produtos eletrônicos", createdAt: "2023-01-01T00:00:00Z" },
  { id: 2, name: "Moda", description: "Roupas e acessórios", createdAt: "2023-02-01T00:00:00Z" },
];

// Mock do hook useCategories via Provider
const renderWithProvider = (categories = mockCategories) => {
  render(
    <CategoryContext.Provider
      value={{
        categories,
        addCategory: jest.fn(),
        deleteCategory: jest.fn(), // 🔥 adicionado para satisfazer o tipo
      }}
    >
      <MemoryRouter>
        <CategoryPage />
      </MemoryRouter>
    </CategoryContext.Provider>
  );
};

describe("CategoryPage", () => {
  it("renderiza o título e botão de adicionar categoria", () => {
    renderWithProvider();

    expect(screen.getByText(/categorias/i)).toBeInTheDocument();
    const addButton = screen.getByRole("link", { name: /adicionar categoria/i });
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveAttribute("href", "/categories/create");
  });

  it("renderiza a lista de categorias", () => {
    renderWithProvider();

    mockCategories.forEach((category) => {
      expect(screen.getByText(category.name)).toBeInTheDocument();
      expect(screen.getByText(category.description)).toBeInTheDocument();
    });
  });

  it("mostra mensagem de lista vazia se não houver categorias", () => {
    renderWithProvider([]);

    expect(screen.getByText(/nenhuma categoria cadastrada/i)).toBeInTheDocument();
  });
});
