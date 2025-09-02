// src/hooks/useCategories.test.tsx

import { render, screen } from "@testing-library/react";
import { CategoryProvider } from "../contexts/CategoryProvider";
import { useCategories } from "./useCategories";

// Componente auxiliar para testar o hook
function TestComponent() {
  const { categories, addCategory } = useCategories();
  return (
    <div>
      <div data-testid="categories-count">{categories.length}</div>
      <button
        onClick={() =>
          addCategory({
            name: "Nova Categoria",
            description: "Descrição da nova categoria",
          })
        }
      >
        Adicionar Categoria
      </button>
    </div>
  );
}

describe("useCategories", () => {
  it("lança erro se usado fora de CategoryProvider", () => {
    const renderWithoutProvider = () =>
      render(
        <div>
          <TestComponent />
        </div>
      );

    expect(renderWithoutProvider).toThrow(
      "useCategories must be used within a CategoryProvider"
    );
  });

  it("retorna categorias iniciais dentro de CategoryProvider", () => {
    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>
    );

    expect(screen.getByTestId("categories-count").textContent).not.toBe("0");
  });

  it("adiciona uma nova categoria corretamente", () => {
    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>
    );

    const before = Number(screen.getByTestId("categories-count").textContent);

    screen.getByText("Adicionar Categoria").click();

    const after = Number(screen.getByTestId("categories-count").textContent);

    expect(after).toBe(before + 1);
  });
});
