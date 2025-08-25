// src/pages/Products/EditProductPage.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EditProductPage from "./EditProductPage";
import { products as mockProducts } from "../../mocks/products";
import { useParams, useNavigate } from "react-router-dom";

// Mock do react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe("EditProductPage", () => {
  const useParamsMock = useParams as jest.Mock;
  const useNavigateMock = useNavigate as jest.Mock;
  const navigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigateMock.mockReturnValue(navigate);
  });

  it("renderiza o formulário com os dados do produto existente", async () => {
    useParamsMock.mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <EditProductPage />
      </MemoryRouter>
    );

    const product = mockProducts.find((p) => p.id === 1);
    expect(await screen.findByDisplayValue(product!.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(product!.sku)).toBeInTheDocument();
  });

  it("mostra 'Carregando...' se o produto não existir", () => {
    useParamsMock.mockReturnValue({ id: "999" });

    render(
      <MemoryRouter>
        <EditProductPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it("chama navigate ao cancelar a edição", async () => {
    useParamsMock.mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <EditProductPage />
      </MemoryRouter>
    );

    const product = mockProducts.find((p) => p.id === 1);
    expect(await screen.findByDisplayValue(product!.name)).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(navigate).toHaveBeenCalledWith("/products");
  });
});
