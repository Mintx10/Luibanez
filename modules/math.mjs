const functions = { sin: Math.sin, cos: Math.cos, tan: Math.tan, sqrt: Math.sqrt, abs: Math.abs, exp: Math.exp, ln: Math.log, log: Math.log10, log10: Math.log10 };
export function evaluateExpression(expression, x = 0) {
  try {
    if (typeof expression !== 'string' || !expression.trim() || expression.length > 2000) return NaN;
    const source = expression.toLowerCase().replaceAll('math.', '').replaceAll('**', '^').replaceAll('×', '*').replaceAll('÷', '/').replaceAll('π', 'pi');
    const tokens = []; let cursor = 0;
    const tokenPattern = /\s*(?:(\d+(?:\.\d*)?(?:e[+-]?\d+)?|\.\d+(?:e[+-]?\d+)?)|(log10|sqrt|sin|cos|tan|exp|abs|log|ln|pi|e|x)|([+\-*/%^()]))/y;
    while (cursor < source.length) {
      if (!source.slice(cursor).trim()) break;
      tokenPattern.lastIndex = cursor; const match = tokenPattern.exec(source);
      if (!match) return NaN;
      tokens.push(match[1] ? { number: Number(match[1]) } : match[2] || match[3]); cursor = tokenPattern.lastIndex;
      if (tokens.length > 500) return NaN;
    }
    let pos = 0;
    const peek = () => tokens[pos];
    function primary() {
      const token = tokens[pos++];
      if (token && typeof token === 'object') return token.number;
      if (token === '(') { const value = sum(); if (tokens[pos++] !== ')') throw Error(); return value; }
      if (token === 'x') return Number(x);
      if (token === 'pi') return Math.PI;
      if (token === 'e') return Math.E;
      if (Object.hasOwn(functions, token)) {
        if (tokens[pos++] !== '(') throw Error();
        const value = sum(); if (tokens[pos++] !== ')') throw Error(); return functions[token](value);
      }
      throw Error();
    }
    function power() { const base = primary(); if (peek() === '^') { pos++; return base ** unary(); } return base; }
    function unary() { if (peek() === '-') { pos++; return -unary(); } if (peek() === '+') { pos++; return unary(); } return power(); }
    function product() {
      let value = unary();
      while (pos < tokens.length) {
        const token = peek();
        if (['*', '/', '%'].includes(token)) { pos++; const next = unary(); value = token === '*' ? value * next : token === '/' ? value / next : value % next; }
        else if (typeof token === 'object' || token === '(' || Object.hasOwn(functions, token) || ['x', 'pi', 'e'].includes(token)) value *= unary();
        else break;
      }
      return value;
    }
    function sum() { let value = product(); while (peek() === '+' || peek() === '-') { const op = tokens[pos++], next = product(); value = op === '+' ? value + next : value - next; } return value; }
    const value = sum();
    return pos === tokens.length && Number.isFinite(value) ? value : NaN;
  } catch { return NaN; }
}
