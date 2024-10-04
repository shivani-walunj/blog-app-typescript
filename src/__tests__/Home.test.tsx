import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../Home';

jest.mock('../Feed', () => () => <div>Mocked Feed Component</div>);

describe('Home Component', () => {
  const mockPosts = [
    {
      id: 1,
      title: 'Post 1',
      body: 'This is the body of Post 1',
      datetime: '2023-10-01T10:00:00Z',
    },
    {
      id: 2,
      title: 'Post 2',
      body: 'This is the body of Post 2',
      datetime: '2023-10-02T11:00:00Z',
    },
  ];

  test('renders Home component with posts', () => {
    render(<Home posts={mockPosts} />);
    expect(screen.getByText(/Mocked Feed Component/i)).toBeInTheDocument();
  });

  test('renders Home component without posts', () => {
    render(<Home posts={[]} />);
    expect(screen.getByText(/No posts to display./i)).toBeInTheDocument();
  });
});
