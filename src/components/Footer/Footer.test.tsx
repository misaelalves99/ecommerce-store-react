// src/components/Footer/Footer.test.tsx

import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('deve renderizar o rodapé com o texto correto', () => {
    render(<Footer />);
    
    expect(screen.getByText(/© 2025 Loja Virtual. Todos os direitos reservados./i)).toBeInTheDocument();
  });

  it('deve ter a classe CSS correta', () => {
    render(<Footer />);
    
    const footerElement = screen.getByText(/© 2025 Loja Virtual/i).closest('footer');
    expect(footerElement).toHaveClass('footer');
  });
});
