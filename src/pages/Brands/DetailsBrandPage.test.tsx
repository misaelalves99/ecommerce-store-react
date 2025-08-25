// src/pages/Brands/DetailsBrandPage.test.tsx

import { render, screen } from "@testing-library/react";
import DetailsBrandPage from "./DetailsBrandPage";
import { MemoryRouter } from "react-router-dom";
import { brands as mockBrands } from "../../mocks/brands";

// Mock do useNavigate e useParams
const mockedNavigate = jest.fn();
const mockedAlert = jest.fn();
const mockedUseParams = jest.fn();

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: () => mockedNavigate,
    useParams: () => mockedUseParams(),
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to}>{children}</a>
    ),
  };
});

beforeAll(() => {
  global.alert = mockedAlert;
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("DetailsBrandPage", () => {
  it("mostra loading enquanto não encontra a marca", () => {
    mockedUseParams.mockReturnValue({ id: "999" });

    render(
      <MemoryRouter>
        <DetailsBrandPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/carregando detalhes da marca/i)).toBeInTheDocument();
  });

  it("mostra detalhes da marca quando encontrada", () => {
    const brand = mockBrands[0];
    mockedUseParams.mockReturnValue({ id: String(brand.id) });

    render(
      <MemoryRouter>
        <DetailsBrandPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/marca - detalhes/i)).toBeInTheDocument();
    expect(screen.getByText(String(brand.id))).toBeInTheDocument();
    expect(screen.getByText(brand.name)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /voltar/i })).toHaveAttribute("href", "/brands");
    expect(screen.getByRole("link", { name: /editar/i })).toHaveAttribute(
      "href",
      `/brands/edit/${brand.id}`
    );
  });

  it("mostra alerta e navega se marca não encontrada", () => {
    mockedUseParams.mockReturnValue({ id: "999" });

    render(
      <MemoryRouter>
        <DetailsBrandPage />
      </MemoryRouter>
    );

    expect(mockedAlert).toHaveBeenCalledWith("Marca não encontrada.");
    expect(mockedNavigate).toHaveBeenCalledWith("/brands");
  });
});
