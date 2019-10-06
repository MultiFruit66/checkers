module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'never'],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'space-before-function-paren': ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
  },
}
