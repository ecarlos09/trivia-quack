import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import JoinRoom from '../JoinRoom';
import userEvent from '@testing-library/user-event';

describe ('Join Room', () => {

    const gameId = '608bc201193dc100323f9274';
    const { location } = window;

    beforeAll(() => {
        delete window.location;
        window.location = {
            href: 'https://trivia-quack.netlify.app/',
        };
    });

    beforeEach(() => render(<JoinRoom />, { wrapper: MemoryRouter}));
    
    afterAll(() => {
        window.location = location;
    });

    test('redirects onClick of Join Game button to correct URL', () =>{
        const gameIdInput = screen.getByLabelText('Game ID')
        const target = `lobby/${gameId}`;
        userEvent.type(gameIdInput, "608bc201193dc100323f9274{enter}")
        expect(window.location.href).toBe(target);
    })
})