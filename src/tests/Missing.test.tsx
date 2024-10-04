import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Missing from '../components/Missing';

describe('Missing Component', () => {
  test('renders missing page message', () => {
    render(
      <MemoryRouter>
        <Missing />
      </MemoryRouter>
    );
    const headerElement = screen.getByText(/Page Not Found/i);
    expect(headerElement).toBeInTheDocument();
    const linkElement = screen.getByText(/Visit Our Homepage/i);
    expect(linkElement).toBeInTheDocument();
  });
});
