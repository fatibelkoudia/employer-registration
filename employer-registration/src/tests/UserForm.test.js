import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from '../components/UserForm';
import { ToastContainer } from 'react-toastify';

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("UserForm Component", () => {

  const setup = () => {
    const mockUsers = [];
    const setUsers = jest.fn();
    render(
      <>
        <UserForm users={mockUsers} setUsers={setUsers} />
        <ToastContainer />
      </>
    );
    return { setUsers };
  };

  test("Submit button is disabled when fields are empty", () => {
    setup();
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  test("Displays error messages for invalid inputs", async () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: "John123" } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: "Doe@" } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "invalidemail" } });
    fireEvent.change(screen.getByLabelText(/birthDate/i), { target: { value: "2010-01-01" } });
    fireEvent.change(screen.getByPlaceholderText(/city/i), { target: { value: "Paris123" } });
    fireEvent.change(screen.getByPlaceholderText(/postal code/i), { target: { value: "7500" } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getAllByText(/champ invalide/i).length).toBeGreaterThanOrEqual(3);
    });
    expect(screen.getByText("Email invalide")).toBeInTheDocument();
    expect(screen.getByText("Vous devez avoir au moins 18 ans")).toBeInTheDocument();
    expect(screen.getByText("Code postal invalide (5 chiffres)")).toBeInTheDocument();
  });

  test("Submits form successfully and resets fields", async () => {
    const { setUsers } = setup();

    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: "Jane" } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "jane.doe@example.com" } });
    fireEvent.change(screen.getByLabelText(/birthDate/i), { target: { value: "1990-01-01" } });
    fireEvent.change(screen.getByPlaceholderText(/city/i), { target: { value: "Paris" } });
    fireEvent.change(screen.getByPlaceholderText(/postal code/i), { target: { value: "75000" } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/inscription réussie/i)).toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText(/first name/i).value).toBe('');
    expect(screen.getByPlaceholderText(/last name/i).value).toBe('');
    expect(screen.getByPlaceholderText(/email/i).value).toBe('');
    expect(screen.getByLabelText(/birthDate/i).value).toBe('');
    expect(screen.getByPlaceholderText(/city/i).value).toBe('');
    expect(screen.getByPlaceholderText(/postal code/i).value).toBe('');
  });
});
