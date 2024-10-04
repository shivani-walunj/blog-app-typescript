import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header Component', () => {
  test('renders the header title', () => {
    const title = "Test Blogs";
    render(<Header title={title} />);
    const headerElement = screen.getByText(/Test Blogs/i);
    expect(headerElement).toBeInTheDocument();
  });
});
