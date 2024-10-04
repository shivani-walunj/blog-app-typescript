import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Post from '../components/Post';;

describe('Post Component', () => {
  const mockPost = {
    id: "1",
    title: "Test Post",
    datetime: "October 1, 2024",
    body: "Test body of the post"
  };

  test('renders post title and datetime', () => {
    render(
      <MemoryRouter>
        <Post post={mockPost} />
      </MemoryRouter>
    );
    const titleElement = screen.getByText(/Test Post/i);
    const datetimeElement = screen.getByText(/October 1, 2024/i);
    expect(titleElement).toBeInTheDocument();
    expect(datetimeElement).toBeInTheDocument();
  });

  test('renders truncated post body if body length is greater than 25', () => {
    const longBodyPost = { ...mockPost, body: "This is a very long body of the post that exceeds 25 characters." };
    render(
      <MemoryRouter>
        <Post post={longBodyPost} />
      </MemoryRouter>
    );
    const bodyElement = screen.getByText(/This is a very long body.../i);
    expect(bodyElement).toBeInTheDocument();
  });

  test('renders full post body if body length is less than or equal to 25', () => {
    const shortBodyPost = { ...mockPost, body: "Short body" };
    render(
      <MemoryRouter>
        <Post post={shortBodyPost} />
      </MemoryRouter>
    );
    const bodyElement = screen.getByText(/Short body/i);
    expect(bodyElement).toBeInTheDocument();
  });
});
