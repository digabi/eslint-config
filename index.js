function hasDependency(module) {
  try {
    require.resolve(module)
    return true
  } catch (err) {
    return false
  }
}

const hasMocha = hasDependency('eslint-plugin-mocha')
const hasJest = hasDependency('eslint-plugin-jest')
const hasReact = hasDependency('eslint-plugin-react')

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:promise/recommended',
    hasMocha && 'plugin:mocha/recommended',
    hasJest && 'plugin:jest/recommended',
    hasJest && 'plugin:jest/style',
    hasReact && 'plugin:react/recommended',
    'plugin:prettier/recommended',
  ].filter(Boolean),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
    ...(hasMocha && { mocha: true }),
  },
  plugins: ['promise', hasMocha && 'mocha', hasJest && 'jest'].filter(Boolean),
  rules: {
    'array-callback-return': 'error',
    'prefer-object-spread': 'error',
    'no-duplicate-imports': ['error', { includeExports: true }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // allow variables that starts with _
    'import/default': 0,
    'import/named': 0,
    'import/namespace': 0,
    'import/no-unresolved': 0,
    'promise/avoid-new': 0,
    'promise/catch-or-return': ['error', { allowFinally: true }],
    'promise/no-callback-in-promise': 0,
    'promise/no-nesting': 0,
    'require-await': 'error',
    ...(hasMocha && {
      'mocha/no-mocha-arrows': 0,
      'mocha/no-setup-in-describe': 0, // This would be nice, but currently it breaks too much existing code.
      'mocha/no-sibling-hooks': 0,
      'mocha/no-hooks-for-single-case': 0,
    }),
    ...(hasJest && {
      'jest/expect-expect': ['error', { assertFunctionNames: ['expect*'] }],
    }),
    ...(hasReact && {
      'react/prop-types': 0, // We don't use prop-types.
    }),
  },
  settings: {
    ...(hasReact && { react: { version: 'detect' } }),
  },
  overrides: [
    {
      files: ['**.ts', '**.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-explicit-any': 0, // We probably should enable this, but it breaks a lot of code right now (unknown is usually the better choice).
        '@typescript-eslint/no-non-null-assertion': 0, // We use these quite extensively when the compiler isn't smart enough.
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/unbound-method': 0, // We like using libraries like lodash or Ramda, where using "methods" this way is the norm.
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // allow variables that starts with _
      },
    },
  ],
}
