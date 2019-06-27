const ENABLE_COVERAGE = !!process.env.CI;

const makeBaseProject = () => ({
  setupFiles: ["<rootDir>/tests_config/run_spec.js"],
  testRegex: "jsfmt\\.spec\\.js$|__tests__/.*\\.js$",
  snapshotSerializers: ["jest-snapshot-serializer-raw"]
});

module.exports = {
  collectCoverage: ENABLE_COVERAGE,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.js",
    "!<rootDir>/node_modules/",
    "!<rootDir>/tests_config/"
  ],
  projects: [
    {
      ...makeBaseProject(),
      displayName: "test-node",
      testEnvironment: "node",
      globals: {
        STANDALONE: false
      }
    },
    {
      ...makeBaseProject(),
      displayName: "test-standalone",
      testEnvironment: "jsdom",
      globals: {
        STANDALONE: true
      }
    }
  ]
};
