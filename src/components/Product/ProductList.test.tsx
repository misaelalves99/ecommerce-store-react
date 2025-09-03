// src/components/Product/ProductList.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductList from './ProductList';
import type { Product } from '../../types/Product';

describe('ProductList', () => {
  const products: Product[] = [
    {
      id: 1,
      name: 'Produto 1',
      description: 'Descrição Produto 1',
      sku: 'SKU001',
      price: 100,
      stock: 10,
      category: { id: 1, name: 'Categoria A' },
      brand: { id: 1, name: 'Marca X' },
      isActive: true,
      categoryId: 1,
      brandId: 1,
    },
    {
      id: 2,
      name: 'Produto 2',
      description: 'Descrição Produto 2',
      sku: 'SKU002',
      price: 50,
      stock: 0,
      category: undefined,
      brand: undefined,
      isActive: false,
      categoryId: 0,
      brandId: 0,
    },
  ];

  const onEditMock = jest.fn();
  const onDeleteMock = jest.fn();
  const onDetailsMock = jest.fn();

  const renderComponent = (prods = products) =>
    render(
      <BrowserRouter>
        <ProductList
          products={prods}
          onEdit={onEditMock}
          onDelete={onDeleteMock}
          onDetails={onDetailsMock}
        />
      </BrowserRouter>
    );

  it('deve renderizar tabela com produtos', () => {
    renderComponent();

    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('R$ 100.00')).toBeInTheDocument();
    expect(screen.getByText('Categoria A')).toBeInTheDocument();
    expect(screen.getByText('Marca X')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();

    expect(screen.getByText('Produto 2')).toBeInTheDocument();
    expect(screen.getByText('R$ 50.00')).toBeInTheDocument();
    expect(screen.getAllByText('0').length).toBeGreaterThan(0); // CategoriaId e BrandId
    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });

  it('deve chamar callbacks corretos ao clicar nos botões', () => {
    renderComponent();
    const detalhesButton = screen.getAllByText('Detalhes')[0];
    const editarButton = screen.getAllByText('Editar')[0];
    const excluirButton = screen.getAllByText('Excluir')[0];

    fireEvent.click(detalhesButton);
    fireEvent.click(editarButton);
    fireEvent.click(excluirButton);

    expect(onDetailsMock).toHaveBeenCalledWith(1);
    expect(onEditMock).toHaveBeenCalledWith(1);
    expect(onDeleteMock).toHaveBeenCalledWith(1);
  });

  it('deve exibir mensagem adequada quando lista de produtos estiver vazia', () => {
    renderComponent([]);

    const emptyMessage = screen.getByText('Nenhum produto encontrado');
    expect(emptyMessage).toBeInTheDocument();
  });
});
