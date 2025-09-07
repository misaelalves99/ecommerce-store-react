// src/components/Brand/BrandList.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BrandList from './BrandList';
import { Brand } from '../../types/Brand';

// Mock de useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockBrands: Brand[] = [
  { id: 1, name: 'Marca A', createdAt: '2025-08-22T12:00:00Z' },
  { id: 2, name: 'Marca B', createdAt: '2025-08-22T12:10:00Z' },
];

describe('BrandList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar mensagem quando não houver marcas', () => {
    render(
      <MemoryRouter>
        <BrandList brands={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Nenhuma marca cadastrada/i)).toBeInTheDocument();
  });

  it('deve renderizar tabela com marcas e ações', () => {
    render(
      <MemoryRouter>
        <BrandList brands={mockBrands} />
      </MemoryRouter>
    );

    mockBrands.forEach((brand) => {
      expect(screen.getByText(brand.id.toString())).toBeInTheDocument();
      expect(screen.getByText(brand.name)).toBeInTheDocument();

      const detalhesLink = screen.getByRole('link', { name: /Detalhes/i, hidden: false });
      expect(detalhesLink).toHaveAttribute('href', `/brands/details/${brand.id}`);

      const editarLink = screen.getByRole('link', { name: /Editar/i, hidden: false });
      expect(editarLink).toHaveAttribute('href', `/brands/edit/${brand.id}`);
    });

    expect(screen.getAllByRole('button', { name: /Excluir/i })).toHaveLength(mockBrands.length);
  });

  it('deve chamar onDelete quando fornecido', () => {
    const handleDelete = jest.fn();

    render(
      <MemoryRouter>
        <BrandList brands={mockBrands} onDelete={handleDelete} />
      </MemoryRouter>
    );

    const excluirBtn = screen.getAllByRole('button', { name: /Excluir/i })[0];
    fireEvent.click(excluirBtn);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(mockBrands[0].id);
  });

  it('deve chamar navigate quando onDelete não for fornecido', () => {
    render(
      <MemoryRouter>
        <BrandList brands={mockBrands} />
      </MemoryRouter>
    );

    const excluirBtn = screen.getAllByRole('button', { name: /Excluir/i })[1];
    fireEvent.click(excluirBtn);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(`/brands/delete/${mockBrands[1].id}`);
  });
});
