import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios;

describe('Admin Authentication Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('AdminLogin Component', () => {
    test('renders login form correctly', () => {
      const mockOnLogin = jest.fn();
      render(<AdminLogin onLogin={mockOnLogin} />);
      
      expect(screen.getByText('Connexion Administrateur')).toBeInTheDocument();
      expect(screen.getByLabelText(/nom d'utilisateur/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
    });

    test('handles successful login', async () => {
      const mockOnLogin = jest.fn();
      mockedAxios.post = jest.fn().mockResolvedValue({
        data: { success: true, token: 'fake-jwt-token', username: 'admin' }
      });

      render(<AdminLogin onLogin={mockOnLogin} />);
      
      fireEvent.change(screen.getByLabelText(/nom d'utilisateur/i), { 
        target: { value: 'admin' } 
      });
      fireEvent.change(screen.getByLabelText(/mot de passe/i), { 
        target: { value: 'admin123' } 
      });
      fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalledWith(
          'http://localhost:8000/admin/login',
          { username: 'admin', password: 'admin123' }
        );
        expect(mockOnLogin).toHaveBeenCalledWith('fake-jwt-token');
      });
    });

    test('handles login failure', async () => {
      const mockOnLogin = jest.fn();
      mockedAxios.post = jest.fn().mockResolvedValue({
        data: { success: false, message: 'Invalid credentials' }
      });

      render(<AdminLogin onLogin={mockOnLogin} />);
      
      fireEvent.change(screen.getByLabelText(/nom d'utilisateur/i), { 
        target: { value: 'wrong' } 
      });
      fireEvent.change(screen.getByLabelText(/mot de passe/i), { 
        target: { value: 'wrong' } 
      });
      fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

      await waitFor(() => {
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(mockOnLogin).not.toHaveBeenCalled();
      });
    });
  });

  describe('AdminDashboard Component', () => {
    const mockUsers = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        birthDate: '1990-01-01',
        city: 'Paris',
        postalCode: '75001',
        created_at: '2023-01-01 10:00:00'
      }
    ];

    beforeEach(() => {
      localStorage.setItem('adminToken', 'fake-token');
      localStorage.setItem('adminUser', 'admin');
    });

    test('renders admin dashboard correctly', async () => {
      const mockSetUsers = jest.fn();
      const mockOnLogout = jest.fn();
      
      mockedAxios.get = jest.fn().mockResolvedValue({
        data: { utilisateurs: mockUsers }
      });

      render(
        <AdminDashboard 
          users={mockUsers} 
          setUsers={mockSetUsers} 
          onLogout={mockOnLogout} 
        />
      );

      expect(screen.getByText('Tableau de bord Administrateur')).toBeInTheDocument();
      expect(screen.getByText('Connecté en tant que:')).toBeInTheDocument();
      expect(screen.getByText('admin')).toBeInTheDocument();
      expect(screen.getByText('Liste des utilisateurs (1)')).toBeInTheDocument();
    });

    test('handles user deletion', async () => {
      const mockSetUsers = jest.fn();
      const mockOnLogout = jest.fn();
      
      mockedAxios.get = jest.fn().mockResolvedValue({
        data: { utilisateurs: mockUsers }
      });
      mockedAxios.delete = jest.fn().mockResolvedValue({
        data: { success: true }
      });

      // Mock window.confirm
      window.confirm = jest.fn().mockReturnValue(true);

      render(
        <AdminDashboard 
          users={mockUsers} 
          setUsers={mockSetUsers} 
          onLogout={mockOnLogout} 
        />
      );

      const deleteButton = screen.getByText('Supprimer');
      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(mockedAxios.delete).toHaveBeenCalledWith(
          'http://localhost:8000/admin/users/1',
          { headers: { 'Authorization': 'Bearer fake-token' } }
        );
      });
    });
  });
});
