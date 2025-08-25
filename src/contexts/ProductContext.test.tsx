import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { ProductContext } from "./ProductContext";
import type { ProductContextType } from "../types/ProductContextType";

function TestComponent() {
  // Usa ProductContextType para tipar o contexto
  const context = useContext<ProductContextType | undefined>(ProductContext);

  return (
    <div data-testid="context-value">
      {context ? "Has Value" : "Undefined"}
    </div>
  );
}

describe("ProductContext", () => {
  it("deve ser criado com valor inicial undefined", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("context-value").textContent).toBe("Undefined");
  });
});
