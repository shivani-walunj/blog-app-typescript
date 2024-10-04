import '@testing-library/jest-dom'; // Ensure this is imported
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer'; // Ensure correct import

describe('Footer', () => {
    it('renders the component correctly', () => {
        render(<Footer />);

        const today = new Date();
        const currentYear = today.getFullYear();

        // Verify the footer text
        expect(screen.getByText(`Copyright © ${currentYear}`)).toBeInTheDocument();
    });
});
