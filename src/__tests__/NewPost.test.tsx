
import '@testing-library/jest-dom'; // Ensure this is imported
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NewPost from '../NewPost'; // Ensure correct import

describe('NewPost', () => {
    const mockHandleSubmit = jest.fn((e) => e.preventDefault());
    const mockSetPostTitle = jest.fn();
    const mockSetPostBody = jest.fn();

    const initialProps = {
        handleSubmit: mockHandleSubmit,
        postTitle: '',
        setPostTitle: mockSetPostTitle,
        postBody: '',
        setPostBody: mockSetPostBody,
    };

    it('renders the component with initial props', () => {
        render(<NewPost {...initialProps} />);

        // Verify the title input
        expect(screen.getByLabelText('Title:')).toBeInTheDocument();
        // Verify the body textarea
        expect(screen.getByLabelText('Post:')).toBeInTheDocument();
        // Verify the submit button
        expect(screen.getByText('Submit')).toBeInTheDocument();
    });

    it('handles title change', () => {
        render(<NewPost {...initialProps} />);

        const titleInput = screen.getByLabelText('Title:');
        fireEvent.change(titleInput, { target: { value: 'New Title' } });

        // Verify setPostTitle is called with the new title
        expect(mockSetPostTitle).toHaveBeenCalledWith('New Title');
    });

    it('handles body change', () => {
        render(<NewPost {...initialProps} />);

        const bodyTextarea = screen.getByLabelText('Post:');
        fireEvent.change(bodyTextarea, { target: { value: 'New Body' } });

        // Verify setPostBody is called with the new body
        expect(mockSetPostBody).toHaveBeenCalledWith('New Body');
    });

    it('submits the form', () => {
        render(<NewPost {...initialProps} />);

        const form = screen.getByTestId('submit');
        fireEvent.submit(form);

        // Verify handleSubmit is called
        expect(mockHandleSubmit).toHaveBeenCalled();
    });
});
