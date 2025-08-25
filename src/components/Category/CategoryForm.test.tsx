// src/components/Category/CategoryForm.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import CategoryForm from './CategoryForm';

describe('CategoryForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  it('deve renderizar o formulário com campos iniciais', () => {
    render(
      <CategoryForm
        initialName="Categoria X"
        initialDescription="Descrição X"
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/Nome/i)).toHaveValue('Categoria X');
    expect(screen.getByLabelText(/Descrição/i)).toHaveValue('Descrição X');
    expect(screen.getByText(/Salvar/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancelar/i)).toBeInTheDocument();
  });

  it('deve mostrar erros se os campos estiverem vazios ao enviar', () => {
    render(<CategoryForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Descrição/i), { target: { value: '' } });

    fireEvent.click(screen.getByText(/Salvar/i));

    expect(screen.getByText(/O nome é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/A descrição é obrigatória/i)).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('deve chamar onSubmit com dados corretos quando preenchido corretamente', () => {
    render(<CategoryForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'Nova Categoria' } });
    fireEvent.change(screen.getByLabelText(/Descrição/i), { target: { value: 'Descrição da categoria' } });

    fireEvent.click(screen.getByText(/Salvar/i));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'Nova Categoria',
      description: 'Descrição da categoria',
    });
  });

  it('deve chamar onCancel ao clicar no botão cancelar', () => {
    render(<CategoryForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
    fireEvent.click(screen.getByText(/Cancelar/i));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
