import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 's6k79v',
  e2e: {
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.js",
    setupNodeEvents(on, config) {
      import("@cypress/code-coverage/task.js").then((codeCoverage) => {
        codeCoverage.default(on, config);
      });
      return config;
    },
    defaultCommandTimeout: 10000,
  },
  viewportWidth: 1280,
  viewportHeight: 720,
});
