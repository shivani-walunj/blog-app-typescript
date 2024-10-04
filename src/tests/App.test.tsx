// src/App.test.tsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders Home component on default route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Home Page Content/i)).toBeInTheDocument();
});

test('renders About component on /about route', () => {
  render(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/About Us/i)).toBeInTheDocument();
});

test('renders NewPost component on /newpost route', () => {
  render(
    <MemoryRouter initialEntries={['/newpost']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/New Post/i)).toBeInTheDocument();
});

test('renders Missing component for unknown route', () => {
  render(
    <MemoryRouter initialEntries={['/unknown']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
});
