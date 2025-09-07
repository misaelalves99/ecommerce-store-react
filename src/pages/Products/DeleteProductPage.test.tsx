// src/pages/Products/DeleteProductPage.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import DeleteProductPage from './DeleteProductPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { Product } from '@/types/Product';

// Mock do hook useProducts
const mockDeleteProduct = jest.fn();
jest.mock('@/hooks/useProducts', () => ({
  useProducts: () => ({
    products: [
      { id: 1, name: 'Produto 1', price: 100, stock: 10, categoryId: 1, brandId: 1, isActive: true },
      { id: 2, name: 'Produto 2', price: 50, stock: 0, categoryId: 2, brandId: 2, isActive: false },
    ] as Product[],
    deleteProduct: mockDeleteProduct,
  }),
}));

// Mock do window.confirm
const confirmMock = jest.spyOn(window, 'confirm');

describe('DeleteProductPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (id: string) =>
    render(
      <MemoryRouter initialEntries={[`/products/delete/${id}`]}>
        <Routes>
          <Route path="/products/delete/:id" element={<DeleteProductPage />} />
          <Route path="/products" element={<div>Página Produtos</div>} />
        </Routes>
      </MemoryRouter>
    );

  it('renderiza loading quando o produto não é encontrado', () => {
    renderWithRouter('999'); 
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });

  it('renderiza corretamente o produto encontrado', () => {
    renderWithRouter('1');
    expect(screen.getByText(/Excluir Produto/i)).toBeInTheDocument();
    expect(screen.getByText(/Tem certeza que deseja excluir o produto/i)).toBeInTheDocument();
    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('Excluir')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });

  it('cancela exclusão se window.confirm retornar false', () => {
    confirmMock.mockReturnValue(false);
    renderWithRouter('1');

    fireEvent.click(screen.getByText('Excluir'));
    expect(mockDeleteProduct).not.toHaveBeenCalled();
  });

  it('exclui o produto se window.confirm retornar true e navega', () => {
    confirmMock.mockReturnValue(true);
    renderWithRouter('1');

    fireEvent.click(screen.getByText('Excluir'));

    expect(mockDeleteProduct).toHaveBeenCalledWith(1);
    expect(screen.getByText('Página Produtos')).toBeInTheDocument();
  });

  it('navega sem excluir ao clicar em cancelar', () => {
    renderWithRouter('1');

    fireEvent.click(screen.getByText('Cancelar'));

    expect(mockDeleteProduct).not.toHaveBeenCalled();
    expect(screen.getByText('Página Produtos')).toBeInTheDocument();
  });
});
