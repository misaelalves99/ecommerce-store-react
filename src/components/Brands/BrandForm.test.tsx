// src/components/Brand/BrandForm.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import BrandForm from './BrandForm';

describe('BrandForm', () => {
  it('deve renderizar o formulário com valor inicial', () => {
    render(<BrandForm initialName="Marca Inicial" onSubmit={jest.fn()} />);

    const input = screen.getByLabelText(/Nome da Marca/i) as HTMLInputElement;
    expect(input.value).toBe('Marca Inicial');

    const submitBtn = screen.getByRole('button', { name: /Salvar/i });
    expect(submitBtn).toBeInTheDocument();
  });

  it('deve mostrar erro se tentar submeter com campo vazio', () => {
    render(<BrandForm onSubmit={jest.fn()} />);

    const submitBtn = screen.getByRole('button', { name: /Salvar/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/O nome da marca é obrigatório/i)).toBeInTheDocument();
  });

  it('deve chamar onSubmit com o valor correto', () => {
    const handleSubmit = jest.fn();
    render(<BrandForm onSubmit={handleSubmit} />);

    const input = screen.getByLabelText(/Nome da Marca/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Nova Marca' } });

    const submitBtn = screen.getByRole('button', { name: /Salvar/i });
    fireEvent.click(submitBtn);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith('Nova Marca');
    expect(screen.queryByText(/O nome da marca é obrigatório/i)).not.toBeInTheDocument();
  });

  it('deve chamar onCancel quando botão Cancelar for clicado', () => {
    const handleCancel = jest.fn();
    render(<BrandForm onSubmit={jest.fn()} onCancel={handleCancel} />);

    const cancelBtn = screen.getByRole('button', { name: /Cancelar/i });
    fireEvent.click(cancelBtn);

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});
