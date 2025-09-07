// src/components/Category/CategoryList.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CategoryList from './CategoryList';
import { Category } from '../../types/Category';

describe('CategoryList', () => {
  const categoriesMock: Category[] = [
    { id: 1, name: 'Categoria A', description: 'Descrição A', createdAt: '2025-08-22T12:00:00Z' },
    { id: 2, name: 'Categoria B', description: 'Descrição B', createdAt: '2025-08-22T12:05:00Z' },
  ];

  it('deve renderizar mensagem se não houver categorias', () => {
    render(
      <MemoryRouter>
        <CategoryList categories={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Nenhuma categoria cadastrada/i)).toBeInTheDocument();
  });

  it('deve renderizar a tabela com categorias', () => {
    render(
      <MemoryRouter>
        <CategoryList categories={categoriesMock} />
      </MemoryRouter>
    );

    categoriesMock.forEach((cat) => {
      expect(screen.getByText(cat.id.toString())).toBeInTheDocument();
      expect(screen.getByText(cat.name)).toBeInTheDocument();
      expect(screen.getByText(cat.description)).toBeInTheDocument();
    });

    // Verifica se os links e botões de ação existem
    expect(screen.getAllByText(/Detalhes/i)).toHaveLength(categoriesMock.length);
    expect(screen.getAllByText(/Editar/i)).toHaveLength(categoriesMock.length);
    expect(screen.getAllByText(/Excluir/i)).toHaveLength(categoriesMock.length);
  });

  it('deve chamar onDelete ao clicar em excluir', () => {
    const onDeleteMock = jest.fn();

    render(
      <MemoryRouter>
        <CategoryList categories={categoriesMock} onDelete={onDeleteMock} />
      </MemoryRouter>
    );

    const deleteButtons = screen.getAllByText(/Excluir/i);
    fireEvent.click(deleteButtons[0]);

    expect(onDeleteMock).toHaveBeenCalledTimes(1);
    expect(onDeleteMock).toHaveBeenCalledWith(categoriesMock[0].id);
  });
});
