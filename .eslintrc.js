module.exports = {
    // No need to pass a configuration file
    root: true,
    parserOptions: {
      parser: 'babel-eslint'
    },
    env: {
      browser: true,
      webextensions: true,
      "jest/globals": true
    },
    extends: [
      'plugin:vue/essential',
      'airbnb-base',
      'plugin:prettier/recommended'
    ],
    // required to lint *.vue files
    plugins: [
      'vue',
      'jest'
    ],
    // check if imports actually resolve
    settings: {
      'import/resolver': {
        webpack: {
          config: './webpack.config.js'
        }
      }
    },
    rules: {
      // don't require .vue extension when importing
      'import/extensions': ['error', 'always', {
        js: 'never',
        vue: 'never'
      }],
        // disallow reassignment of function parameters
        // disallow parameter object manipulation except for specific exclusions
      'no-param-reassign': ['error', {
        props: true,
      },],
      "jest/no-identical-title": "error",
      "jest/valid-expect": "error",

      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    }
  }
  