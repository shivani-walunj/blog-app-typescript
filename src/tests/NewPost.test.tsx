// src/components/NewPost.test.tsx
import { render, fireEvent, screen } from '@testing-library/react';
import NewPost from '../components/NewPost';

test('renders NewPost form and allows input', () => {
  render(<NewPost />);
  const titleInput = screen.getByPlaceholderText('Enter post title');
  fireEvent.change(titleInput, { target: { value: 'New Title' } });
  expect(titleInput.value).toBe('New Title');
});

test('shows validation error for empty form submission', () => {
  render(<NewPost />);
  fireEvent.click(screen.getByText('Add Post'));
  expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
});

test('calls handleSubmit with correct values', () => {
  const mockHandleSubmit = jest.fn();
  render(<NewPost handleSubmit={mockHandleSubmit} />);

  fireEvent.change(screen.getByPlaceholderText('Enter post title'), {
    target: { value: 'New Title' },
  });

  fireEvent.click(screen.getByText('Add Post'));
  expect(mockHandleSubmit).toHaveBeenCalledWith({
    title: 'New Title',
    // Add other fields if present
  });
});
