import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import CreateForm from './index';

describe('CreateForm', () => {
  beforeEach(() => {
    render(<CreateForm/>)
  })

  test('it gives the option to select categories', () => {
    expect(screen.getByDisplayValue('General Knowledge')).toBeInTheDocument();
    // expect(screen.getByDisplayValue('Sports')).toBeInTheDocument();
    // expect(screen.getByDisplayValue('Celebrities')).toBeInTheDocument();
  })

  test('it gives the option to select question type', () => {
    expect(screen.getByDisplayValue('True/False')).toBeInTheDocument();
    // expect(screen.getByDisplayValue('Multiple Choice')).toBeInTheDocument();
  
  })


})
