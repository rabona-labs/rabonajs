export default {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  modulePaths: ['node_modules', 'src'],
  resetMocks: false,
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  moduleNameMapper: {
    d3: '<rootDir>/node_modules/d3/dist/d3.min.js',
  },
  moduleFileExtensions: ['js', 'jsx', 'tsx', 'ts', 'json'],
};
