module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testEnvironment: 'jsdom',
  collectCoverage: true, // Enable coverage collection
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Specify the files for which coverage information should be collected
    '!src/**/*.d.ts','!src/**/App.tsx' // Exclude type declaration files
  ],
  coverageReporters: ['html', 'text'], 
  };
