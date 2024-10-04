import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from '../components/About';

describe('About Component', () => {
    test('renders About component', () => {
        render(<About />);
        const headingElement = screen.getByText(/About/i);
        expect(headingElement).toBeInTheDocument();
    });

    test('renders the paragraph with correct text', () => {
        render(<About />);
        const paragraphElement = screen.getByText(/You will find interesting blogs to read./i);
        expect(paragraphElement).toBeInTheDocument();
    });
});
