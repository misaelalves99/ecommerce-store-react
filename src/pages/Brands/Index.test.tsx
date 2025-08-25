// src/pages/Brand/Index.test.tsx

import { render, screen } from "@testing-library/react";
import BrandsPage from "./Index";
import { MemoryRouter } from "react-router-dom";

const mockBrands = [
  { id: 1, name: "Nike", createdAt: "2024-01-10T10:00:00Z" },
  { id: 2, name: "Adidas", createdAt: "2024-02-15T14:30:00Z" },
];

// Mock do hook useBrands
const mockedUseBrands = jest.fn();
jest.mock('@/hooks/useBrands', () => ({
  useBrands: () => mockedUseBrands(),
}));

describe("BrandsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza título e botão de adicionar marca", () => {
    mockedUseBrands.mockReturnValue({ brands: mockBrands });

    render(
      <MemoryRouter>
        <BrandsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/marcas/i)).toBeInTheDocument();
    expect(screen.getByText(/adicionar marca/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /adicionar marca/i })).toHaveAttribute(
      'href',
      '/brands/create'
    );
  });

  it("renderiza a lista de marcas", () => {
    mockedUseBrands.mockReturnValue({ brands: mockBrands });

    render(
      <MemoryRouter>
        <BrandsPage />
      </MemoryRouter>
    );

    mockBrands.forEach((brand) => {
      expect(screen.getByText(brand.name)).toBeInTheDocument();
    });
  });

  it("renderiza mensagem de lista vazia se não houver marcas", () => {
    mockedUseBrands.mockReturnValue({ brands: [] });

    render(
      <MemoryRouter>
        <BrandsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/nenhuma marca cadastrada/i)).toBeInTheDocument();
  });
});
