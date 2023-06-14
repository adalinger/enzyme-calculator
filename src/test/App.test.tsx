import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../main/App';

test('renders learn react link', () => {
    render(<App/>);
    const linkElement = screen.getByText(/Enzymeinheiten pro 1g Fett/i);
    expect(linkElement).toBeInTheDocument();
});
