const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "oavu2k",
  reporter: "mochawesome",
  reporterOptions: {
    "reportFile": "[name]-report",
    "overwrite": false,
    "html": true,
    "json": true
  },
  e2e: {
    viewportHeight:1080,
    viewportWidth:1440,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
