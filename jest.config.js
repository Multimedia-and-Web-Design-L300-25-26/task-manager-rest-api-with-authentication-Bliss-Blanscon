// jest.config.js
export default {
  preset: null,
  testEnvironment: "node",
  transform: {},
  transformIgnorePatterns: [
    "node_modules/(?!(supertest)/)"
  ],
  testTimeout: 30000,
  forceExit: true,
  detectOpenHandles: false,
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"] // ✅ add this
};