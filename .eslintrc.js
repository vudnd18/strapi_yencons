const path = require("path");

module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
    jest: true,
  },
  parser: "babel-eslint",
  plugins: ['babel', 'import'],
  extends: "eslint:recommended",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: false,
    },
    sourceType: "module",
  },
  globals: {
    strapi: true,
  },
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": "off",
    "no-console": 0,
    semi: ["error", "always"],
  },
};
