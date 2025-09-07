// src/pages/Brand/EditBrandPage.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import EditBrandPage from "./EditBrandPage";
import { MemoryRouter } from "react-router-dom";

const mockedNavigate = jest.fn();
const mockedAlert = jest.fn();
const mockedUseParams = jest.fn();
const mockedUpdateBrand = jest.fn();

jest.mock("@/hooks/useBrands", () => ({
  useBrands: () => ({
    brands: [
      { id: 1, name: "Marca X" },
      { id: 2, name: "Marca Y" },
    ],
    updateBrand: mockedUpdateBrand,
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

describe("EditBrandPage", () => {
  it("mostra loading se marca não carregada", () => {
    mockedUseParams.mockReturnValue({ id: "999" });

    render(<MemoryRouter><EditBrandPage /></MemoryRouter>);
    expect(screen.getByText(/carregando marca/i)).toBeInTheDocument();
  });

  it("renderiza BrandForm com marca existente", () => {
    mockedUseParams.mockReturnValue({ id: "1" });
    render(<MemoryRouter><EditBrandPage /></MemoryRouter>);

    expect(screen.getByText(/editar marca/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue("Marca X")).toBeInTheDocument();
  });

  it("alerta e navega se marca não encontrada", () => {
    mockedUseParams.mockReturnValue({ id: "999" });
    render(<MemoryRouter><EditBrandPage /></MemoryRouter>);

    expect(mockedAlert).toHaveBeenCalledWith("Marca não encontrada.");
    expect(mockedNavigate).toHaveBeenCalledWith("/brands");
  });

  it("chama updateBrand e navega ao salvar", () => {
    mockedUseParams.mockReturnValue({ id: "1" });
    render(<MemoryRouter><EditBrandPage /></MemoryRouter>);

    const input = screen.getByDisplayValue("Marca X");
    fireEvent.change(input, { target: { value: "Novo Nome" } });
    fireEvent.click(screen.getByText(/salvar/i));

    expect(mockedUpdateBrand).toHaveBeenCalledWith(1, "Novo Nome");
    expect(mockedNavigate).toHaveBeenCalledWith("/brands");
  });

  it("navega ao cancelar edição", () => {
    mockedUseParams.mockReturnValue({ id: "1" });
    render(<MemoryRouter><EditBrandPage /></MemoryRouter>);

    fireEvent.click(screen.getByText(/cancelar/i));
    expect(mockedNavigate).toHaveBeenCalledWith("/brands");
  });
});
