// src/contexts/ProductProvider.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { useContext } from "react";
import { ProductProvider } from "./ProductProvider";
import { ProductContext } from "./ProductContext";

function TestConsumer() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("ProductContext não encontrado");

  const { products, addProduct, updateProduct, deleteProduct } = context;

  return (
    <div>
      <div data-testid="products-count">{products.length}</div>

      <button
        onClick={() =>
          addProduct({
            name: "Produto Teste",
            description: "Desc teste",
            sku: "SKU-001",
            price: 100,
            stock: 10,
            categoryName: "Categoria A",
            brandName: "Marca X",
            isActive: true,
          })
        }
      >
        Adicionar
      </button>

      <button
        onClick={() => products[0] && updateProduct({ ...products[0], name: "Atualizado" })}
      >
        Atualizar Primeiro
      </button>

      <button
        onClick={() => products[0] && deleteProduct(products[0].id)}
      >
        Deletar Primeiro
      </button>

      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

describe("ProductProvider", () => {
  it("fornece a lista inicial de produtos do mock", () => {
    render(
      <ProductProvider>
        <TestConsumer />
      </ProductProvider>
    );

    const initialCount = Number(screen.getByTestId("products-count").textContent);
    expect(initialCount).toBeGreaterThan(0);
  });

  it("adiciona um novo produto corretamente", () => {
    render(
      <ProductProvider>
        <TestConsumer />
      </ProductProvider>
    );

    const countBefore = Number(screen.getByTestId("products-count").textContent);
    fireEvent.click(screen.getByText("Adicionar"));
    const countAfter = Number(screen.getByTestId("products-count").textContent);

    expect(countAfter).toBe(countBefore + 1);
    expect(screen.getByText("Produto Teste")).toBeInTheDocument();
  });

  it("atualiza o primeiro produto corretamente", () => {
    render(
      <ProductProvider>
        <TestConsumer />
      </ProductProvider>
    );

    const firstNameBefore = screen.getAllByRole("listitem")[0].textContent;
    fireEvent.click(screen.getByText("Atualizar Primeiro"));
    const firstNameAfter = screen.getAllByRole("listitem")[0].textContent;

    expect(firstNameAfter).not.toBe(firstNameBefore);
    expect(firstNameAfter).toBe("Atualizado");
  });

  it("deleta o primeiro produto corretamente", () => {
    render(
      <ProductProvider>
        <TestConsumer />
      </ProductProvider>
    );

    const countBefore = Number(screen.getByTestId("products-count").textContent);
    fireEvent.click(screen.getByText("Deletar Primeiro"));
    const countAfter = Number(screen.getByTestId("products-count").textContent);

    expect(countAfter).toBe(countBefore - 1);
  });
});
