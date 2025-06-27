/**
 * Basic Smoke Tests - Essential functionality verification
 */

describe('Application Smoke Tests', function() {
  beforeEach(function() {
    cy.on('uncaught:exception', function() { return false; });
    cy.visit('/');
  });

  it('should load the main page and display form', function() {
    cy.get('h1').contains('Système d\'Inscription').should('be.visible');
    cy.get('form').should('be.visible');
    
    // Check all form fields are present
    var fields = ['firstName', 'lastName', 'email', 'birthDate', 'city', 'postalCode'];
    fields.forEach(function(field) {
      cy.get('input[name="' + field + '"]').should('be.visible');
    });
    
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should navigate between user and admin modes', function() {
    // Go to admin mode
    cy.get('button').contains('Mode Admin').click();
    cy.get('h2').contains('Connexion Administrateur').should('be.visible');
    
    // Return to user mode
    cy.get('button').contains('Mode Utilisateur').click();
    cy.get('h1').contains('Système d\'Inscription').should('be.visible');
  });

  it('should allow basic form input', function() {
    cy.get('input[name="firstName"]').type('Test').should('have.value', 'Test');
    cy.get('input[name="email"]').type('test@example.com').should('have.value', 'test@example.com');
  });
});
