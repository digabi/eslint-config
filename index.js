module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:mocha/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier/react'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  env: {
    browser: true,
    mocha: true,
    node: true,
    es2020: true
  },
  plugins: ['mocha', 'prettier'],
  rules: {
    'array-callback-return': 'error',
    'prefer-object-spread': 'error',
    'no-duplicate-imports': ['error', { includeExports: true }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // allow variables that starts with _
    'import/no-unresolved': 0, // Doesn't work with TypeScript modules, see https://github.com/benmosher/eslint-plugin-import/issues/1120
    'mocha/no-mocha-arrows': 0,
    'mocha/no-setup-in-describe': 0, // This would be nice, but currently it breaks too much existing code.
    'mocha/no-sibling-hooks': 0,
    'react/prop-types': 0 // We don't use prop-types.
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ['**.ts', '**.tsx'],
      extends: [
        'plugin:import/typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier/@typescript-eslint'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json'
      },
      plugins: ['@typescript-eslint', 'mocha', 'prettier'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-explicit-any': 0, // We probably should enable this, but it breaks a lot of code right now (unknown is usually the better choice).
        '@typescript-eslint/no-non-null-assertion': 0, // We use these quite extensively when the compiler isn't smart enough.
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/unbound-method': 0, // We like using libraries like lodash or Ramda, where using "methods" this way is the norm.
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // allow variables that starts with _
        '@typescript-eslint/require-await': 0 // allow functions that returns non-promise also. Useful when implementing interfaces with possible promises
      }
    }
  ]
}
