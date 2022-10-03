module.exports = {
  roots: ["<rootDir>/src/"],
  rootDir: "./",
  modulePaths: ["<rootDir>/src/"],
  collectCoverageFrom: ["<rootDir>/src/**/*.(t|j)s"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};
