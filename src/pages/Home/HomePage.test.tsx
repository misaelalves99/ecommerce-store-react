// src/pages/Home/HomePage.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

// Mock do useNavigate do react-router-dom
const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("HomePage", () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it("renderiza o título principal", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/bem-vindo ao painel administrativo/i)).toBeInTheDocument();
  });

  it("renderiza os botões de navegação", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /gerenciar marcas/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /gerenciar categorias/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /gerenciar produtos/i })).toBeInTheDocument();
  });

  it("navega para a rota correta ao clicar nos botões", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /gerenciar marcas/i }));
    expect(mockedNavigate).toHaveBeenCalledWith("/brands");

    fireEvent.click(screen.getByRole("button", { name: /gerenciar categorias/i }));
    expect(mockedNavigate).toHaveBeenCalledWith("/categories");

    fireEvent.click(screen.getByRole("button", { name: /gerenciar produtos/i }));
    expect(mockedNavigate).toHaveBeenCalledWith("/products");
  });
});
