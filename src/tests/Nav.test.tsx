import { render, screen, fireEvent } from '@testing-library/react';
import Nav from '../components/Nav';
import { MemoryRouter } from 'react-router-dom';

describe('Nav Component', () => {
  const mockSetSearch = jest.fn();

  test('renders search input and links', () => {
    render(
      <MemoryRouter>
        <Nav search="" setSearch={mockSetSearch} />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Search Posts/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Post/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
  });

  test('updates search input value', () => {
    render(
      <MemoryRouter>
        <Nav search="" setSearch={mockSetSearch} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search Posts/i), { target: { value: 'React' } });
    expect(mockSetSearch).toHaveBeenCalledWith('React');
  });
});
