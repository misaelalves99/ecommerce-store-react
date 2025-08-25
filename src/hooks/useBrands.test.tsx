import { render, screen, fireEvent } from "@testing-library/react";
import { BrandProvider } from "../contexts/BrandProvider";
import { useBrands } from "./useBrands";
import type { Brand } from "../types/Brand";

// Componente de teste para consumir o hook
function TestComponent() {
  const { brands, addBrand } = useBrands();

  // Cria objeto Brand com id e createdAt automaticamente
  const handleAddBrand = () => {
    const newBrand: Omit<Brand, "id" | "createdAt"> = { name: "Nova Marca" };
    addBrand(newBrand);
  };

  return (
    <div>
      <div data-testid="brands-count">{brands.length}</div>
      <button onClick={handleAddBrand}>Adicionar Marca</button>
    </div>
  );
}

describe("useBrands", () => {
  it("lança erro se usado fora de BrandProvider", () => {
    const renderWithoutProvider = () =>
      render(
        <div>
          <TestComponent />
        </div>
      );

    expect(renderWithoutProvider).toThrow(
      "useBrands must be used within a BrandProvider"
    );
  });

  it("retorna marcas iniciais dentro de BrandProvider", () => {
    render(
      <BrandProvider>
        <TestComponent />
      </BrandProvider>
    );

    expect(Number(screen.getByTestId("brands-count").textContent)).toBeGreaterThan(0);
  });

  it("adiciona uma nova marca corretamente", () => {
    render(
      <BrandProvider>
        <TestComponent />
      </BrandProvider>
    );

    const before = Number(screen.getByTestId("brands-count").textContent);

    fireEvent.click(screen.getByText("Adicionar Marca"));

    const after = Number(screen.getByTestId("brands-count").textContent);

    expect(after).toBe(before + 1);
  });
});
