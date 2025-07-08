import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from '../page';

describe('Home Page', () => {
  it('renders main heading', () => {
    render(<Home />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Next.js + Supabase Web App');
  });

  it('renders description text', () => {
    render(<Home />);
    
    const description = screen.getByText('モダンなフルスタックWebアプリケーション');
    expect(description).toBeInTheDocument();
  });

  it('has proper main structure', () => {
    render(<Home />);
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('flex', 'min-h-screen');
  });
});