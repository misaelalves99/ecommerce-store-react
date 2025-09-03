// src/pages/Brand/DeleteBrandPage.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import DeleteBrandPage from './DeleteBrandPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock do hook useBrands
const mockDeleteBrand = jest.fn();
jest.mock('@/hooks/useBrands', () => ({
  useBrands: () => ({
    brands: [
      { id: 1, name: 'Marca X' },
      { id: 2, name: 'Marca Y' },
    ],
    deleteBrand: mockDeleteBrand,
  }),
}));

// Mock do window.confirm
const confirmMock = jest.spyOn(window, 'confirm');

describe('DeleteBrandPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (id: string) =>
    render(
      <MemoryRouter initialEntries={[`/brands/delete/${id}`]}>
        <Routes>
          <Route path="/brands/delete/:id" element={<DeleteBrandPage />} />
          <Route path="/brands" element={<div>Marcas Página</div>} />
        </Routes>
      </MemoryRouter>
    );

  it('renderiza loading quando a marca não é encontrada', () => {
    renderWithRouter('999'); // id inexistente
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });

  it('renderiza corretamente a marca encontrada', () => {
    renderWithRouter('1');
    expect(screen.getByText(/Excluir Marca/i)).toBeInTheDocument();
    expect(screen.getByText(/Tem certeza que deseja excluir a marca/i)).toBeInTheDocument();
    expect(screen.getByText('Marca X')).toBeInTheDocument();
    expect(screen.getByText('Excluir')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });

  it('cancela exclusão se window.confirm retornar false', () => {
    confirmMock.mockReturnValue(false);
    renderWithRouter('1');

    fireEvent.click(screen.getByText('Excluir'));
    expect(mockDeleteBrand).not.toHaveBeenCalled();
  });

  it('exclui a marca se window.confirm retornar true e navega', () => {
    confirmMock.mockReturnValue(true);
    renderWithRouter('1');

    fireEvent.click(screen.getByText('Excluir'));

    expect(mockDeleteBrand).toHaveBeenCalledWith(1);
    expect(screen.getByText('Marcas Página')).toBeInTheDocument(); // navegou
  });

  it('navega sem excluir ao clicar em cancelar', () => {
    renderWithRouter('1');

    fireEvent.click(screen.getByText('Cancelar'));

    expect(mockDeleteBrand).not.toHaveBeenCalled();
    expect(screen.getByText('Marcas Página')).toBeInTheDocument();
  });
});
