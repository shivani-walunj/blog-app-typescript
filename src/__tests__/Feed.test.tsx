import '@testing-library/jest-dom'; // Ensure this is imported
import React from 'react';
import { render, screen } from '@testing-library/react';
import Feed from '../Feed'; // Ensure correct import
import { PostType } from '../Feed'; // Ensure correct import

describe('Feed', () => {
    const mockPosts: PostType[] = [
        {
            id: '1',
            title: 'Test Post 1',
            datetime: '2023-01-01',
            body: 'This is the body of Test Post 1'
        },
        {
            id: '2',
            title: 'Test Post 2',
            datetime: '2023-01-02',
            body: 'This is the body of Test Post 2'
        }
    ];

    it('renders the component with an empty list of posts', () => {
        render(<Feed posts={[]} />);

        // Verify that no posts are rendered
        expect(screen.queryByText('Test Post 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Test Post 2')).not.toBeInTheDocument();
    });

    it('renders the component with a list of posts', () => {
        render(<Feed posts={mockPosts} />);

        // Verify that the posts are rendered
        expect(screen.getByText('Test Post 1')).toBeInTheDocument();
        expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    });
});
