import {pathsToModuleNameMapper} from "ts-jest/utils";
import {compilerOptions} from "./tsconfig";

module.exports = {
  preset: 'jest-preset-angular',
  roots: ['<rootDir>/src'],
  transform: {'^.+\\.tsx?$': 'ts-jest'},
  testMatch: ['**/+(*.)+(spec).+(ts)'],
  setupFilesAfterEnv: ['<rootDir>/src/test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: false,
  clearMocks: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, {
    prefix: '<rootDir>/'
  })
};
