// src/components/Product/ProductForm.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductForm from './ProductForm';
import type { Product, Category, Brand } from '../../types/Product';

describe('ProductForm', () => {
  const categories: Category[] = [
    { id: 1, name: 'Categoria A' },
    { id: 2, name: 'Categoria B' },
  ];

  const brands: Brand[] = [
    { id: 1, name: 'Marca X' },
    { id: 2, name: 'Marca Y' },
  ];

  const initialProduct: Product = {
    id: 1,
    name: '',
    description: '',
    sku: '',
    price: 0,
    stock: 0,
    categoryId: 0,
    brandId: 0,
    isActive: true,
  };

  it('deve renderizar corretamente o formulário com todos os campos', () => {
    render(
      <ProductForm
        initialData={initialProduct}
        categories={categories}
        brands={brands}
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/SKU/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Preço/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estoque/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoria/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Marca/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Ativo/i)).toBeInTheDocument();
  });

  it('deve validar campos obrigatórios e exibir mensagens de erro', async () => {
    const handleSubmit = jest.fn();
    render(
      <ProductForm
        initialData={initialProduct}
        categories={categories}
        brands={brands}
        onSubmit={handleSubmit}
        onCancel={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText(/Salvar/i));

    expect(await screen.findByText(/Nome é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/Descrição é obrigatória/i)).toBeInTheDocument();
    expect(screen.getByText(/SKU é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/Preço deve ser maior que zero/i)).toBeInTheDocument();
    expect(screen.getByText(/Estoque não pode ser negativo/i)).toBeInTheDocument();
    expect(screen.getByText(/Categoria é obrigatória/i)).toBeInTheDocument();
    expect(screen.getByText(/Marca é obrigatória/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('deve chamar onSubmit com os dados corretos quando o formulário for válido', async () => {
    const handleSubmit = jest.fn();
    render(
      <ProductForm
        initialData={initialProduct}
        categories={categories}
        brands={brands}
        onSubmit={handleSubmit}
        onCancel={jest.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Produto 1' } });
    fireEvent.change(screen.getByLabelText(/Descrição/i), { target: { value: 'Descrição teste' } });
    fireEvent.change(screen.getByLabelText(/SKU/i), { target: { value: 'SKU123' } });
    fireEvent.change(screen.getByLabelText(/Preço/i), { target: { value: 100 } });
    fireEvent.change(screen.getByLabelText(/Estoque/i), { target: { value: 10 } });
    fireEvent.change(screen.getByLabelText(/Categoria/i), { target: { value: 'Categoria A' } });
    fireEvent.change(screen.getByLabelText(/Marca/i), { target: { value: 'Marca X' } });
    fireEvent.click(screen.getByText(/Salvar/i));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Produto 1',
          description: 'Descrição teste',
          sku: 'SKU123',
          price: 100,
          stock: 10,
          isActive: true,
          categoryName: 'Categoria A',
          brandName: 'Marca X',
        })
      );
    });
  });

  it('deve chamar onCancel quando o botão cancelar for clicado', () => {
    const handleCancel = jest.fn();
    render(
      <ProductForm
        initialData={initialProduct}
        categories={categories}
        brands={brands}
        onSubmit={jest.fn()}
        onCancel={handleCancel}
      />
    );

    fireEvent.click(screen.getByText(/Cancelar/i));
    expect(handleCancel).toHaveBeenCalled();
  });

  it('deve alterar o estado de isActive ao clicar no checkbox', () => {
    const handleSubmit = jest.fn();
    render(
      <ProductForm
        initialData={initialProduct}
        categories={categories}
        brands={brands}
        onSubmit={handleSubmit}
        onCancel={jest.fn()}
      />
    );

    const checkbox = screen.getByLabelText(/Ativo/i) as HTMLInputElement;
    expect(checkbox.checked).toBe(true);

    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
  });
});
