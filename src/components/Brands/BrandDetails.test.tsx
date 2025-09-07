// src/components/Brand/BrandDetails.test.tsx

import { render, screen } from '@testing-library/react';
import BrandDetails from './BrandDetails';
import { Brand } from '../../types/Brand';

describe('BrandDetails', () => {
  const mockBrand: Brand = {
    id: 1,
    name: 'Marca Teste',
    isActive: true,
    createdAt: '2025-08-22T12:00:00Z',
  };

  it('deve renderizar o nome da marca como título', () => {
    render(<BrandDetails brand={mockBrand} />);
    expect(screen.getByText(mockBrand.name)).toBeInTheDocument();
  });

  it('deve exibir o ID da marca corretamente', () => {
    render(<BrandDetails brand={mockBrand} />);
    expect(screen.getByText(/ID:/)).toBeInTheDocument();
    expect(screen.getByText(mockBrand.id.toString())).toBeInTheDocument();
  });

  it('deve exibir o status como Ativo quando isActive for true', () => {
    render(<BrandDetails brand={{ ...mockBrand, isActive: true }} />);
    expect(screen.getByText(/Status:/)).toBeInTheDocument();
    expect(screen.getByText('Ativo')).toBeInTheDocument();
  });

  it('deve exibir o status como Inativo quando isActive for false', () => {
    render(<BrandDetails brand={{ ...mockBrand, isActive: false }} />);
    expect(screen.getByText('Inativo')).toBeInTheDocument();
  });
});
