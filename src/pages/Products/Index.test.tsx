// src/pages/Products/Index.test.tsx

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductsPage from "./Index";
import { Product } from "../../types/Product";
import { useProducts } from "@/hooks/useProducts";

// Mock do hook useProducts
jest.mock("@/hooks/useProducts");

describe("ProductsPage", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Notebook Gamer",
      description: "Notebook potente",
      sku: "NB-001",
      price: 5999.9,
      stock: 10,
      categoryId: 1,
      brandId: 1,
      isActive: true,
      category: { id: 1, name: "Eletrônicos" },
      brand: { id: 1, name: "Nike" },
    },
  ];

  beforeEach(() => {
    (useProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
      addProduct: jest.fn(),
    });
  });

  it("renderiza o título da página e botão de adicionar produto", () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Produtos")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /adicionar produto/i })
    ).toHaveAttribute("href", "/products/create");
  });

  it("renderiza a lista de produtos", () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Notebook Gamer")).toBeInTheDocument();
    expect(screen.getByText("NB-001")).toBeInTheDocument();
  });
});
