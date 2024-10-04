import '@testing-library/jest-dom'; // Ensure this is imported
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Post from '../Post'; // Ensure correct import

const shortPost = {
    id: '1',
    title: 'Short Post',
    datetime: '2023-01-01',
    body: 'This is a short body'
};

const longPost = {
    id: '2',
    title: 'Long Post',
    datetime: '2023-01-02',
    body: 'This is a long body that exceeds twenty-five characters'
};

describe('Post', () => {
    it('renders post with short body correctly', () => {
        render(
            <MemoryRouter>
                <Post post={shortPost} />
            </MemoryRouter>
        );

        // Verify post title
        expect(screen.getByText('Short Post')).toBeInTheDocument();
        // Verify post datetime
        expect(screen.getByText('2023-01-01')).toBeInTheDocument();
        // Verify post body
        expect(screen.getByText('This is a short body')).toBeInTheDocument();
        // Verify link
        expect(screen.getByRole('link')).toHaveAttribute('href', '/post/1');
    });

    it('renders post with long body correctly', () => {
        render(
            <MemoryRouter>
                <Post post={longPost} />
            </MemoryRouter>
        );

        // Verify post title
        expect(screen.getByText('Long Post')).toBeInTheDocument();
        // Verify post datetime
        expect(screen.getByText('2023-01-02')).toBeInTheDocument();
        // Verify truncated post body
        expect(screen.getByText(/This is a long body that.../i)).toBeInTheDocument();
        // Verify link
        expect(screen.getByRole('link')).toHaveAttribute('href', '/post/2');
    });
});
