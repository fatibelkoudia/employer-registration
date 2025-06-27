/**
 * Admin System Tests - Essential admin functionality
 */

describe('Admin System', function() {
  beforeEach(function() {
    cy.on('uncaught:exception', function() { return false; });
    cy.visit('/');
  });

  it('should display admin login form', function() {
    cy.get('button').contains('Mode Admin').click();
    cy.get('h2').contains('Connexion Administrateur').should('be.visible');
    cy.get('input[id="username"]').should('be.visible');
    cy.get('input[id="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Se connecter');
  });

  it('should reject invalid credentials', function() {
    cy.intercept('POST', '**/admin/login').as('adminLogin');
    
    cy.get('button').contains('Mode Admin').click();
    cy.get('input[id="username"]').type('wrong');
    cy.get('input[id="password"]').type('credentials');
    cy.get('button[type="submit"]').click();
    
    cy.wait('@adminLogin');
    cy.get('.Toastify__toast--error, .error', { timeout: 10000 }).should('be.visible');
  });

  it('should authenticate with valid credentials and show dashboard', function() {
    // Mock successful login and users list
    cy.intercept('POST', '**/admin/login', {
      statusCode: 200,
      body: { success: true, token: 'mock-token', username: 'admin' }
    }).as('mockLogin');
    
    cy.intercept('GET', '**/admin/users', {
      statusCode: 200,
      body: { 
        utilisateurs: [
          {
            id: 1,
            first_name: 'Test',
            last_name: 'User',
            email: 'test@example.com',
            birth_date: '1990-01-01',
            city: 'Paris',
            postal_code: '75001',
            created_at: '2024-01-01T00:00:00Z'
          }
        ] 
      }
    }).as('mockUsers');

    cy.get('button').contains('Mode Admin').click();
    cy.get('input[id="username"]').type('admin');
    cy.get('input[id="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    cy.wait('@mockLogin');
    cy.wait('@mockUsers');
    
    // Verify dashboard is displayed
    cy.get('h2').contains('Tableau de bord Administrateur').should('be.visible');
    cy.get('table').should('be.visible');
    cy.get('tbody tr').should('contain', 'Test');
  });

  it('should handle network errors during login', function() {
    cy.intercept('POST', '**/admin/login', { forceNetworkError: true }).as('networkError');
    
    cy.get('button').contains('Mode Admin').click();
    cy.get('input[id="username"]').type('admin');
    cy.get('input[id="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    cy.wait('@networkError');
    cy.get('.Toastify__toast--error, .error', { timeout: 10000 }).should('be.visible');
  });
});
