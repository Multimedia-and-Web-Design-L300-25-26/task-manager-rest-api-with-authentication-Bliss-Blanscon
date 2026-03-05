export default {
  preset: null,
  testEnvironment: "node",
  transform: {},
  transformIgnorePatterns: [
    "node_modules/(?!(supertest)/)"
  ]
};