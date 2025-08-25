// src/components/Category/CategoryDetails.test.tsx

import { render, screen } from '@testing-library/react';
import CategoryDetails from './CategoryDetails';
import { Category } from '../../types/Category';

// Mock corrigido, incluindo createdAt
const mockCategory: Category = {
  id: 1,
  name: 'Categoria A',
  description: 'Descrição da Categoria A',
  createdAt: '2025-08-22T12:00:00Z',
};

describe('CategoryDetails', () => {
  it('deve renderizar os detalhes da categoria', () => {
    render(<CategoryDetails category={mockCategory} />);

    // Verifica título
    expect(screen.getByText(/Detalhes da Categoria/i)).toBeInTheDocument();

    // Verifica ID
    expect(screen.getByText('ID:')).toBeInTheDocument();
    expect(screen.getByText(mockCategory.id.toString())).toBeInTheDocument();

    // Verifica Nome
    expect(screen.getByText('Nome:')).toBeInTheDocument();
    expect(screen.getByText(mockCategory.name)).toBeInTheDocument();

    // Verifica Descrição
    expect(screen.getByText('Descrição:')).toBeInTheDocument();
    expect(screen.getByText(mockCategory.description)).toBeInTheDocument();
  });
});
