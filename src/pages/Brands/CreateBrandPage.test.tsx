// src/pages/Brands/CreateBrandPage.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import CreateBrandPage from "./CreateBrandPage";
import { MemoryRouter } from "react-router-dom";

const mockedNavigate = jest.fn();
const mockedAddBrand = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

jest.mock("../../hooks/useBrands", () => ({
  useBrands: () => ({
    addBrand: mockedAddBrand,
  }),
}));

describe("CreateBrandPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza título e formulário corretamente", () => {
    render(
      <MemoryRouter>
        <CreateBrandPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/adicionar marca/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome da marca/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancelar/i })).toBeInTheDocument();
  });

  it("submete o formulário corretamente", () => {
    render(
      <MemoryRouter>
        <CreateBrandPage />
      </MemoryRouter>
    );

    const input = screen.getByLabelText(/nome da marca/i);
    const saveButton = screen.getByRole("button", { name: /salvar/i });

    fireEvent.change(input, { target: { value: "Marca Teste" } });
    fireEvent.click(saveButton);

    expect(mockedAddBrand).toHaveBeenCalledWith("Marca Teste");
    expect(mockedNavigate).toHaveBeenCalledWith("/brands");
  });

  it("cancela e navega corretamente", () => {
    render(
      <MemoryRouter>
        <CreateBrandPage />
      </MemoryRouter>
    );

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(mockedNavigate).toHaveBeenCalledWith("/brands");
  });

  it("não permite submeter com campo vazio", () => {
    render(
      <MemoryRouter>
        <CreateBrandPage />
      </MemoryRouter>
    );

    const saveButton = screen.getByRole("button", { name: /salvar/i });
    fireEvent.click(saveButton);

    // Garantir que não chamou addBrand se o input estiver vazio
    expect(mockedAddBrand).not.toHaveBeenCalled();
    expect(mockedNavigate).not.toHaveBeenCalled();
  });
});
