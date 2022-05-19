import React from 'react';
import "@testing-library/jest-dom";
import {render, screen} from '@testing-library/react';
import App from './App';

describe('Should App be in the document',() => {
    render(<App/>)
    test('hola todos in the document',() => {
        expect(screen.getByText('hola a todos')).toBeInTheDocument();
    });
})