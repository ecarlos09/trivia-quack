import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import JoinGame from '../JoinGame';
import userEvent from '@testing-library/user-event';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      push: mockHistoryPush,
    }),
  }));

describe ('JoinGame', () => {
    beforeEach(() => render(<JoinGame />, { wrapper: MemoryRouter}))
     
    test('redirects on Join Game click to correct URL', () =>{
        const joinBtn = screen.getByRole('link', {name: 'Join Game' })
        userEvent.click(joinBtn)
        expect(mockHistoryPush).toHaveBeenCalledWith('/join');
    })
})