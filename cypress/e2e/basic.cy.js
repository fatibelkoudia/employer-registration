/**
 * Basic Application Tests
 * Fundamental smoke tests to verify application is working
 */

describe('Application Smoke Tests', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.wait(1000);
  });

  describe('Application Loading', () => {
    it('should load the main page successfully', () => {
      cy.get('h1').contains('Système d\'Inscription').should('be.visible');
      cy.get('form').should('be.visible');
    });

    it('should have admin mode button accessible', () => {
      cy.get('button').contains('Mode Admin').should('be.visible');
    });

    it('should display all form fields', () => {
      const expectedFields = [
        'firstName',
        'lastName', 
        'email',
        'birthDate',
        'city',
        'postalCode'
      ];

      expectedFields.forEach(field => {
        cy.get(`input[name="${field}"]`).should('be.visible');
      });

      cy.get('button[type="submit"]').should('be.visible');
    });
  });

  describe('Basic Functionality', () => {
    it('should allow form input', () => {
      cy.get('input[name="firstName"]').type('Test').should('have.value', 'Test');
      cy.get('input[name="email"]').type('test@example.com').should('have.value', 'test@example.com');
    });

    it('should show admin login when clicking admin mode', () => {
      cy.get('button').contains('Mode Admin').click();
      cy.get('h2').contains('Connexion Administrateur').should('be.visible');
      cy.get('input[id="username"]').should('be.visible');
      cy.get('input[id="password"]').should('be.visible');
    });

    it('should navigate back from admin to main form', () => {
      cy.get('button').contains('Mode Admin').click();
      cy.get('h2').contains('Connexion Administrateur').should('be.visible');
      
      cy.get('button').contains('Mode Utilisateur').click();
      cy.get('h1').contains('Système d\'Inscription').should('be.visible');
    });
  });

  describe('Quick Registration Test', () => {
    it('should attempt user registration', () => {
      const timestamp = Date.now();
      
      cy.get('input[name="firstName"]').type('QuickTest');
      cy.get('input[name="lastName"]').type('User');
      cy.get('input[name="email"]').type(`quicktest.${timestamp}@example.com`);
      cy.get('input[name="birthDate"]').type('1990-01-01');
      cy.get('input[name="city"]').type('TestCity');
      cy.get('input[name="postalCode"]').type('12345');

      cy.get('button[type="submit"]').click();
      
      // Wait for either success or error response
      cy.get('.Toastify__toast, .error, .success', { timeout: 20000 }).should('be.visible');
    });
  });
});
