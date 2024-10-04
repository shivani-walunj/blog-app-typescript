import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

describe('Home Component', () => {
  const mockPosts = [
    { id: 1, title: "Test Post 1", body: "Body of Post 1", datetime: "October 1, 2024" },
    { id: 2, title: "Test Post 2", body: "Body of Post 2", datetime: "October 2, 2024" },
  ];

  test('renders Feed with posts', () => {
    render(<Home posts={mockPosts} />);
    const postTitle1 = screen.getByText(/Test Post 1/i);
    const postTitle2 = screen.getByText(/Test Post 2/i);
    expect(postTitle1).toBeInTheDocument();
    expect(postTitle2).toBeInTheDocument();
  });

  test('renders message when no posts are available', () => {
    render(<Home posts={[]} />);
    const messageElement = screen.getByText(/No posts to display/i);
    expect(messageElement).toBeInTheDocument();
  });
});
