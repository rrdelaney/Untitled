module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: 'eslint:recommended',
  parser: 'babel-eslint',
  plugins: ['react'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'never'],
    'no-extra-semi': 0,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'no-throw-literal': 1,
    'no-useless-call': 1,
    'no-alert': 1,
    'no-caller': 1,
    'no-eval': 1,
    'dot-notation': 1,
    eqeqeq: 1,
    'no-extra-bind': 1,
    'no-extra-label': 1,
    'no-implicit-coercion': 1,
    'no-implicit-globals': 1,
    'no-implied-eval': 1,
    'no-invalid-this': 1,
    'no-iterator': 1,
    'no-labels': 1,
    'no-loop-func': 1,
    'no-new-func': 1,
    'no-new-wrappers': 1,
    'no-octal-escape': 1,
    'no-proto': 1,
    'no-return-assign': 1,
    'no-return-await': 1,
    'no-script-url': 1,
    'no-self-compare': 1,
    'no-sequences': 1,
    'no-unmodified-loop-condition': 1,
    'no-useless-concat': 1,
    'no-void': 1,
    'no-with': 1,
    'prefer-promise-reject-errors': 1,
    radix: 1,
    'require-await': 1,
    'vars-on-top': 1,
    'wrap-iife': 1,
    'no-catch-shadow': 1,
    'no-label-var': 1,
    'no-shadow': 1,
    'no-undef-init': 1,
    'no-use-before-define': 1,
    'no-console': 0
  }
}
