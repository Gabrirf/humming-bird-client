module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:ava/recommended',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'ava/no-ignored-test-files': ['error', { files: ['**/*.test.js'] }],
    'ava/no-import-test-files': ['error', { files: ['**/*.test.js'] }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.d.ts', '.cjs'],
        moduleDirectory: ['src', 'node_modules'],
      },
    },
  },
};
