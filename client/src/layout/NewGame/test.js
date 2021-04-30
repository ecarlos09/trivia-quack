import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NewGame from '../NewGame';
import userEvent from '@testing-library/user-event';

describe ('NewGame', () => {

    const { location } = window;

    beforeAll(() => {
        delete window.location;
        window.location = {
            href: '/create',
        };
    });

    beforeEach(() => render(<NewGame />, { wrapper: MemoryRouter}))
     
    afterAll(() => {
        window.location = location;
    });
    test('new game button renders', () => {
        const btn = screen.getByRole('link', {name: 'New Game' })
        expect(btn.textContent).toContain('New Game')
    })
    test('redirects on New Game click to correct URL', () =>{
        const newGameBtn = screen.getByRole('link', {name: 'New Game' })
        const target = '/create';
        userEvent.click(newGameBtn)
        expect(window.location.href).toBe(target);
    })
})