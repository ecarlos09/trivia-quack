import { render, screen } from '@testing-library/react';
import Create from './index';

describe('Create', () => {
  beforeEach(() => {
    render(<Create/>)
  })

  test('it displays a dropdown box', () => {
    expect(screen.getByRole('combobox', {name: 'Select a Category for your quiz:'})).toBeInTheDocument();
  })

  test("dropdown contains 'General Knowledge' option", () => {
    expect(screen.getByRole('menuitem', {name: 'category'})).toBeInTheDocument();
  })

  test("it displays the 'next' button", () => {
    expect(screen.getByRole('link', {name: 'Next'})).toBeInTheDocument();
  })


})
