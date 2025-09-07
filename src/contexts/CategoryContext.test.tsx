// src/contexts/CategoryContext.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import { useContext } from "react";
import { CategoryContext } from "./CategoryContext";
import type { CategoryContextType } from "../types/CategoryContextType";

function TestComponent() {
  const { categories, addCategory } = useContext<CategoryContextType>(CategoryContext);

  return (
    <div>
      <span data-testid="categories-length">{categories.length}</span>
      <button onClick={() => addCategory({ name: "Nova Categoria", description: "Descrição" })}>
        Add
      </button>
    </div>
  );
}

describe("CategoryContext", () => {
  it("deve fornecer valores padrão corretos", () => {
    render(<TestComponent />);

    // Valor inicial deve ser 0
    expect(screen.getByTestId("categories-length").textContent).toBe("0");

    // Como addCategory do contexto padrão é uma função vazia, não altera nada
    fireEvent.click(screen.getByText("Add"));
    expect(screen.getByTestId("categories-length").textContent).toBe("0");
  });
});
