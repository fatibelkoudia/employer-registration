// Custom Cypress Commands for Employer Registration E2E Tests

// User Registration Commands
Cypress.Commands.add('fillUserForm', (user) => {
  cy.get('input[name="firstName"]').clear().type(user.firstName);
  cy.get('input[name="lastName"]').clear().type(user.lastName);
  cy.get('input[name="email"]').clear().type(user.email);
  cy.get('input[name="birthDate"]').clear().type(user.birthDate);
  cy.get('input[name="city"]').clear().type(user.city);
  cy.get('input[name="postalCode"]').clear().type(user.postalCode);
});

Cypress.Commands.add('submitUserForm', () => {
  cy.intercept('POST', `${Cypress.env('apiUrl')}/users`).as('createUser');
  cy.get('button[type="submit"]').should('be.visible').click();
  return cy.wait('@createUser', { timeout: 20000 });
});

Cypress.Commands.add('registerUser', (user) => {
  cy.fillUserForm(user);
  return cy.submitUserForm();
});

// Admin Authentication Commands
Cypress.Commands.add('goToAdminLogin', () => {
  cy.get('button').contains('Mode Admin').should('be.visible').click();
  cy.get('h2').contains('Connexion Administrateur').should('be.visible');
});

Cypress.Commands.add('loginAsAdmin', (username, password) => {
  const adminUsername = username || Cypress.env('adminUsername') || 'admin';
  const adminPassword = password || Cypress.env('adminPassword') || 'admin123';
  
  cy.intercept('POST', `${Cypress.env('apiUrl')}/admin/login`).as('adminLogin');
  
  cy.get('input[id="username"]').clear().type(adminUsername);
  cy.get('input[id="password"]').clear().type(adminPassword);
  cy.get('button[type="submit"]').click();
  
  return cy.wait('@adminLogin', { timeout: 15000 });
});

Cypress.Commands.add('accessAdminDashboard', (username, password) => {
  cy.goToAdminLogin();
  return cy.loginAsAdmin(username, password);
});

// Admin Dashboard Commands
Cypress.Commands.add('waitForUsersList', () => {
  cy.intercept('GET', `${Cypress.env('apiUrl')}/admin/users`).as('getUsers');
  cy.get('h2').contains('Tableau de bord Administrateur', { timeout: 10000 }).should('be.visible');
  return cy.wait('@getUsers', { timeout: 15000 });
});

Cypress.Commands.add('verifyUserInList', (user) => {
  cy.get('table').should('be.visible');
  cy.get('tbody tr').should('contain', user.firstName);
  cy.get('tbody tr').should('contain', user.lastName);
  cy.get('tbody tr').should('contain', user.email);
});

Cypress.Commands.add('viewUserDetails', (email) => {
  cy.get('tbody tr').contains(email)
    .parent('tr')
    .find('button').contains('Voir détails')
    .click();
  
  cy.get('.user-details', { timeout: 5000 }).should('be.visible');
});

Cypress.Commands.add('closeUserDetails', () => {
  cy.get('button').contains('Fermer').click();
  cy.get('.user-details').should('not.exist');
});

Cypress.Commands.add('logoutAdmin', () => {
  cy.get('button').contains('Déconnexion').click();
  cy.get('h1').contains('Inscription Employeur').should('be.visible');
});

// Utility Commands
Cypress.Commands.add('generateTestUser', () => {
  const timestamp = Date.now();
  return {
    firstName: 'Test',
    lastName: 'User',
    email: `test.user.${timestamp}@example.com`,
    birthDate: '1990-01-01',
    city: 'Paris',
    postalCode: '75001'
  };
});

Cypress.Commands.add('waitForSuccess', () => {
  cy.get('.Toastify__toast--success, .success', { timeout: 15000 }).should('be.visible');
});

Cypress.Commands.add('waitForError', () => {
  cy.get('.Toastify__toast--error, .error', { timeout: 10000 }).should('be.visible');
});

Cypress.Commands.add('resetAppState', () => {
  cy.clearLocalStorage();
  cy.clearCookies();
  cy.reload();
  cy.wait(2000);
});

// Mock API Commands
Cypress.Commands.add('mockSuccessfulLogin', () => {
  cy.intercept('POST', '**/admin/login', {
    statusCode: 200,
    body: { success: true, token: 'mock-jwt-token', username: 'admin' }
  }).as('mockAdminLogin');
});

Cypress.Commands.add('mockUsersList', (users) => {
  const defaultUsers = [
    {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      birth_date: '1990-01-01',
      city: 'Paris',
      postal_code: '75001',
      created_at: '2024-01-01T00:00:00Z'
    }
  ];
  
  cy.intercept('GET', '**/admin/users', {
    statusCode: 200,
    body: { utilisateurs: users || defaultUsers }
  }).as('mockUsersList');
});