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
  modulePathIgnorePatterns: [
    "<rootDir>/src/index.ts", // exclui o arquivo principal da aplicação
    "<rootDir>/src/(.*)/config/(.*)", // exclui arquivos de config
    "<rootDir>/src/main(.*)", // exclui arquivos da main
  ],
};
