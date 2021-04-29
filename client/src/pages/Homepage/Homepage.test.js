import { render, screen } from '@testing-library/react';
import Homepage from './index';

describe('Homepage', () => {
  beforeEach(() => {
    render(<Homepage/>)
  })
  
  test('it displays logo as the title', () => {
    expect(screen.getByRole('img', {name: 'Trivia Duck' })).toBeInTheDocument();
  })

  test('it displays the planets', () => {
    expect(screen.getByRole('img', {name: 'Blue Planet' })).toBeInTheDocument();
    expect(screen.getByRole('img', {name: 'Orange Planet' })).toBeInTheDocument();
  })

  test("it displays the 'New Game' and 'Join Game' buttons", () => {
    expect(screen.getByRole('link', {name: 'New Game' })).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Join Game' })).toBeInTheDocument();
  })

})