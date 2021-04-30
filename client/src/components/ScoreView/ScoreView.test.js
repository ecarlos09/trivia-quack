import { render, screen } from '@testing-library/react';
import {default as ScoreView} from '.';


describe('ScoreView', () => {

  beforeEach(() => {
    let playersStub = [{name:'testName', count:'100'}];
    renderWithReduxProvider(<ScoreView players={playersStub}/>)
  })

  test('it renders a player icon', () => {
    let icon = screen.getByRole('img',{name:'Player Icon'});
    expect(icon).toBeInTheDocument();
  })


})