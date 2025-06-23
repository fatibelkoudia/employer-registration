const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: true,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 2,
      openMode: 0
    },
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    env: {
      apiUrl: "http://localhost:8000",
      adminUsername: "admin",
      adminPassword: "admin123"
    },
    setupNodeEvents(on, config) {
      // Task for generating unique test data
      on('task', {
        generateTestUser() {
          const timestamp = Date.now();
          return {
            firstName: 'Cypress',
            lastName: 'TestUser',
            email: `cypress.test.${timestamp}@example.com`,
            birthDate: '1990-01-01',
            city: 'Paris',
            postalCode: '75001'
          };
        }
      });
    },
  },
});

