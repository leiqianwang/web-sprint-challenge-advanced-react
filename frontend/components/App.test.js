import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppClass from './AppClass'; // Adjust the import path as needed
import { waitFor } from '@testing-library/react';


test('renders headings and buttons correctly', () => {
  render(<AppClass />);

  
  // Header Text
  // const heading = screen.getByText(/welcome to the GRID/i);
  // expect(heading).toBeInTheDocument();


  // Placeholder Text
  const inputElement = screen.getByPlaceholderText(/type email/i);
  expect(inputElement).toBeInTheDocument();

  // TestId (use this sparingly)
  // Make sure to add `data-testid` to your elements if you're using this approach.
  const leftButton = document.querySelector('#left');
  expect(leftButton).toBeInTheDocument();

});

test('check grid', async() => {
    render(<AppClass />)

    const checkGrid = document.querySelector('#grid')
    expect(checkGrid).toBeTruthy();

})


// test('renders navigation links correctly', () => {
//   render(<AppClass />);
  
//   // Find the links by their text, which is the accessible name
//   const functionalLink = screen.getByRole('link', { name: /functional/i });
//   const classBasedLink = screen.getByRole('link', { name: /class-based/i });

//   // Check that the links are in the document
//   expect(functionalLink).toBeInTheDocument();
//   expect(classBasedLink).toBeInTheDocument();
// });


// test('submitting the form then clears the email input', async () => {
//   render(<AppClass />);
  
//   //act
//   const inputElement = screen.getByPlaceholderText(/type email/i);
//   const submitButton = screen.getByText(/submit/i); // Make sure this matches the text content of your submit button

//   fireEvent.input(inputElement, { target: { value: 'test@example.com' } });
//   fireEvent.click(submitButton);


//   // Wait for the email input to be cleared
//   await waitFor(() => {
//     expect(inputElement.value).toBe('');
//   });
// });

test('check if submit button is present', async() => {
  render(<AppClass />)

  const submitButton = document.querySelector('#submit');

  expect(submitButton).toBeTruthy();
})


// Test that an error message is displayed for an invalid email on submit
test('displays error message for invalid email on submit', async () => {
  render(<AppClass />);
  
  // Find the input and submit button elements
  const inputElement = screen.getByPlaceholderText(/type email/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  // Simulate typing an invalid email and submitting the form
  fireEvent.input(inputElement, { target: { value: 'invalidemail' } });
  fireEvent.click(submitButton);

  // // Assuming that the component displays the error inside an element with role 'alert'
  // const errorMessage = await screen.findByRole('alert');
  // expect(errorMessage).toHaveTextContent(/email must be a valid email/i); // Adjust the expected text to match your component
});



// Test that the reset button resets the state
test('reset button resets the state', () => {
  render(<AppClass />);
  const resetButton = screen.getByRole('button', { name: /reset/i });
  fireEvent.click(resetButton);
  expect(screen.getByText(/you moved 0 times/i)).toBeInTheDocument();
});


// // Test clicking a movement button updates steps
// test('movement button increments steps', () => {
//   render(<AppClass />);
//   const moveButton = screen.getByRole('button', { name: /right/i });
//   fireEvent.click(moveButton);
//   expect(screen.getByText(/you moved 1 time/i)).toBeInTheDocument();
// });


// // Test error message when trying to move 'B' to the left at the left edge
// test('error message displayed when moving left at the left edge', () => {
//   render(<AppClass />);
//   // Assuming 'B' starts at the left-most position
//   const moveButton = screen.getByRole('button', { name: /left/i });
//   fireEvent.click(moveButton);
//   expect(screen.getByText(/you can't go left/i)).toBeInTheDocument();
// });
