import React from 'react';
import  Options from '.';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Options',() => {
  const [ mockDisabled, setMockDisabled ] = useState(false);
    let optionsStub1 = {A:'True', B:'False'};
    let optionsStub2 = {A:'Test1', B:'Test2', C:'Test3', D:'Test4' };
    // let disabledStub = false;
    // let setDisabledStub;

  test('it renders a submit button', () => {
    renderWithReduxProvider(<Options options={optionsStub1} disabled={mockDisabled} setDisabled={setMockDisabled}/>)
    let options1 = jest.fn()
    // let optionsStub1 = {A:'True', B:'False'};
    // let optionsStub2 = {A:'Test1', B:'Test2', C:'Test3', D:'Test4' };
    let disabledStub = false;
    let setDisabledStub;
    
    // const initState = {players: [{player: {room:'testRoom',id:'testId',icon:1,username:'testName'}, ready: 'true'}], answers:['TestA1','TestA1','TestA1']}

  test('it renders a submit button', () => {
    const initState = {questions: []}
    renderWithReduxProvider(<Options options={options1} disabled={disabledStub} setDisabled={setDisabledStub}/>, {initState})
    let btn = screen.getByRole('button',{name: 'submit'});
    expect(btn).toBeInTheDocument();
  })

  test("it renders a 'False' option button", () => {
    renderWithReduxProvider(<Options options={optionsStub1} disabled={disabledStub} setDisabled={setDisabledStub}/>)
    let btn = screen.getByRole('button',{name: 'A.False'});
    expect(btn).toBeInTheDocument();
  })

  test("it renders a 'True' option button", () => {
    renderWithReduxProvider(<Options options={optionsStub1} disabled={disabledStub} setDisabled={setDisabledStub}/>)
    let btn = screen.getByRole('button',{name: 'B.True'});
    expect(btn).toBeInTheDocument();
  })

  test("it renders multiple choice option 1", () => {
    renderWithReduxProvider(<Options options={optionsStub2} disabled={disabledStub} setDisabled={setDisabledStub}/>)
    let btn = screen.getByRole('button',{name: 'A.Test1'});
    expect(btn).toBeInTheDocument();
  })

  test("it renders multiple choice option 2", () => {
    renderWithReduxProvider(<Options options={optionsStub2} disabled={disabledStub} setDisabled={setDisabledStub}/>)
    let btn = screen.getByRole('button',{name: 'B.Test2'});
    expect(btn).toBeInTheDocument();
  })

  test("it renders multiple choice option 3", () => {
    renderWithReduxProvider(<Options options={optionsStub2} disabled={disabledStub} setDisabled={setDisabledStub}/>)
    let btn = screen.getByRole('button',{name: 'C.Test3'});
    expect(btn).toBeInTheDocument();
  })

  test("it renders multiple choice option 4", () => {
    renderWithReduxProvider(<Options options={optionsStub2} disabled={disabledStub} setDisabled={setDisabledStub}/>)
    let btn = screen.getByRole('button',{name: 'B.Test4'});
    expect(btn).toBeInTheDocument();
  })
  // test("it renders a 'False' option button", () => {
  //   renderWithReduxProvider(<Options options={optionsStub1} disabled={disabledStub} setDisabled={setDisabledStub}/>, {initState})
  //   let btn = screen.getByRole('button',{name: 'A.False'});
  //   expect(btn).toBeInTheDocument();
  // })

  // test("it renders a 'True' option button", () => {
  //   renderWithReduxProvider(<Options options={optionsStub1} disabled={disabledStub} setDisabled={setDisabledStub}/>, {initState})
  //   let btn = screen.getByRole('button',{name: 'B.True'});
  //   expect(btn).toBeInTheDocument();
  // })

  // test("it renders multiple choice option 1", () => {
  //   renderWithReduxProvider(<Options options={optionsStub2} disabled={disabledStub} setDisabled={setDisabledStub}/>, {initState})
  //   let btn = screen.getByRole('button',{name: 'A.Test1'});
  //   expect(btn).toBeInTheDocument();
  // })

  // test("it renders multiple choice option 2", () => {
  //   renderWithReduxProvider(<Options options={optionsStub2} disabled={disabledStub} setDisabled={setDisabledStub}/>, {initState})
  //   let btn = screen.getByRole('button',{name: 'B.Test2'});
  //   expect(btn).toBeInTheDocument();
  // })

  // test("it renders multiple choice option 3", () => {
  //   renderWithReduxProvider(<Options options={optionsStub2} disabled={disabledStub} setDisabled={setDisabledStub}/>, {initState})
  //   let btn = screen.getByRole('button',{name: 'C.Test3'});
  //   expect(btn).toBeInTheDocument();
  // })

  // test("it renders multiple choice option 4", () => {
  //   renderWithReduxProvider(<Options options={optionsStub2} disabled={disabledStub} setDisabled={setDisabledStub}/>, {initState})
  //   let btn = screen.getByRole('button',{name: 'B.Test4'});
  //   expect(btn).toBeInTheDocument();
  // })
  //Add handleSubmit test
  //Add handleSelect test

})

  
  



