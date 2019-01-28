/**
 * @fileoverview Disallow iterating over an array with a for-in loop
 * @author Benjamin Lichtman
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-for-in-array'),
  RuleTester = require('eslint').RuleTester,
  path = require('path');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

// RuleTester.it = function(text, method) {
//     return method.call({ break: true });
// };

const rootDir = path.join(process.cwd(), 'tests/fixtures/');
const parserOptions = {
  ecmaVersion: 2015,
  tsconfigRootDir: rootDir,
  project: './tsconfig.json'
};
const ruleTester = new RuleTester({
  parserOptions,
  parser: '@typescript-eslint/parser'
});
const message =
  'For-in loops over arrays are forbidden. Use for-of or array.forEach instead.';

ruleTester.run('no-for-in-array', rule, {
  valid: [
    `
for (const x of [3, 4, 5]) {
    console.log(x);
}`,
    `
for (const x in { a: 1, b: 2, c: 3 }) {
    console.log(x);
}`
  ],

  invalid: [
    {
      code: `
for (const x in [3, 4, 5]) {
    console.log(x);
}`,
      errors: [
        {
          message,
          type: 'ForInStatement'
        }
      ]
    },
    {
      code: `
const z = [3, 4, 5];
for (const x in z) {
    console.log(x);
}`,
      errors: [
        {
          message,
          type: 'ForInStatement'
        }
      ]
    }
  ]
});
