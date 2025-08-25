// src/pages/Category/CreateCategoryPage.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import CreateCategoryPage from "./CreateCategoryPage";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();
const mockAddCategory = jest.fn();

jest.mock('../../hooks/useCategories', () => ({
  useCategories: () => ({
    addCategory: mockAddCategory,
  }),
}));

jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe("CreateCategoryPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza título e formulário", () => {
    render(
      <MemoryRouter>
        <CreateCategoryPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/adicionar categoria/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByText(/salvar/i)).toBeInTheDocument();
    expect(screen.getByText(/cancelar/i)).toBeInTheDocument();
  });

  it("chama addCategory e navigate ao enviar o formulário", () => {
    render(
      <MemoryRouter>
        <CreateCategoryPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: "Nova Categoria" } });
    fireEvent.change(screen.getByLabelText(/descrição/i), { target: { value: "Descrição da categoria" } });

    fireEvent.click(screen.getByText(/salvar/i));

    expect(mockAddCategory).toHaveBeenCalledWith({
      name: "Nova Categoria",
      description: "Descrição da categoria",
    });
    expect(mockNavigate).toHaveBeenCalledWith("/categories");
  });

  it("chama navigate ao cancelar", () => {
    render(
      <MemoryRouter>
        <CreateCategoryPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/cancelar/i));

    expect(mockNavigate).toHaveBeenCalledWith("/categories");
  });
});
