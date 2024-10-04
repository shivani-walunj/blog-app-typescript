// src/components/EditPost.test.tsx
import { render, fireEvent, screen } from '@testing-library/react';
import EditPost from "../components/EditPost";

test('renders EditPost form and allows input', () => {
  render(<EditPost />);
  const titleInput = screen.getByPlaceholderText('Enter post title');
  fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
  expect(titleInput.value).toBe('Updated Title');
});

test('shows validation error when submitting empty form', () => {
  render(<EditPost />);
  fireEvent.click(screen.getByText('Save Changes'));
  expect(screen.getByText(/Title is required/i)).toBeInTheDocument(); // Adjust message as per your validation
});

test('calls handleSubmit with correct values', () => {
  const mockHandleSubmit = jest.fn();
  render(<EditPost handleSubmit={mockHandleSubmit} />);

  fireEvent.change(screen.getByPlaceholderText('Enter post title'), {
    target: { value: 'Updated Title' },
  });

  fireEvent.click(screen.getByText('Save Changes'));
  expect(mockHandleSubmit).toHaveBeenCalledWith({
    title: 'Updated Title',
    // Include other fields here
  });
});
