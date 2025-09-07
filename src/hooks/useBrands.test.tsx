import { render, screen, fireEvent } from "@testing-library/react";
import { BrandProvider } from "../contexts/BrandProvider";
import { useBrands } from "./useBrands";

function TestComponent() {
  const { brands, addBrand } = useBrands();

  return (
    <div>
      <div data-testid="brands-count">{brands.length}</div>
      <button
        onClick={() => addBrand({ name: "Nova Marca" })}
      >
        Adicionar Marca
      </button>
    </div>
  );
}

describe("useBrands", () => {
  it("lança erro se usado fora de BrandProvider", () => {
    const renderWithoutProvider = () => render(<TestComponent />);
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
