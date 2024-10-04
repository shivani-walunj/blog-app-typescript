// src/components/About.test.tsx
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('renders About component', () => {
  render(<About />);
  expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  expect(screen.getByText(/You will find interesting blogs to read./i)).toBeInTheDocument();
});
