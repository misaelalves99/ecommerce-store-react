// src/pages/Brands/DetailsBrandPage.test.tsx

import { render, screen } from "@testing-library/react";
import DetailsBrandPage from "./DetailsBrandPage";
import { MemoryRouter } from "react-router-dom";

const mockedNavigate = jest.fn();
const mockedAlert = jest.fn();
const mockedUseParams = jest.fn();

jest.mock("@/hooks/useBrands", () => ({
  useBrands: () => ({
    brands: [
      { id: 1, name: "Marca X" },
      { id: 2, name: "Marca Y" },
    ],
  }),
}));

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
  it("mostra loading se marca ainda não definida", () => {
    mockedUseParams.mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <DetailsBrandPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/carregando detalhes da marca/i)).toBeInTheDocument();
  });

  it("renderiza detalhes da marca corretamente", () => {
    mockedUseParams.mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <DetailsBrandPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/marca - detalhes/i)).toBeInTheDocument();
    expect(screen.getByText("Marca X")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /voltar/i })).toHaveAttribute("href", "/brands");
    expect(screen.getByRole("link", { name: /editar/i })).toHaveAttribute("href", "/brands/edit/1");
  });

  it("dispara alerta e navega se marca não encontrada", () => {
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
