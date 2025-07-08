import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminHome from '../page';

describe('Admin Home Page', () => {
  it('renders admin dashboard heading', () => {
    render(<AdminHome />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Admin Dashboard');
  });

  it('renders description text', () => {
    render(<AdminHome />);
    
    const description = screen.getByText('管理者向けダッシュボード');
    expect(description).toBeInTheDocument();
  });

  it('has main structure', () => {
    render(<AdminHome />);
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
  });
});