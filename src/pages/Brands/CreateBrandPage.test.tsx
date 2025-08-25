// src/pages/Brands/CreateBrandPage.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import CreateBrandPage from "./CreateBrandPage";
// import { useBrands } from "../../hooks/useBrands";
import { MemoryRouter } from "react-router-dom";

// Mock do useNavigate do react-router-dom
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// Mock do hook useBrands
const mockedAddBrand = jest.fn();
jest.mock("../../hooks/useBrands", () => ({
  useBrands: () => ({
    addBrand: mockedAddBrand,
  }),
}));

describe("CreateBrandPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza o título e o formulário", () => {
    render(
      <MemoryRouter>
        <CreateBrandPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Adicionar Marca")).toBeInTheDocument();
    expect(screen.getByLabelText(/nome da marca/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancelar/i })).toBeInTheDocument();
  });

  it("chama addBrand e navega ao submeter o formulário", () => {
    render(
      <MemoryRouter>
        <CreateBrandPage />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/nome da marca/i);
    const submitBtn = screen.getByRole("button", { name: /salvar/i });

    fireEvent.change(input, { target: { value: "Nova Marca" } });
    fireEvent.click(submitBtn);

    expect(mockedAddBrand).toHaveBeenCalledWith("Nova Marca");
    expect(mockedNavigate).toHaveBeenCalledWith("/brands");
  });

  it("navega ao clicar no botão cancelar", () => {
    render(
      <MemoryRouter>
        <CreateBrandPage />
      </MemoryRouter>
    );

    const cancelBtn = screen.getByRole("button", { name: /cancelar/i });
    fireEvent.click(cancelBtn);

    expect(mockedNavigate).toHaveBeenCalledWith("/brands");
  });
});
