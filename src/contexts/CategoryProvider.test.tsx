// src/contexts/CategoryProvider.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { useContext } from "react";
import { CategoryProvider } from "./CategoryProvider";
import { CategoryContext } from "./CategoryContext";
import type { CategoryContextType } from "../types/CategoryContextType";

function TestComponent() {
  const { categories, addCategory, updateCategory, deleteCategory } = useContext<CategoryContextType>(CategoryContext);

  return (
    <div>
      <span data-testid="categories-length">{categories.length}</span>

      <button
        onClick={() =>
          addCategory({ name: "Nova Categoria", description: "Categoria de teste" })
        }
      >
        Add
      </button>

      <button
        onClick={() =>
          categories[0] && updateCategory(categories[0].id, { name: "Atualizada", description: "Descrição atualizada" })
        }
      >
        Update First
      </button>

      <button
        onClick={() =>
          categories[0] && deleteCategory(categories[0].id)
        }
      >
        Delete First
      </button>

      <ul>
        {categories.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}

describe("CategoryProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve inicializar com categorias mockadas", () => {
    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>
    );

    const lengthEl = screen.getByTestId("categories-length");
    expect(Number(lengthEl.textContent)).toBeGreaterThan(0);
  });

  it("deve adicionar uma nova categoria corretamente", () => {
    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>
    );

    const lengthBefore = Number(screen.getByTestId("categories-length").textContent);
    fireEvent.click(screen.getByText("Add"));
    const lengthAfter = Number(screen.getByTestId("categories-length").textContent);

    expect(lengthAfter).toBe(lengthBefore + 1);
    expect(screen.getByText("Nova Categoria")).toBeInTheDocument();
  });

  it("deve atualizar a primeira categoria corretamente", () => {
    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>
    );

    const firstCategoryBefore = screen.getAllByRole("listitem")[0].textContent;
    fireEvent.click(screen.getByText("Update First"));
    const firstCategoryAfter = screen.getAllByRole("listitem")[0].textContent;

    expect(firstCategoryAfter).not.toBe(firstCategoryBefore);
    expect(firstCategoryAfter).toBe("Atualizada");
  });

  it("deve remover a primeira categoria corretamente", () => {
    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>
    );

    const lengthBefore = Number(screen.getByTestId("categories-length").textContent);
    fireEvent.click(screen.getByText("Delete First"));
    const lengthAfter = Number(screen.getByTestId("categories-length").textContent);

    expect(lengthAfter).toBe(lengthBefore - 1);
  });
});
