// src/components/Brand/BrandForm.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import BrandForm from './BrandForm';

describe('BrandForm', () => {
  it('deve renderizar o formulário com valor inicial', () => {
    render(<BrandForm initialName="Marca Inicial" onSubmit={jest.fn()} />);

    const input = screen.getByLabelText(/Nome da Marca/i) as HTMLInputElement;
    expect(input.value).toBe('Marca Inicial');

    expect(screen.getByRole('button', { name: /Salvar/i })).toBeInTheDocument();
  });

  it('deve mostrar erro se tentar submeter com campo vazio', () => {
    render(<BrandForm onSubmit={jest.fn()} />);

    const submitBtn = screen.getByRole('button', { name: /Salvar/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/O nome da marca é obrigatório/i)).toBeInTheDocument();
  });

  it('não deve chamar onSubmit se o campo estiver vazio', () => {
    const handleSubmit = jest.fn();
    render(<BrandForm onSubmit={handleSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('deve remover a mensagem de erro ao corrigir o input', () => {
    render(<BrandForm onSubmit={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));
    expect(screen.getByText(/O nome da marca é obrigatório/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Nome da Marca/i), {
      target: { value: 'Marca Corrigida' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    expect(screen.queryByText(/O nome da marca é obrigatório/i)).not.toBeInTheDocument();
  });

  it('deve chamar onSubmit com o valor correto', () => {
    const handleSubmit = jest.fn();
    render(<BrandForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/Nome da Marca/i), {
      target: { value: 'Nova Marca' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Salvar/i }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith('Nova Marca');
  });

  it('deve chamar onCancel quando botão Cancelar for clicado', () => {
    const handleCancel = jest.fn();
    render(<BrandForm onSubmit={jest.fn()} onCancel={handleCancel} />);

    const cancelBtn = screen.getByRole('button', { name: /Cancelar/i });
    fireEvent.click(cancelBtn);

    expect(handleCancel).toHaveBeenCalledTimes(1);
  });

  it('não deve renderizar botão Cancelar se onCancel não for passado', () => {
    render(<BrandForm onSubmit={jest.fn()} />);

    expect(screen.queryByRole('button', { name: /Cancelar/i })).toBeNull();
  });
});
