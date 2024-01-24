module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: ['/node_modules/(?!.*\\.(js|jsx|ts|tsx|json|png|jpg|jpeg|gif|svg)$)'],
  setupFiles: ['./setupTests.ts'],
}
