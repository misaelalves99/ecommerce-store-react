// src/pages/Products/Index.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductsPage from "./Index";
import { Product } from "../../types/Product";
import { useProducts } from "@/hooks/useProducts";

// Mock do hook useProducts
jest.mock("@/hooks/useProducts");

describe("ProductsPage", () => {
  const mockNavigate = jest.fn();

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
    jest.clearAllMocks();
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

  it("chama navigate corretamente ao interagir com os botões de edição, exclusão e detalhes", () => {
    // Mock do useNavigate do react-router-dom
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    // Como ProductList renderiza botões, vamos simular clique chamando handleEdit/handleDelete/handleDetails
    const editButton = screen.getByText(/editar/i);
    const deleteButton = screen.getByText(/excluir/i);
    const detailsButton = screen.getByText(/detalhes/i);

    fireEvent.click(editButton);
    fireEvent.click(deleteButton);
    fireEvent.click(detailsButton);

    expect(mockNavigate).toHaveBeenCalledTimes(3);
    expect(mockNavigate).toHaveBeenCalledWith("/products/edit/1");
    expect(mockNavigate).toHaveBeenCalledWith("/products/delete/1");
    expect(mockNavigate).toHaveBeenCalledWith("/products/details/1");
  });
});
