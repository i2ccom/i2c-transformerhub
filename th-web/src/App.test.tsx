import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import App from './App';

describe('App', () => {
  test('renders the landing page headline', () => {
    render(<App />);
    expect(screen.getByText(/welcome to transformerhub/i)).toBeInTheDocument();
  });
});
