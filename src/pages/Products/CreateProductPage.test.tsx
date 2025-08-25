// src/pages/Products/CreateProductPage.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreateProductPage from "./CreateProductPage";

// Mock do useNavigate do react-router-dom
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// Mock do hook useProducts
const mockedAddProduct = jest.fn();
jest.mock("@/hooks/useProducts", () => ({
  useProducts: () => ({
    addProduct: mockedAddProduct,
    products: [],
  }),
}));

describe("CreateProductPage", () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
    mockedAddProduct.mockClear();
  });

  it("renderiza o título da página", () => {
    render(
      <MemoryRouter>
        <CreateProductPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/adicionar produto/i)).toBeInTheDocument();
  });

  it("renderiza o formulário com campos iniciais vazios", () => {
    render(
      <MemoryRouter>
        <CreateProductPage />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/nome/i)).toHaveValue("");
    expect(screen.getByLabelText(/descrição/i)).toHaveValue("");
    expect(screen.getByLabelText(/sku/i)).toHaveValue("");
    expect(screen.getByLabelText(/preço/i)).toHaveValue(null);
    expect(screen.getByLabelText(/estoque/i)).toHaveValue(null);
    expect(screen.getByLabelText(/categoria/i)).toHaveValue("");
    expect(screen.getByLabelText(/marca/i)).toHaveValue("");
    expect(screen.getByLabelText(/ativo/i)).toBeChecked();
  });

  it("chama addProduct e navega ao enviar o formulário válido", () => {
    render(
      <MemoryRouter>
        <CreateProductPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: "Produto Teste" } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: "Descrição Teste" } });
    fireEvent.change(screen.getByLabelText(/sku/i), { target: { value: "SKU123" } });
    fireEvent.change(screen.getByLabelText(/preço/i), { target: { value: 100 } });
    fireEvent.change(screen.getByLabelText(/estoque/i), { target: { value: 10 } });
    fireEvent.change(screen.getByLabelText(/categoria/i), { target: { value: 1 } });
    fireEvent.change(screen.getByLabelText(/marca/i), { target: { value: 1 } });

    fireEvent.click(screen.getByText(/adicionar/i));

    expect(mockedAddProduct).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Produto Teste",
        description: "Descrição Teste",
        sku: "SKU123",
        price: 100,
        stock: 10,
        categoryId: 1,
        brandId: 1,
        isActive: true,
      })
    );
    expect(mockedNavigate).toHaveBeenCalledWith("/products");
  });

  it("navega ao clicar em cancelar", () => {
    render(
      <MemoryRouter>
        <CreateProductPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/cancelar/i));
    expect(mockedNavigate).toHaveBeenCalledWith("/products");
  });
});
