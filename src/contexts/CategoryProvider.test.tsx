// src/contexts/CategoryProvider.test.tsx
import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { CategoryProvider } from "./CategoryProvider";
import { CategoryContext } from "./CategoryContext";
import type { CategoryContextType } from "../types/CategoryContextType";

function TestComponent() {
  const { categories, addCategory } = useContext<CategoryContextType>(CategoryContext);

  return (
    <div>
      <span data-testid="categories-length">{categories.length}</span>
      <button
        onClick={() =>
          addCategory({
            name: "Nova Categoria",
            description: "Categoria de teste",
          })
        }
      >
        Add
      </button>
    </div>
  );
}

describe("CategoryProvider", () => {
  it("deve inicializar com categorias mockadas", () => {
    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>
    );

    const lengthEl = screen.getByTestId("categories-length");
    // Deve ser > 0 pois vem do mock
    expect(Number(lengthEl.textContent)).toBeGreaterThan(0);
  });

  it("deve adicionar uma nova categoria corretamente", () => {
    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>
    );

    const lengthBefore = Number(screen.getByTestId("categories-length").textContent);

    screen.getByText("Add").click();

    const lengthAfter = Number(screen.getByTestId("categories-length").textContent);

    expect(lengthAfter).toBe(lengthBefore + 1);
  });
});
