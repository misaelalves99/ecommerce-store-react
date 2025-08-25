// src/pages/Category/DetailsCategoryPage.test.tsx

import { render, screen, waitFor } from "@testing-library/react";
import DetailsCategoryPage from "./DetailsCategoryPage";
import { MemoryRouter, Route, Routes, useParams } from "react-router-dom";
import { categories as mockCategories } from "../../mocks/categories";

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

describe("DetailsCategoryPage", () => {
  it("exibe loading inicialmente", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <DetailsCategoryPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/carregando detalhes da categoria/i)).toBeInTheDocument();
  });

  it("renderiza detalhes da categoria existente", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<DetailsCategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/categoria - detalhes/i)).toBeInTheDocument();
    });

    const category = mockCategories.find(c => c.id === 1)!;
    expect(screen.getByText(category.name)).toBeInTheDocument();
    expect(screen.getByText(category.description)).toBeInTheDocument();
    expect(screen.getByText(/voltar/i)).toBeInTheDocument();
    expect(screen.getByText(/editar/i)).toBeInTheDocument();
  });

  it("alerta e navega se a categoria não existe", async () => {
    (useParams as jest.Mock).mockReturnValue({ id: "999" });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<DetailsCategoryPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith("Categoria não encontrada.");
      expect(mockNavigate).toHaveBeenCalledWith("/categories");
    });
  });
});
