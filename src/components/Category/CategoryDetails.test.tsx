// src/components/Category/CategoryDetails.test.tsx

import { render, screen } from '@testing-library/react';
import CategoryDetails from './CategoryDetails';
import { Category } from '../../types/Category';

const mockCategory: Category = {
  id: 1,
  name: 'Categoria A',
  description: 'Descrição da Categoria A',
  createdAt: '2025-08-22T12:00:00Z',
};

describe('CategoryDetails', () => {
  it('deve renderizar os detalhes da categoria corretamente', () => {
    render(<CategoryDetails category={mockCategory} />);

    // Verifica título principal (name no <h5>)
    expect(
      screen.getByRole('heading', { name: mockCategory.name })
    ).toBeInTheDocument();

    // Verifica ID
    expect(screen.getByText(/ID:/i)).toBeInTheDocument();
    expect(screen.getByText(mockCategory.id.toString())).toBeInTheDocument();

    // Verifica Nome
    expect(screen.getByText(/Nome:/i)).toBeInTheDocument();
    expect(screen.getByText(mockCategory.name)).toBeInTheDocument();

    // Verifica Descrição
    expect(screen.getByText(/Descrição:/i)).toBeInTheDocument();
    expect(screen.getByText(mockCategory.description)).toBeInTheDocument();
  });
});
