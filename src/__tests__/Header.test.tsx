import '@testing-library/jest-dom'; // Ensure this is imported
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header'; // Ensure correct import

describe('Header', () => {
    it('renders the component with the given title', () => {
        const title = 'Test Title';
        render(<Header title={title} />);
        // Verify the title is rendered
        expect(screen.getByText(title)).toBeInTheDocument();
    });
});
