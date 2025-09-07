import { render, screen, fireEvent } from "@testing-library/react";
import { ProductProvider } from "../contexts/ProductProvider";
import { useProducts } from "./useProducts";

function TestComponent() {
  const { products, addProduct } = useProducts();

  return (
    <div>
      <div data-testid="products-count">{products.length}</div>
      <button
        onClick={() =>
          addProduct({
            name: "Produto Teste",
            description: "Descrição",
            sku: "SKU-TESTE",
            price: 100,
            stock: 10,
            isActive: true,
            categoryName: "Categoria A",
            brandName: "Marca X",
          })
        }
      >
        Adicionar Produto
      </button>
    </div>
  );
}

describe("useProducts", () => {
  it("lança erro se usado fora de ProductProvider", () => {
    const renderWithoutProvider = () => render(<TestComponent />);
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

    expect(Number(screen.getByTestId("products-count").textContent)).toBeGreaterThan(0);
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
