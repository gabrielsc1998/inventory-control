module.exports = {
  roots: ["<rootDir>/src/"],
  rootDir: "./",
  modulePaths: ["<rootDir>"],
  testEnvironment: "node",
  transform: {
    // ".+\\.ts$": "ts-jest",
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  collectCoverageFrom: ["<rootDir>/src/**/*.(t|j)s"],
};
