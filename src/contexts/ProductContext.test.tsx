// src/contexts/ProductContext.test.tsx

import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { ProductContext } from "./ProductContext";
import type { ProductContextType } from "../types/ProductContextType";

function TestComponent() {
  const context = useContext<ProductContextType>(ProductContext);

  return (
    <div data-testid="context-value">
      {context ? "Has Value" : "Undefined"}
    </div>
  );
}

describe("ProductContext", () => {
  it("deve ser criado com valor inicial definido", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("context-value").textContent).toBe("Has Value");
  });
});
