// src/pages/Brand/EditBrandPage.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import EditBrandPage from "./EditBrandPage";
import { MemoryRouter } from "react-router-dom";
import { brands as mockBrands } from "../../mocks/brands";

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

describe("EditBrandPage", () => {
  it("exibe loading enquanto marca não é carregada", () => {
    mockedUseParams.mockReturnValue({ id: "999" });

    render(
      <MemoryRouter>
        <EditBrandPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/carregando marca/i)).toBeInTheDocument();
  });

  it("renderiza BrandForm com dados da marca existente", () => {
    const brand = mockBrands[0];
    mockedUseParams.mockReturnValue({ id: String(brand.id) });

    render(
      <MemoryRouter>
        <EditBrandPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/editar marca/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(brand.name)).toBeInTheDocument();
  });

  it("alerta e navega quando marca não encontrada", () => {
    mockedUseParams.mockReturnValue({ id: "999" });

    render(
      <MemoryRouter>
        <EditBrandPage />
      </MemoryRouter>
    );

    expect(mockedAlert).toHaveBeenCalledWith("Marca não encontrada.");
    expect(mockedNavigate).toHaveBeenCalledWith("/brands");
  });

  it("chama navigate ao atualizar a marca", () => {
    const brand = mockBrands[0];
    mockedUseParams.mockReturnValue({ id: String(brand.id) });

    render(
      <MemoryRouter>
        <EditBrandPage />
      </MemoryRouter>
    );

    const input = screen.getByDisplayValue(brand.name);
    fireEvent.change(input, { target: { value: "Novo Nome" } });

    const saveButton = screen.getByText(/salvar/i);
    fireEvent.click(saveButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/brands");
  });

  it("chama navigate ao cancelar edição", () => {
    const brand = mockBrands[0];
    mockedUseParams.mockReturnValue({ id: String(brand.id) });

    render(
      <MemoryRouter>
        <EditBrandPage />
      </MemoryRouter>
    );

    const cancelButton = screen.getByText(/cancelar/i);
    fireEvent.click(cancelButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/brands");
  });
});
