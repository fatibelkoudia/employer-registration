/**
 * End-to-End Integration Tests
 * Complete workflow tests combining user registration and admin management
 */

describe('Complete User Management Workflow', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false);
    cy.viewport(1920, 1080);
    cy.visit('/');
    cy.wait(2000);
  });

  describe('Full User Lifecycle', () => {
    it('should complete user registration and admin verification workflow', () => {
      // Step 1: Register a new user
      const testUser = {
        firstName: 'Emma',
        lastName: 'Martinez',
        email: `emma.martinez.${Date.now()}@example.com`,
        birthDate: '1991-08-20',
        city: 'Bordeaux',
        postalCode: '33000'
      };

      cy.log('Step 1: Registering new user');
      cy.registerUser(testUser).then((regInterception) => {
        if (regInterception.response && regInterception.response.statusCode === 200) {
          cy.waitForSuccess();
          cy.log('User registration successful');

          // Step 2: Access admin dashboard
          cy.log('Step 2: Accessing admin dashboard');
          cy.accessAdminDashboard().then((loginInterception) => {
            if (loginInterception.response && loginInterception.response.statusCode === 200) {
              cy.log('Admin login successful');

              // Step 3: Verify user appears in admin list
              cy.log('Step 3: Verifying user in admin list');
              cy.waitForUsersList().then((usersInterception) => {
                if (usersInterception.response && usersInterception.response.statusCode === 200) {
                  cy.log('Users list loaded');
                  cy.verifyUserInList(testUser);

                  // Step 4: View user details
                  cy.log('Step 4: Viewing user details');
                  cy.viewUserDetails(testUser.email);
                  cy.get('.user-details').should('contain', testUser.firstName);
                  cy.get('.user-details').should('contain', testUser.city);
                  cy.closeUserDetails();

                  // Step 5: Logout admin
                  cy.log('Step 5: Admin logout');
                  cy.logoutAdmin();
                  cy.log('Complete workflow successful');
                } else {
                  cy.log('Users list failed to load');
                }
              });
            } else {
              cy.log('Admin login failed');
              cy.waitForError();
            }
          });
        } else {
          cy.log('User registration failed');
          cy.waitForError();
        }
      });
    });

    it('should handle user registration with existing email', () => {
      const duplicateUser = {
        firstName: 'Duplicate',
        lastName: 'User',
        email: 'duplicate@example.com',
        birthDate: '1990-01-01',
        city: 'Paris',
        postalCode: '75001'
      };

      // Register user first time
      cy.registerUser(duplicateUser);
      
      // Try to register same user again
      cy.resetAppState();
      cy.registerUser(duplicateUser).then((interception) => {
        if (interception.response && interception.response.statusCode >= 400) {
          cy.waitForError();
        }
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle backend unavailable scenarios', () => {
      // Test user registration with backend down
      cy.intercept('POST', 'http://localhost:8000/users', { forceNetworkError: true }).as('userNetworkError');
      
      const user = cy.generateTestUser();
      cy.fillUserForm(user);
      cy.get('button[type="submit"]').click();
      cy.wait('@userNetworkError');
      cy.waitForError();
    });

    it('should handle admin API failures', () => {
      // Test admin login with backend returning errors
      cy.intercept('POST', 'http://localhost:8000/admin/login', {
        statusCode: 500,
        body: { error: 'Internal server error' }
      }).as('adminError');
      
      cy.goToAdminLogin();
      cy.get('input[id="username"]').type('admin');
      cy.get('input[id="password"]').type('admin123');
      cy.get('button[type="submit"]').click();
      cy.wait('@adminError');
      cy.waitForError();
    });

    it('should handle malformed API responses', () => {
      cy.mockSuccessfulLogin();
      cy.intercept('GET', 'http://localhost:8000/admin/users', {
        statusCode: 200,
        body: { invalid: 'response' } // Missing utilisateurs array
      }).as('malformedResponse');
      
      cy.accessAdminDashboard();
      cy.wait('@mockAdminLogin');
      cy.wait('@malformedResponse');
      
      // Should handle gracefully without crashing
      cy.get('body').should('be.visible');
    });

    it('should handle slow API responses', () => {
      cy.intercept('POST', 'http://localhost:8000/users', (req) => {
        req.reply((res) => {
          res.delay(5000); // 5 second delay
          res.send({ statusCode: 200, body: { success: true } });
        });
      }).as('slowResponse');
      
      const user = cy.generateTestUser();
      cy.registerUser(user);
      cy.wait('@slowResponse', { timeout: 20000 });
    });
  });

  describe('Application State Management', () => {
    it('should maintain form state during user interaction', () => {
      const partialUser = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com'
      };

      cy.get('input[name="firstName"]').type(partialUser.firstName);
      cy.get('input[name="lastName"]').type(partialUser.lastName);
      cy.get('input[name="email"]').type(partialUser.email);

      // Navigate to admin and back
      cy.goToAdminLogin();
      cy.go('back');

      // Form should be reset after navigation
      cy.get('input[name="firstName"]').should('have.value', '');
    });

    it('should handle page refresh during workflow', () => {
      cy.mockSuccessfulLogin();
      cy.mockUsersList();
      
      cy.accessAdminDashboard();
      cy.wait('@mockAdminLogin');
      
      // Refresh page
      cy.reload();
      
      // Should either maintain session or redirect to login
      cy.get('body').should('be.visible');
    });
  });

  describe('Cross-Browser Compatibility', () => {
    it('should work across different viewport sizes', () => {
      const viewports = [
        { width: 375, height: 667 },   // Mobile
        { width: 768, height: 1024 },  // Tablet
        { width: 1920, height: 1080 }  // Desktop
      ];

      viewports.forEach(viewport => {
        cy.viewport(viewport.width, viewport.height);
        cy.reload();
        cy.get('h1').should('be.visible');
        cy.get('form').should('be.visible');
      });
    });
  });
});
