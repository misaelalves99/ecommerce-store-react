// src/components/Product/ProductDetails.test.tsx

import { render, screen } from '@testing-library/react';
import ProductDetails from './ProductDetails';
import type { Product } from '../../types/Product';

describe('ProductDetails', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Produto Teste',
    description: 'Descrição do produto teste',
    sku: 'SKU123',
    price: 150.5,
    stock: 10,
    category: { id: 1, name: 'Categoria A' },
    brand: { id: 1, name: 'Marca X' },
    categoryId: 1,
    brandId: 1,
    isActive: true,
  };

  it('deve renderizar corretamente todas as informações do produto', () => {
    render(<ProductDetails product={mockProduct} />);

    expect(screen.getByText(/Produto Teste/i)).toBeInTheDocument();
    expect(screen.getByText(/Descrição:/i)).toHaveTextContent('Descrição: Descrição do produto teste');
    expect(screen.getByText(/SKU:/i)).toHaveTextContent('SKU: SKU123');
    expect(screen.getByText(/Preço:/i)).toHaveTextContent('Preço: R$ 150,50');
    expect(screen.getByText(/Estoque:/i)).toHaveTextContent('Estoque: 10');
    expect(screen.getByText(/Categoria:/i)).toHaveTextContent('Categoria: Categoria A');
    expect(screen.getByText(/Marca:/i)).toHaveTextContent('Marca: Marca X');
    expect(screen.getByText(/Status:/i)).toHaveTextContent('Status: Ativo');
  });

  it('deve exibir "-" quando categoria ou marca não existirem', () => {
    const productWithoutCategoryBrand: Product = {
      ...mockProduct,
      category: undefined,
      brand: undefined,
    };

    render(<ProductDetails product={productWithoutCategoryBrand} />);

    expect(screen.getByText(/Categoria:/i)).toHaveTextContent('Categoria: -');
    expect(screen.getByText(/Marca:/i)).toHaveTextContent('Marca: -');
  });

  it('deve exibir "Inativo" quando o produto não estiver ativo', () => {
    const inactiveProduct: Product = { ...mockProduct, isActive: false };
    render(<ProductDetails product={inactiveProduct} />);

    expect(screen.getByText(/Status:/i)).toHaveTextContent('Status: Inativo');
  });

  it('deve exibir estoque 0 corretamente', () => {
    const productWithZeroStock: Product = { ...mockProduct, stock: 0 };
    render(<ProductDetails product={productWithZeroStock} />);

    expect(screen.getByText(/Estoque:/i)).toHaveTextContent('Estoque: 0');
  });

  it('snapshot da renderização do produto', () => {
    const { container } = render(<ProductDetails product={mockProduct} />);
    expect(container).toMatchSnapshot();
  });
});
