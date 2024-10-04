import '@testing-library/jest-dom'; // Ensure this is imported
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PostPageWrapper from '../PostPage'; // Ensure correct import

const mockPosts = [
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

const mockHandleDelete = jest.fn();

describe('PostPageWrapper', () => {
    it('renders post details correctly', () => {
        render(
            <MemoryRouter initialEntries={['/posts/1']}>
                <Routes>
                    <Route path="/posts/:id" element={<PostPageWrapper posts={mockPosts} handleDelete={mockHandleDelete} />} />
                </Routes>
            </MemoryRouter>
        );

        // Verify post title
        expect(screen.getByText('Test Post 1')).toBeInTheDocument();
        // Verify post datetime
        expect(screen.getByText('2023-01-01')).toBeInTheDocument();
        // Verify post body
        expect(screen.getByText('This is the body of Test Post 1')).toBeInTheDocument();
    });

    it('calls handleDelete and removes post when delete button is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/posts/1']}>
                <Routes>
                    <Route path="/posts/:id" element={<PostPageWrapper posts={mockPosts} handleDelete={mockHandleDelete} />} />
                </Routes>
            </MemoryRouter>
        );

        // Click delete button
        fireEvent.click(screen.getByText('Delete Post'));

        // Verify handleDelete is called
        expect(mockHandleDelete).toHaveBeenCalledWith('1');

        // Verify post is removed from the DOM
        expect(screen.queryByText('Test Post 1')).not.toBeInTheDocument();
    });

    it('renders "Post not found" when post does not exist', () => {
        render(
            <MemoryRouter initialEntries={['/posts/3']}>
                <Routes>
                    <Route path="/posts/:id" element={<PostPageWrapper posts={mockPosts} handleDelete={mockHandleDelete} />} />
                </Routes>
            </MemoryRouter>
        );

        // Verify "Post not found" message
        expect(screen.getByText('Post not found')).toBeInTheDocument();
    });

   
});
