// Simplified Cypress Commands - Essential commands only

// Basic utility commands
Cypress.Commands.add('waitForSuccess', function() {
  cy.get('.Toastify__toast--success, .success', { timeout: 15000 }).should('be.visible');
});

Cypress.Commands.add('waitForError', function() {
  cy.get('.Toastify__toast--error, .error', { timeout: 10000 }).should('be.visible');
});

// Reset application state
Cypress.Commands.add('resetAppState', function() {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.reload();
});
