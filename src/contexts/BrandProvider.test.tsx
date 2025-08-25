// src/contexts/BrandProvider.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { useContext } from 'react';
import { BrandProvider } from './BrandProvider';
import { BrandContext } from './BrandContext';
import type { BrandContextType } from '../types/BrandContextType';

function TestComponent() {
  const { brands, addBrand } = useContext<BrandContextType>(BrandContext);

  return (
    <div>
      <span data-testid="brands-count">{brands.length}</span>
      <button onClick={() => addBrand({ name: 'Marca Nova' })}>Add Brand</button>
      <ul>
        {brands.map((b) => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
    </div>
  );
}

describe('BrandProvider', () => {
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
});
