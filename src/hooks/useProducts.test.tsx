// src/hooks/useProducts.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { ProductProvider } from "@/contexts/ProductProvider";
import { useProducts } from "./useProducts";
import type { OmitProduct } from "@/types/Product";

// Componente auxiliar para consumir o hook
function TestComponent() {
  const { products, addProduct } = useProducts();

  const handleAddProduct = () => {
    const newProduct: OmitProduct = {
      name: "Produto Teste",
      description: "Descrição do Produto",
      sku: "SKU-TESTE",
      price: 100,
      stock: 10,
      categoryId: 1,
      brandId: 1,
      isActive: true,
    };
    addProduct(newProduct);
  };

  return (
    <div>
      <div data-testid="products-count">{products.length}</div>
      <button onClick={handleAddProduct}>Adicionar Produto</button>
    </div>
  );
}

describe("useProducts", () => {
  it("lança erro se usado fora de ProductProvider", () => {
    const renderWithoutProvider = () =>
      render(
        <div>
          <TestComponent />
        </div>
      );

    expect(renderWithoutProvider).toThrow(
      "useProducts must be used within a ProductProvider"
    );
  });

  it("retorna produtos iniciais dentro de ProductProvider", () => {
    render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>
    );

    expect(Number(screen.getByTestId("products-count").textContent)).not.toBe(0);
  });

  it("adiciona um novo produto corretamente", () => {
    render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>
    );

    const before = Number(screen.getByTestId("products-count").textContent);

    fireEvent.click(screen.getByText("Adicionar Produto"));

    const after = Number(screen.getByTestId("products-count").textContent);

    expect(after).toBe(before + 1);
  });
});
