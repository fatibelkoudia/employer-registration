const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false, // pas besoin de vidéo pour aller plus vite
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
    },
  },
});

