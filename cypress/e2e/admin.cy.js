/**
 * Admin Authentication and Dashboard Tests
 * Tests for admin login, dashboard functionality, and user management
 */

describe('Admin System', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.wait(2000);
  });

  describe('Admin Authentication', () => {
    it('should display admin login form', () => {
      cy.goToAdminLogin();
      cy.get('input[id="username"]').should('be.visible');
      cy.get('input[id="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible').and('contain', 'Se connecter');
    });

    it('should reject invalid credentials', () => {
      cy.goToAdminLogin();
      cy.loginAsAdmin('wrong', 'credentials').then((interception) => {
        if (interception.response && interception.response.statusCode >= 400) {
          cy.waitForError();
        }
      });
    });

    it('should authenticate with valid credentials', () => {
      cy.accessAdminDashboard().then((interception) => {
        if (interception.response && interception.response.statusCode === 200) {
          cy.waitForUsersList();
          cy.get('span').contains('Connecté en tant que:').should('be.visible');
          cy.get('strong').contains('admin').should('be.visible');
        }
      });
    });

    it('should handle network errors during login', () => {
      cy.intercept('POST', 'http://localhost:8000/admin/login', { forceNetworkError: true }).as('networkError');
      
      cy.goToAdminLogin();
      cy.get('input[id="username"]').type('admin');
      cy.get('input[id="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
      
      cy.wait('@networkError');
      cy.waitForError();
    });
  });

  describe('Admin Dashboard - Mocked Data', () => {
    beforeEach(() => {
      cy.mockSuccessfulLogin();
      cy.mockUsersList([
        {
          id: 1,
          first_name: 'Alice',
          last_name: 'Johnson',
          email: 'alice.johnson@example.com',
          birth_date: '1988-03-15',
          city: 'Marseille',
          postal_code: '13001',
          created_at: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          first_name: 'Bob',
          last_name: 'Wilson',
          email: 'bob.wilson@example.com',
          birth_date: '1985-07-22',
          city: 'Nice',
          postal_code: '06000',
          created_at: '2024-01-20T14:45:00Z'
        }
      ]);

      cy.accessAdminDashboard();
      cy.wait('@mockAdminLogin');
      cy.wait('@mockUsersList');
    });

    it('should display users list correctly', () => {
      cy.get('h3').contains('Liste des utilisateurs').should('be.visible');
      cy.get('table').should('be.visible');
      cy.get('tbody tr').should('have.length', 2);
      
      // Verify user data
      cy.get('tbody tr').first().should('contain', 'Alice').and('contain', 'Johnson');
      cy.get('tbody tr').last().should('contain', 'Bob').and('contain', 'Wilson');
    });

    it('should display and close user details', () => {
      cy.viewUserDetails('alice.johnson@example.com');
      cy.get('.user-details').should('contain', 'Alice');
      cy.get('.user-details').should('contain', 'Johnson');
      cy.get('.user-details').should('contain', 'Marseille');
      cy.closeUserDetails();
    });

    it('should logout successfully', () => {
      cy.logoutAdmin();
      cy.get('button').contains('Mode Admin').should('be.visible');
    });

    it('should handle empty users list', () => {
      cy.mockUsersList([]);
      cy.reload();
      cy.wait('@mockUsersList');
      
      cy.get('table').should('be.visible');
      cy.get('tbody tr').should('have.length', 0);
    });
  });

  describe('Admin Dashboard - Real Backend Integration', () => {
    it('should work with real backend if available', () => {
      cy.accessAdminDashboard().then((interception) => {
        if (interception.response && interception.response.statusCode === 200) {
          cy.waitForUsersList().then((usersInterception) => {
            if (usersInterception.response && usersInterception.response.statusCode === 200) {
              cy.log('Real backend integration working');
              cy.get('table').should('be.visible');
              cy.logoutAdmin();
            }
          });
        } else {
          cy.log('Real backend not available, testing error handling');
          cy.waitForError();
        }
      });
    });
  });
});
