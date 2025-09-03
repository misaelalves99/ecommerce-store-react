// src/pages/Category/DeleteCategoryPage.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import DeleteCategoryPage from './DeleteCategoryPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock do hook useCategories
const mockDeleteCategory = jest.fn();
jest.mock('@/hooks/useCategories', () => ({
  useCategories: () => ({
    categories: [
      { id: 1, name: 'Categoria A' },
      { id: 2, name: 'Categoria B' },
    ],
    deleteCategory: mockDeleteCategory,
  }),
}));

// Mock do window.confirm
const confirmMock = jest.spyOn(window, 'confirm');

describe('DeleteCategoryPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (id: string) =>
    render(
      <MemoryRouter initialEntries={[`/categories/delete/${id}`]}>
        <Routes>
          <Route path="/categories/delete/:id" element={<DeleteCategoryPage />} />
          <Route path="/categories" element={<div>Página Categorias</div>} />
        </Routes>
      </MemoryRouter>
    );

  it('renderiza loading quando a categoria não é encontrada', () => {
    renderWithRouter('999'); // id inexistente
    expect(screen.getByText(/Carregando.../i)).toBeInTheDocument();
  });

  it('renderiza corretamente a categoria encontrada', () => {
    renderWithRouter('1');
    expect(screen.getByText(/Excluir Categoria/i)).toBeInTheDocument();
    expect(screen.getByText(/Tem certeza que deseja excluir a categoria/i)).toBeInTheDocument();
    expect(screen.getByText('Categoria A')).toBeInTheDocument();
    expect(screen.getByText('Excluir')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });

  it('cancela exclusão se window.confirm retornar false', () => {
    confirmMock.mockReturnValue(false);
    renderWithRouter('1');

    fireEvent.click(screen.getByText('Excluir'));
    expect(mockDeleteCategory).not.toHaveBeenCalled();
  });

  it('exclui a categoria se window.confirm retornar true e navega', () => {
    confirmMock.mockReturnValue(true);
    renderWithRouter('1');

    fireEvent.click(screen.getByText('Excluir'));

    expect(mockDeleteCategory).toHaveBeenCalledWith(1);
    expect(screen.getByText('Página Categorias')).toBeInTheDocument(); // navegou
  });

  it('navega sem excluir ao clicar em cancelar', () => {
    renderWithRouter('1');

    fireEvent.click(screen.getByText('Cancelar'));

    expect(mockDeleteCategory).not.toHaveBeenCalled();
    expect(screen.getByText('Página Categorias')).toBeInTheDocument();
  });
});
