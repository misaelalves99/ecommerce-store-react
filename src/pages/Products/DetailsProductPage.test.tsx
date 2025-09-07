// src/pages/Product/DetailsProductPage.test.tsx

import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DetailsProductPage from "./DetailsProductPage";
import { products as mockProducts } from "../../mocks/products";

// Mocks
const mockNavigate = jest.fn();
const mockAlert = jest.fn();

// Mock do react-router-dom
jest.mock("react-router-dom", () => {
  const original = jest.requireActual("react-router-dom");
  return {
    ...original,
    useNavigate: () => mockNavigate,
    useParams: jest.fn(),
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to}>{children}</a>
    ),
  };
});

// Mock do hook useProducts
jest.mock('@/hooks/useProducts', () => ({
  useProducts: () => ({
    products: mockProducts,
  }),
}));

beforeAll(() => {
  global.alert = mockAlert;
});

beforeEach(() => {
  jest.clearAllMocks();
});

// Tipando useParams mock
import { useParams as useParamsMock } from "react-router-dom";

describe("DetailsProductPage", () => {
  it("exibe detalhes do produto quando o id existe", async () => {
    (useParamsMock as jest.Mock).mockReturnValue({ id: "1" });

    render(
      <MemoryRouter initialEntries={["/products/details/1"]}>
        <Routes>
          <Route path="/products/details/:id" element={<DetailsProductPage />} />
        </Routes>
      </MemoryRouter>
    );

    const product = mockProducts.find(p => p.id === 1)!;

    await waitFor(() => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(product.description, "i"))).toBeInTheDocument();
      expect(screen.getByText(/voltar/i)).toBeInTheDocument();
      expect(screen.getByText(/editar/i)).toBeInTheDocument();
    });
  });

  it("alerta e navega se o produto não existe", async () => {
    (useParamsMock as jest.Mock).mockReturnValue({ id: "999" });

    render(
      <MemoryRouter initialEntries={["/products/details/999"]}>
        <Routes>
          <Route path="/products/details/:id" element={<DetailsProductPage />} />
          <Route path="/products" element={<div>Página Produtos</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith("Produto não encontrado.");
      expect(mockNavigate).toHaveBeenCalledWith("/products");
    });
  });
});
