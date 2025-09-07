import { render, screen, fireEvent } from "@testing-library/react";
import { CategoryProvider } from "../contexts/CategoryProvider";
import { useCategories } from "./useCategories";

function TestComponent() {
  const { categories, addCategory } = useCategories();

  return (
    <div>
      <div data-testid="categories-count">{categories.length}</div>
      <button
        onClick={() => addCategory({ name: "Nova Categoria", description: "Descrição" })}
      >
        Adicionar Categoria
      </button>
    </div>
  );
}

describe("useCategories", () => {
  it("lança erro se usado fora de CategoryProvider", () => {
    const renderWithoutProvider = () => render(<TestComponent />);
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

    expect(Number(screen.getByTestId("categories-count").textContent)).toBeGreaterThan(0);
  });

  it("adiciona uma nova categoria corretamente", () => {
    render(
      <CategoryProvider>
        <TestComponent />
      </CategoryProvider>
    );

    const before = Number(screen.getByTestId("categories-count").textContent);
    fireEvent.click(screen.getByText("Adicionar Categoria"));
    const after = Number(screen.getByTestId("categories-count").textContent);

    expect(after).toBe(before + 1);
  });
});
