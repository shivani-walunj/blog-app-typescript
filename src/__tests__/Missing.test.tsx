import '@testing-library/jest-dom'; // Ensure this is imported
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Missing from '../Missing'; // Ensure correct import

describe('Missing', () => {
    it('renders the component correctly', () => {
        render(
            <MemoryRouter>
                <Missing />
            </MemoryRouter>
        );
        
        // Verify the "Page Not Found" message
        expect(screen.getByText('Page Not Found')).toBeInTheDocument();
        // Verify the disappointing message
        expect(screen.getByText("Well, that's disappointing.")).toBeInTheDocument();
        // Verify the link to the homepage
        const linkElement = screen.getByText('Visit Our Homepage');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', '/');
    });
});
