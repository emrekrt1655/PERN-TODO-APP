const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeOut: 8000,
  pageLoadTimeout: 10000,

  env: {
    url_Frontend: "http://localhost:3000/",
    url_Backend: "http://localhost:5000/api/",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/integration/*.js'
  },
});
