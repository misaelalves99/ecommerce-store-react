// src/pages/Products/EditProductPage.test.tsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EditProductPage from "./EditProductPage";
import { products as mockProducts } from "../../mocks/products";

// Mocks do react-router-dom
const mockNavigate = jest.fn();
const mockAlert = jest.fn();

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

// Mock do hook useProducts
const mockUpdateProduct = jest.fn();
jest.mock("@/hooks/useProducts", () => ({
  useProducts: () => ({
    products: mockProducts,
    updateProduct: mockUpdateProduct,
  }),
}));

// Mock dos hooks de categorias e marcas
jest.mock("@/hooks/useCategories", () => ({
  useCategories: () => ({
    categories: [{ id: 1, name: "Eletrônicos" }],
  }),
}));

jest.mock("@/hooks/useBrands", () => ({
  useBrands: () => ({
    brands: [{ id: 1, name: "Marca A" }],
  }),
}));

// Tipando useParams
import { useParams as useParamsMock } from "react-router-dom";

beforeAll(() => {
  global.alert = mockAlert;
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("EditProductPage", () => {
  it("renderiza o formulário com os dados do produto existente", async () => {
    (useParamsMock as jest.Mock).mockReturnValue({ id: "1" });

    render(
      <MemoryRouter initialEntries={["/products/edit/1"]}>
        <Routes>
          <Route path="/products/edit/:id" element={<EditProductPage />} />
        </Routes>
      </MemoryRouter>
    );

    const product = mockProducts.find((p) => p.id === 1)!;

    expect(await screen.findByDisplayValue(product.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(product.sku)).toBeInTheDocument();
  });

  it("mostra 'Carregando...' se o produto não existir", () => {
    (useParamsMock as jest.Mock).mockReturnValue({ id: "999" });

    render(
      <MemoryRouter initialEntries={["/products/edit/999"]}>
        <Routes>
          <Route path="/products/edit/:id" element={<EditProductPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/carregando produto/i)).toBeInTheDocument();
  });

  it("alerta e navega se o produto não for encontrado", async () => {
    (useParamsMock as jest.Mock).mockReturnValue({ id: "999" });

    render(
      <MemoryRouter initialEntries={["/products/edit/999"]}>
        <Routes>
          <Route path="/products/edit/:id" element={<EditProductPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith("Produto não encontrado.");
      expect(mockNavigate).toHaveBeenCalledWith("/products");
    });
  });

  it("chama updateProduct e navega ao salvar o formulário", async () => {
    (useParamsMock as jest.Mock).mockReturnValue({ id: "1" });

    render(
      <MemoryRouter initialEntries={["/products/edit/1"]}>
        <Routes>
          <Route path="/products/edit/:id" element={<EditProductPage />} />
        </Routes>
      </MemoryRouter>
    );

    const product = mockProducts.find((p) => p.id === 1)!;

    const nameInput = await screen.findByDisplayValue(product.name);
    fireEvent.change(nameInput, { target: { value: "Produto Atualizado" } });

    const saveButton = screen.getByRole("button", { name: /salvar/i });
    fireEvent.click(saveButton);

    expect(mockUpdateProduct).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Produto Atualizado" })
    );
    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });

  it("chama navigate ao cancelar a edição", async () => {
    (useParamsMock as jest.Mock).mockReturnValue({ id: "1" });

    render(
      <MemoryRouter initialEntries={["/products/edit/1"]}>
        <Routes>
          <Route path="/products/edit/:id" element={<EditProductPage />} />
        </Routes>
      </MemoryRouter>
    );

    const product = mockProducts.find((p) => p.id === 1)!;
    await screen.findByDisplayValue(product.name);

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    fireEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });
});
