// src/contexts/BrandProvider.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { useContext } from 'react';
import { BrandProvider } from './BrandProvider';
import { BrandContext } from './BrandContext';
import type { BrandContextType } from '../types/BrandContextType';

function TestComponent() {
  const { brands, addBrand, updateBrand, deleteBrand } = useContext<BrandContextType>(BrandContext);

  return (
    <div>
      <span data-testid="brands-count">{brands.length}</span>

      <button onClick={() => addBrand({ name: 'Marca Nova' })}>Add Brand</button>
      <button onClick={() => updateBrand(brands[0]?.id || 0, 'Marca Atualizada')}>Update First</button>
      <button onClick={() => deleteBrand(brands[0]?.id || 0)}>Delete First</button>

      <ul>
        {brands.map((b) => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
    </div>
  );
}

describe('BrandProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve inicializar com marcas do mock', () => {
    render(
      <BrandProvider>
        <TestComponent />
      </BrandProvider>
    );

    const initialCount = Number(screen.getByTestId('brands-count').textContent);
    expect(initialCount).toBeGreaterThan(0);
  });

  it('deve adicionar uma nova marca ao chamar addBrand', () => {
    render(
      <BrandProvider>
        <TestComponent />
      </BrandProvider>
    );

    const initialCount = Number(screen.getByTestId('brands-count').textContent);
    fireEvent.click(screen.getByText('Add Brand'));

    const newCount = Number(screen.getByTestId('brands-count').textContent);
    expect(newCount).toBe(initialCount + 1);
    expect(screen.getByText('Marca Nova')).toBeInTheDocument();
  });

  it('deve atualizar o nome da primeira marca ao chamar updateBrand', () => {
    render(
      <BrandProvider>
        <TestComponent />
      </BrandProvider>
    );

    const firstBrandNameBefore = screen.getAllByRole('listitem')[0].textContent;
    fireEvent.click(screen.getByText('Update First'));

    const firstBrandNameAfter = screen.getAllByRole('listitem')[0].textContent;
    expect(firstBrandNameAfter).not.toBe(firstBrandNameBefore);
    expect(firstBrandNameAfter).toBe('Marca Atualizada');
  });

  it('deve remover a primeira marca ao chamar deleteBrand', () => {
    render(
      <BrandProvider>
        <TestComponent />
      </BrandProvider>
    );

    const initialCount = Number(screen.getByTestId('brands-count').textContent);
    fireEvent.click(screen.getByText('Delete First'));

    const newCount = Number(screen.getByTestId('brands-count').textContent);
    expect(newCount).toBe(initialCount - 1);
  });
});
