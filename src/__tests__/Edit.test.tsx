import '@testing-library/jest-dom'; // Ensure this is imported
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EditPostWrapper from '../EditPost'; // Ensure correct import

const mockPosts = [
    {
        id: 1,
        title: 'Test Post 1',
        body: 'This is the body of Test Post 1'
    },
    {
        id: 2,
        title: 'Test Post 2',
        body: 'This is the body of Test Post 2'
    }
];

const mockHandleEdit = jest.fn();
const mockSetEditTitle = jest.fn();
const mockSetEditBody = jest.fn();

describe('EditPost', () => {
    it('renders the component with a valid post', () => {
        render(
            <MemoryRouter initialEntries={['/edit/1']}>
                <Routes>
                    <Route path="/edit/:id" element={
                        <EditPostWrapper
                            posts={mockPosts}
                            handleEdit={mockHandleEdit}
                            editTitle="Test Post 1"
                            setEditTitle={mockSetEditTitle}
                            editBody="This is the body of Test Post 1"
                            setEditBody={mockSetEditBody}
                        />
                    } />
                </Routes>
            </MemoryRouter>
        );

        // Verify the title input
        expect(screen.getByLabelText('Title:')).toBeInTheDocument();
        // Verify the body textarea
        expect(screen.getByLabelText('Post:')).toBeInTheDocument();
        // Verify the submit button
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('handles title change', () => {
        render(
            <MemoryRouter initialEntries={['/edit/1']}>
                <Routes>
                    <Route path="/edit/:id" element={
                        <EditPostWrapper
                            posts={mockPosts}
                            handleEdit={mockHandleEdit}
                            editTitle="Test Post 1"
                            setEditTitle={mockSetEditTitle}
                            editBody="This is the body of Test Post 1"
                            setEditBody={mockSetEditBody}
                        />
                    } />
                </Routes>
            </MemoryRouter>
        );

        const titleInput = screen.getByLabelText('Title:');
        fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

        // Verify setEditTitle is called with the new title
        expect(mockSetEditTitle).toHaveBeenCalledWith('Updated Title');
    });

    it('handles body change', () => {
        render(
            <MemoryRouter initialEntries={['/edit/1']}>
                <Routes>
                    <Route path="/edit/:id" element={
                        <EditPostWrapper
                            posts={mockPosts}
                            handleEdit={mockHandleEdit}
                            editTitle="Test Post 1"
                            setEditTitle={mockSetEditTitle}
                            editBody="This is the body of Test Post 1"
                            setEditBody={mockSetEditBody}
                        />
                    } />
                </Routes>
            </MemoryRouter>
        );

        const bodyTextarea = screen.getByLabelText('Post:');
        fireEvent.change(bodyTextarea, { target: { value: 'Updated Body' } });

        // Verify setEditBody is called with the new body
        expect(mockSetEditBody).toHaveBeenCalledWith('Updated Body');
    });

    it('submits the form', () => {
        render(
            <MemoryRouter initialEntries={['/edit/1']}>
                <Routes>
                    <Route path="/edit/:id" element={
                        <EditPostWrapper
                            posts={mockPosts}
                            handleEdit={mockHandleEdit}
                            editTitle="Test Post 1"
                            setEditTitle={mockSetEditTitle}
                            editBody="This is the body of Test Post 1"
                            setEditBody={mockSetEditBody}
                        />
                    } />
                </Routes>
            </MemoryRouter>
        );

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        // Verify handleEdit is called with the correct id
        expect(mockHandleEdit).toHaveBeenCalledWith(1);
    });

    it('renders the "Post Not Found" message when the post does not exist', () => {
        render(
            <MemoryRouter initialEntries={['/edit/3']}>
                <Routes>
                    <Route path="/edit/:id" element={
                        <EditPostWrapper
                            posts={mockPosts}
                            handleEdit={mockHandleEdit}
                            editTitle=""
                            setEditTitle={mockSetEditTitle}
                            editBody=""
                            setEditBody={mockSetEditBody}
                        />
                    } />
                </Routes>
            </MemoryRouter>
        );

        // Verify the "Post Not Found" message
        expect(screen.getByText('Post Not Found')).toBeInTheDocument();
        // Verify the disappointing message
        expect(screen.getByText("Well, that's disappointing.")).toBeInTheDocument();
        // Verify the link to the homepage
        const linkElement = screen.getByText('Visit Our Homepage');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/');
    });
});
