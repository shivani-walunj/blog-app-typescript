import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import PostPage from "../components/PostPage";

jest.mock('axios');

test('fetches and displays a post', async () => {
  const post = { title: 'Test Post', body: 'Post Content' };
  axios.get.mockResolvedValue({ data: post });

  render(<PostPage />);
  await waitFor(() => expect(screen.getByText(/Test Post/i)).toBeInTheDocument());
  expect(screen.getByText(/Post Content/i)).toBeInTheDocument();
});

test('displays an error when post fetch fails', async () => {
  axios.get.mockRejectedValue(new Error('Failed to fetch post'));

  render(<PostPage />);
  await waitFor(() => expect(screen.getByText(/Failed to load/i)).toBeInTheDocument());
});
