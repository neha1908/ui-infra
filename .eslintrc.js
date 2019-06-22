module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  plugins: ['react-hooks', 'babel'],
  rules: {
    camelcase: 0,
    'react/jsx-filename-extension': 0,
    'object-curly-newline': 0,
    'no-use-before-define': 0,
    'import/prefer-default-export': 0,
    'import/no-named-as-default-member': 0,
    'import/no-named-as-default': 0,
    'react/require-default-props': [2, { forbidDefaultForRequired: false }],
    'react/default-props-match-prop-types': [1, { allowRequiredDefaults: true }],
    'react/jsx-one-expression-per-line': 0,
    indent: ['error', 2, { SwitchCase: 1 }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
  },
  env: {
    jest: true,
  },
};
