const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "test-results",
  reportPath: "testResults/reports/",
  reportName: "Playwright Automation",
  displayDuration: false,
  metadata: {
    browser: {
      name: "chrome",
      version: "114",
    },
    device: "Madhubalan MacBook Pro",
    platform: {
      name: "macOS Sonoma",
      version: "14.6.1",
    },
  },
  customData: {
    title: "Run Info",
    data: [
      { label: "Project", value: "Playwright Automation" },
      { label: "Release", value: "1.2.3" },
    ],
  },
});