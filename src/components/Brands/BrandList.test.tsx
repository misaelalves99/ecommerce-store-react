// src/components/Brand/BrandList.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BrandList from './BrandList';
import { Brand } from '../../types/Brand';

const mockBrands: Brand[] = [
  { id: 1, name: 'Marca A', createdAt: '2025-08-22T12:00:00Z' },
  { id: 2, name: 'Marca B', createdAt: '2025-08-22T12:10:00Z' },
];

describe('BrandList', () => {
  it('deve renderizar mensagem quando não houver marcas', () => {
    render(
      <MemoryRouter>
        <BrandList brands={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Nenhuma marca cadastrada/i)).toBeInTheDocument();
  });

  it('deve renderizar tabela com marcas', () => {
    render(
      <MemoryRouter>
        <BrandList brands={mockBrands} />
      </MemoryRouter>
    );

    mockBrands.forEach((brand) => {
      expect(screen.getByText(brand.id.toString())).toBeInTheDocument();
      expect(screen.getByText(brand.name)).toBeInTheDocument();

      // Buscar links e botão corretamente
      const detalhesLinks = screen.getAllByRole('link', { name: /Detalhes/i });
      const editarLinks = screen.getAllByRole('link', { name: /Editar/i });
      const excluirBtns = screen.getAllByRole('button', { name: /Excluir/i });

      expect(detalhesLinks.length).toBe(mockBrands.length);
      expect(editarLinks.length).toBe(mockBrands.length);
      expect(excluirBtns.length).toBe(mockBrands.length);
    });
  });

  it('deve disparar alert ao clicar no botão Excluir', () => {
    window.alert = jest.fn();

    render(
      <MemoryRouter>
        <BrandList brands={mockBrands} />
      </MemoryRouter>
    );

    const excluirBtn = screen.getAllByRole('button', { name: /Excluir/i })[0];
    fireEvent.click(excluirBtn);

    expect(window.alert).toHaveBeenCalledWith(`Excluir marca ${mockBrands[0].name}`);
  });
});
