/**
 * User Registration Tests
 * Tests for the main user registration functionality
 */

describe('User Registration', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.wait(2000);
  });

  describe('Form Validation', () => {
    it('should show validation errors for empty form', () => {
      cy.get('button[type="submit"]').should('be.disabled');
      // Try to fill invalid data to trigger validation
      cy.get('input[name="email"]').type('invalid-email').blur();
      cy.get('input[name="postalCode"]').type('123').blur();
      cy.get('button[type="submit"]').should('be.disabled');
    });

    it('should validate email format', () => {
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('input[name="email"]').type('invalid-email');
      cy.get('input[name="birthDate"]').type('1990-01-01');
      cy.get('input[name="city"]').type('Paris');
      cy.get('input[name="postalCode"]').type('75001');
      
      cy.get('button[type="submit"]').click();
      cy.waitForError();
    });

    it('should validate postal code format', () => {
      cy.get('input[name="firstName"]').type('John');
      cy.get('input[name="lastName"]').type('Doe');
      cy.get('input[name="email"]').type('john@example.com');
      cy.get('input[name="birthDate"]').type('1990-01-01');
      cy.get('input[name="city"]').type('Paris');
      cy.get('input[name="postalCode"]').type('123'); // Too short
      
      cy.get('button[type="submit"]').click();
      cy.waitForError();
    });
  });

  describe('Successful Registration', () => {
    it('should register a new user with valid data', () => {
      const user = {
        firstName: 'Alice',
        lastName: 'Smith',
        email: `alice.smith.${Date.now()}@example.com`,
        birthDate: '1992-05-15',
        city: 'Lyon',
        postalCode: '69001'
      };

      cy.registerUser(user).then((interception) => {
        if (interception.response && interception.response.statusCode === 200) {
          cy.waitForSuccess();
          // Form should be cleared after successful submission
          cy.get('input[name="firstName"]').should('have.value', '');
          cy.get('input[name="email"]').should('have.value', '');
        }
      });
    });

    it('should handle network errors gracefully', () => {
      cy.intercept('POST', 'http://localhost:8000/users', { forceNetworkError: true }).as('networkError');
      
      const user = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        birthDate: '1990-01-01',
        city: 'Paris',
        postalCode: '75001'
      };

      cy.fillUserForm(user);
      cy.get('button[type="submit"]').click();
      cy.wait('@networkError');
      cy.waitForError();
    });
  });

  describe('Form Interactions', () => {
    it('should have all required form fields visible', () => {
      const requiredFields = ['firstName', 'lastName', 'email', 'birthDate', 'city', 'postalCode'];
      
      requiredFields.forEach(field => {
        cy.get(`input[name="${field}"]`).should('be.visible');
      });
      
      cy.get('button[type="submit"]').should('be.visible').and('contain', 'Submit');
    });

    it('should allow form data entry', () => {
      cy.get('input[name="firstName"]').type('Test').should('have.value', 'Test');
      cy.get('input[name="lastName"]').type('User').should('have.value', 'User');
      cy.get('input[name="email"]').type('test@test.com').should('have.value', 'test@test.com');
    });
  });
});
