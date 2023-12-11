import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppClass from './AppClass'; // Adjust the import path as needed

// Test rendering of visible texts in headings, buttons, and links
test('renders headings, buttons, and links correctly', () => {
  render(<AppClass />);
  
  expect(screen.getByText(/coordinates/i)).toBeInTheDocument();
  expect(screen.getByText(/you moved/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /left/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /right/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /up/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /down/i })).toBeInTheDocument();
});




test('submitting the form clears the email input', async () => {
  render(<AppClass />);
  
  // Find the input and submit elements
  const inputElement = screen.getByPlaceholderText(/type email/i);
  const submitButton = screen.getByText(/submit/i); // Adjust if your button text is different

  // Simulate typing a valid email and submitting the form
  fireEvent.change(inputElement, { target: { value: 'test@example.com' } });
  fireEvent.click(submitButton);

  // Wait for the form submission to complete and the email input to be cleared
  await waitFor(() => {
    expect(inputElement.value).toBe(''); // Assuming the email input should be cleared
  });
});


// Test that an error message is displayed for an invalid email on submit
test('displays error message for invalid email on submit', async () => {
  render(<AppClass />);
  
  // Find the input and submit button elements
  const inputElement = screen.getByPlaceholderText(/type email/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  // Simulate typing an invalid email and submitting the form
  fireEvent.type(inputElement, { target: { value: 'invalidemail' } });
  fireEvent.click(submitButton);

  // Assuming that the component displays the error inside an element with role 'alert'
  const errorMessage = await screen.findByRole('alert');
  expect(errorMessage).toHaveTextContent(/email must be a valid email/i); // Adjust the expected text to match your component
});



// Test that the reset button resets the state
test('reset button resets the state', () => {
  render(<AppClass />);
  const resetButton = screen.getByRole('button', { name: /reset/i });
  fireEvent.click(resetButton);
  expect(screen.getByText(/you moved 0 times/i)).toBeInTheDocument();
});

// Test clicking a movement button updates steps
test('movement button increments steps', () => {
  render(<AppClass />);
  const moveButton = screen.getByRole('button', { name: /right/i });
  fireEvent.click(moveButton);
  expect(screen.getByText(/you moved 1 time/i)).toBeInTheDocument();
});

// Test error message when trying to move 'B' to the left at the left edge
test('error message displayed when moving left at the left edge', () => {
  render(<AppClass />);
  // Assuming 'B' starts at the left-most position
  const moveButton = screen.getByRole('button', { name: /left/i });
  fireEvent.click(moveButton);
  expect(screen.getByText(/you can't go left/i)).toBeInTheDocument();
});
