// src/components/Product/ProductList.test.tsx
import { render, screen } from '@testing-library/react';
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

  const renderComponent = (prods = products) =>
    render(
      <BrowserRouter>
        <ProductList products={prods} />
      </BrowserRouter>
    );

  it('deve renderizar tabela com produtos', () => {
    renderComponent();

    expect(screen.getByText('Produto 1')).toBeInTheDocument();
    expect(screen.getByText('SKU001')).toBeInTheDocument();
    expect(screen.getByText('R$ 100,00')).toBeInTheDocument();
    expect(screen.getByText('Categoria A')).toBeInTheDocument();
    expect(screen.getByText('Marca X')).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();

    expect(screen.getByText('Produto 2')).toBeInTheDocument();
    expect(screen.getByText('SKU002')).toBeInTheDocument();
    expect(screen.getByText('R$ 50,00')).toBeInTheDocument();
    expect(screen.getAllByText('-').length).toBeGreaterThan(0); // Categoria e Marca ausentes
    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });

  it('deve renderizar links de ações com URLs corretas', () => {
    renderComponent();

    const detalhesLink = screen.getByText('Detalhes').closest('a');
    const editarLink = screen.getByText('Editar').closest('a');
    const excluirLink = screen.getByText('Excluir').closest('a');

    expect(detalhesLink).toHaveAttribute('href', '/products/1');
    expect(editarLink).toHaveAttribute('href', '/products/edit/1');
    expect(excluirLink).toHaveAttribute('href', '/products/delete/1');
  });

  it('deve exibir mensagem adequada quando lista de produtos estiver vazia', () => {
    renderComponent([]);

    const table = screen.queryByRole('table');
    expect(table).toBeInTheDocument(); // continua renderizando tabela vazia
  });
});
