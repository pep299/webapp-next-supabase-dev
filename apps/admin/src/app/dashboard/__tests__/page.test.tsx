import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Dashboard from '../page';

describe('Admin Dashboard Page', () => {
  it('renders dashboard heading', () => {
    render(<Dashboard />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Admin Dashboard');
  });

  it('shows dashboard path info', () => {
    render(<Dashboard />);
    
    const pathInfo = screen.getByText('管理者向けダッシュボード - /dashboard');
    expect(pathInfo).toBeInTheDocument();
  });

  it('shows working status', () => {
    render(<Dashboard />);
    
    const status = screen.getByText('✅ Dashboard page is working!');
    expect(status).toBeInTheDocument();
  });

  it('has success indicator styling', () => {
    render(<Dashboard />);
    
    const statusContainer = screen.getByText('✅ Dashboard page is working!').closest('div');
    expect(statusContainer).toHaveClass('bg-blue-100');
    
    const statusText = screen.getByText('✅ Dashboard page is working!');
    expect(statusText).toHaveClass('text-blue-800');
  });
});