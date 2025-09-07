// src/contexts/BrandContext.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { useContext } from 'react';
import { BrandContext } from './BrandContext';
import type { BrandContextType } from '../types/BrandContextType';

function TestComponent() {
  const { brands, addBrand } = useContext<BrandContextType>(BrandContext);

  return (
    <div>
      <span data-testid="brands">{brands.length}</span>
      <button onClick={() => addBrand({ name: 'Marca X' })}>Add</button>
    </div>
  );
}

describe('BrandContext', () => {
  it('deve fornecer valores padrão corretamente', () => {
    render(<TestComponent />);

    // Valor inicial do contexto padrão
    expect(screen.getByTestId('brands').textContent).toBe('0');

    // Como o addBrand do contexto padrão é uma função vazia, não altera nada
    fireEvent.click(screen.getByText('Add'));
    expect(screen.getByTestId('brands').textContent).toBe('0');
  });
});
