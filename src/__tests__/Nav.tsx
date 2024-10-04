import '@testing-library/jest-dom'; // Ensure this is imported
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from '../Nav'; // Ensure correct import

describe('Nav', () => {
    const mockSetSearch = jest.fn();

    const initialProps = {
        search: '',
        setSearch: mockSetSearch,
    };
    
    it('renders the component with initial props', () => {
        render(
            <MemoryRouter>
                <Nav {...initialProps} />
            </MemoryRouter>
        );

        // Verify the search input
        expect(screen.getByLabelText('Search Posts')).toBeInTheDocument();
        // Verify the navigation links
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Post')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('handles search input change', () => {
        render(
            <MemoryRouter>
                <Nav {...initialProps} />
            </MemoryRouter>
        );

        const searchInput = screen.getByLabelText('Search Posts');
        fireEvent.change(searchInput, { target: { value: 'New Search' } });

        // Verify setSearch is called with the new search value
        expect(mockSetSearch).toHaveBeenCalledWith('New Search');
    });

    it('submits the search form', () => {
        render(
            <MemoryRouter>
                <Nav {...initialProps} />
            </MemoryRouter>
        );

        const form = screen.getByTestId('form');
        fireEvent.submit(form);

        // Verify handleSubmit is called (it prevents default behavior)
        expect(mockSetSearch).not.toHaveBeenCalled(); // No new search value should be set on submit
    });
});
