// src/components/Navbar/Navbar.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('deve renderizar todas as links principais', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Produtos/i)).toBeInTheDocument();
    expect(screen.getByText(/Categorias/i)).toBeInTheDocument();
    expect(screen.getByText(/Marcas/i)).toBeInTheDocument();
  });

  it('deve alternar estado do menu ao clicar no botão de toggle', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole('button', { name: /toggle navigation/i });
    const collapseDiv = screen.getByTestId('navbar-collapse');

    // Inicialmente não colapsado
    expect(collapseDiv.className).not.toMatch(/collapse/);

    // Clicar para colapsar
    fireEvent.click(toggleButton);
    expect(collapseDiv.className).toMatch(/collapse/);

    // Clicar novamente para abrir
    fireEvent.click(toggleButton);
    expect(collapseDiv.className).not.toMatch(/collapse/);
  });

  it('deve exibir o logo e o texto da marca', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logo = screen.getByAltText(/Ecommerce/i);
    expect(logo).toBeInTheDocument();

    expect(screen.getByText(/Loja Virtual/i)).toBeInTheDocument();
  });
});
