// src/pages/Category/EditCategoryPage.test.tsx

import { render, screen, waitFor } from "@testing-library/react";
import EditCategoryPage from "./EditCategoryPage";
import { MemoryRouter, Routes, Route, useParams } from "react-router-dom";
import { categories as mockCategories } from "../../mocks/categories";

// Mocks
const mockNavigate = jest.fn();
const mockAlert = jest.fn();

// Mock de react-router-dom
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

beforeAll(() => {
  global.alert = mockAlert;
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("EditCategoryPage", () => {
  it("exibe loading inicialmente", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <EditCategoryPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/carregando categoria/i)).toBeInTheDocument();
  });

  it("renderiza o formulário com dados da categoria existente", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<EditCategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    const category = mockCategories.find(c => c.id === 1)!;

    await waitFor(() => {
      expect(screen.getByText(/editar categoria/i)).toBeInTheDocument();
    });

    expect(screen.getByDisplayValue(category.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(category.description)).toBeInTheDocument();
    expect(screen.getByText(/salvar/i)).toBeInTheDocument();
    expect(screen.getByText(/cancelar/i)).toBeInTheDocument();
  });

  it("alerta e navega se a categoria não existe", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "999" });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<EditCategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith("Categoria não encontrada.");
      expect(mockNavigate).toHaveBeenCalledWith("/categories");
    });
  });
});
