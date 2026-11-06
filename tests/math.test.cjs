const { test } = require('node:test');
const assert = require('node:assert/strict');
test('scientific calculator and graph expressions run under CSP without eval', async () => {
  const { evaluateExpression: evaluate } = await import('../modules/math.mjs');
  for (const [input, expected] of [['2+3*4',14], ['2^3^2',512], ['-2^2',-4], ['2^-2',0.25], ['2x+1',7], ['2(x+1)',8], ['sin(pi/2)',1], ['abs(-4)+sqrt(9)',7], ['1e3+2',1002], ['log10(100)',2]]) assert.equal(evaluate(input,3),expected,input);
  for (const input of ['alert(1)', 'window.location', '2+(3', '2+3)', '1/0', 'NaN', '2;alert(1)', 'constructor(1)', '']) assert.ok(Number.isNaN(evaluate(input)),input);
});
