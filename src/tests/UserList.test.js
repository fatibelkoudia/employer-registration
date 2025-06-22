import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import App from '../App';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios;

describe("App Integration", () => {
  const mockUsers = [
    {
      firstName: "Jané",
      lastName: "Doe",
      email: "jané.doe@example.com",
      birthDate: "1995-05-15",
      city: "Lyon",
      postalCode: "69000"
    }
  ];

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Mock axios methods
    mockedAxios.get = jest.fn().mockResolvedValue({ 
      data: { utilisateurs: mockUsers } 
    });
    mockedAxios.post = jest.fn().mockResolvedValue({
      data: { utilisateur: { ...mockUsers[0] } }
    });
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test("Displays existing users on load and submits a new user", async () => {
    render(<App />);

    // Wait for the initial axios call to complete and users to be displayed
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith("http://localhost:8000/users");
    });

    // Les utilisateurs mockés sont affichés (test d'intégration App + UserList)
    expect(await screen.findByText("Jané")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();

    // Formulaire rempli
    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: "Ali" } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: "Ben" } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: "ali.ben@example.com" } });
    fireEvent.change(screen.getByLabelText(/birthDate/i), { target: { value: "1990-01-01" } });
    fireEvent.change(screen.getByPlaceholderText(/city/i), { target: { value: "Toulouse" } });
    fireEvent.change(screen.getByPlaceholderText(/postal code/i), { target: { value: "31000" } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    // Confirme affichage du toast ou mise à jour de la liste
    expect(await screen.findByText(/inscription réussie/i)).toBeInTheDocument();
  });
});
