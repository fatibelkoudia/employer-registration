import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from '../components/UserForm';
import { ToastContainer } from 'react-toastify';

describe("UserForm Component", () => {

  test("Submit button is disabled when fields are empty", () => {
    render(
      <>
        <UserForm />
        <ToastContainer />
      </>
    );
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
  });

  test("Displays error messages for invalid inputs", async () => {
    render(
      <>
        <UserForm />
        <ToastContainer />
      </>
    );
    // Fill inputs with invalid values
    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: "John123" } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: "Doe@" } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "invalidemail" } });
    fireEvent.change(screen.getByLabelText(/birthDate/i), { target: { value: "2010-01-01" } }); // under 18
    fireEvent.change(screen.getByPlaceholderText(/city/i), { target: { value: "Paris123" } });
    fireEvent.change(screen.getByPlaceholderText(/postal code/i), { target: { value: "7500" } });
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);
    await waitFor(() => {
        expect(screen.getByText("Nom invalide (lettres, accents, tirets uniquement)")).toBeInTheDocument();
      });
    await waitFor(() => {
        expect(screen.getByText("Prénom invalide (lettres, accents, tirets uniquement)")).toBeInTheDocument();
      }
    );
    await waitFor(() => {
        expect(screen.getByText("Email invalide")).toBeInTheDocument();
      }
    );
    await waitFor(() => {
        expect(screen.getByText("Vous devez avoir au moins 18 ans")).toBeInTheDocument();
      }
    );
    await waitFor(() => {
        expect(screen.getByText("Ville invalide")).toBeInTheDocument();
      }
    );
    await waitFor(() => {
        expect(screen.getByText("Code postal invalide (5 chiffres)")).toBeInTheDocument();
      }
    );
    });

  test("Submits form successfully and resets fields", async () => {
    render(
      <>
        <UserForm />
        <ToastContainer />
      </>
    );
    // Fill inputs with valid data
    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: "Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByLabelText(/birthDate/i), { target: { value: "1990-01-01" } });
    fireEvent.change(screen.getByPlaceholderText(/city/i), { target: { value: "Paris" } });
    fireEvent.change(screen.getByPlaceholderText(/postal code/i), { target: { value: "75000" } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    // Wait for the success toast to appear
    await waitFor(() => {
        expect(screen.getByText(/inscription réussie/i)).toBeInTheDocument();
    });

    // Verify that inputs are reset
    expect(screen.getByPlaceholderText(/first name/i).value).toBe('');
    expect(screen.getByPlaceholderText(/last name/i).value).toBe('');
    expect(screen.getByPlaceholderText(/email/i).value).toBe('');
    expect(screen.getByLabelText(/birthDate/i).value).toBe('');
    expect(screen.getByPlaceholderText(/city/i).value).toBe('');
    expect(screen.getByPlaceholderText(/postal code/i).value).toBe('');
  });
});
