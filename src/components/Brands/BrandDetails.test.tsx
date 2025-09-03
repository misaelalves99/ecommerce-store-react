// src/components/Brand/BrandDetails.test.tsx

import { render, screen } from '@testing-library/react';
import BrandDetails from './BrandDetails';
import { Brand } from '../../types/Brand';

describe('BrandDetails', () => {
  const mockBrand: Brand = {
    id: 1,
    name: 'Marca Teste',
    createdAt: '2025-08-22T12:00:00Z',
  };

  it('deve renderizar os detalhes da marca corretamente', () => {
    render(<BrandDetails brand={mockBrand} />);

    // Verifica se o título está presente
    expect(screen.getByText('Detalhes da Marca')).toBeInTheDocument();

    // Verifica se o ID e o nome são exibidos corretamente
    expect(screen.getByText('ID:')).toBeInTheDocument();
    expect(screen.getByText(mockBrand.id.toString())).toBeInTheDocument();

    expect(screen.getByText('Nome:')).toBeInTheDocument();
    expect(screen.getByText(mockBrand.name)).toBeInTheDocument();
  });
});
