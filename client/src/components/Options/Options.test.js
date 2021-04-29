import { default as Options } from '.';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

//Only needed if testing DOM/App as a whole?
// describe('Options',() => {
//   beforeEach(() => {
//     render()
//   })
// })

//<button handleSelect={stubHandleSelect}></button>
describe('Options', () => {
  
  // beforeEach(() => {
  //   render(<Options/>)
  // });
  
  let stubHandleSelect = jest.fn();

  test('it calls a handleSelect prop when clicked', () => {
    let btn = screen.getByRole('button');
    userEvent.click(btn)
    expect(stubHandleSelect).toHaveBeenCalledTimes(1)
  })

})


