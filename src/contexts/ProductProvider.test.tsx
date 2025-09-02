// src/contexts/ProductProvider.test.tsx

import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { ProductProvider } from "./ProductProvider";
import { ProductContext } from "./ProductContext";
import { Product } from "../types/Product";

function TestConsumer() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("ProductContext não encontrado");

  const { products, addProduct } = context;

  return (
    <div>
      <div data-testid="products-count">{products.length}</div>
      <button
        onClick={() =>
          addProduct({
            id: 0,
            name: "Produto Teste",
            description: "Desc teste",
            sku: "SKU-001",
            price: 100,
            stock: 10,
            categoryId: 1,
            brandId: 1,
            category: undefined,
            brand: undefined,
            isActive: true,
          } as Product)
        }
      >
        Adicionar
      </button>
    </div>
  );
}

describe("ProductProvider", () => {
  it("fornece a lista inicial de produtos do contexto", () => {
    render(
      <ProductProvider>
        <TestConsumer />
      </ProductProvider>
    );

    expect(screen.getByTestId("products-count").textContent).not.toBe("0");
  });

  it("adiciona um novo produto corretamente", () => {
    render(
      <ProductProvider>
        <TestConsumer />
      </ProductProvider>
    );

    const countBefore = screen.getByTestId("products-count").textContent;

    screen.getByText("Adicionar").click();

    const countAfter = screen.getByTestId("products-count").textContent;

    expect(Number(countAfter)).toBe(Number(countBefore) + 1);
  });
});
