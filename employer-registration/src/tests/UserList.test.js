import React from 'react';
import { render, screen } from '@testing-library/react';
import UserList from '../components/UserList';

describe("UserList Component", () => {
  const mockUsers = [
    {
      firstName: "Jané",
      lastName: "Doe",
      email: "jané.doe@example.com",
      birthDate: "1995-05-15",
      city: "Lyon",
      postalCode: "69000"
    },
    {
      firstName: "Ali",
      lastName: "Ben",
      email: "ali.ben@example.com",
      birthDate: "1990-03-12",
      city: "Toulouse",
      postalCode: "31000"
    }
  ];

  test("Displays list of users in a table", () => {
    render(<UserList users={mockUsers} />);

    // Check table headers
    const headers = screen.getAllByRole("columnheader").map(th => th.textContent);
    expect(headers).toEqual(expect.arrayContaining([
      "Prénom",
      "Nom",
      "Email",
      "Date de naissance",
      "Ville",
      "Code postal"
    ]));

    // Check user data
    expect(screen.getByText("Jané")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("jané.doe@example.com")).toBeInTheDocument();

    expect(screen.getByText("Ali")).toBeInTheDocument();
    expect(screen.getByText("Ben")).toBeInTheDocument();
    expect(screen.getByText("ali.ben@example.com")).toBeInTheDocument();
  });
});
