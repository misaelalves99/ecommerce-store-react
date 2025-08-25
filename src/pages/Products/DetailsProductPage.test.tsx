// src/pages/Product/DetailsProductPage.test.tsx

// src/pages/Product/DetailsProductPage.test.tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DetailsProductPage from "./DetailsProductPage";
import { products as mockProducts } from "../../mocks/products";
import { useParams } from "react-router-dom";

// Mock de react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

describe("DetailsProductPage", () => {
  const useParamsMock = useParams as jest.Mock;

  it("exibe detalhes do produto quando o id existe", () => {
    useParamsMock.mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <DetailsProductPage />
      </MemoryRouter>
    );

    const product = mockProducts.find(p => p.id === 1);

    expect(screen.getByText(product!.name)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(product!.description, "i"))).toBeInTheDocument();
    expect(screen.getByText(/voltar/i)).toBeInTheDocument();
  });

  it("exibe mensagem de produto não encontrado quando o id não existe", () => {
    useParamsMock.mockReturnValue({ id: "999" });

    render(
      <MemoryRouter>
        <DetailsProductPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/produto não encontrado/i)).toBeInTheDocument();
    expect(screen.getByText(/voltar/i)).toBeInTheDocument();
  });
});
