const { Token, TokenType, SyntaxError, typeToString } = require("twig-lexer");

class TokenStream {
  /**
   * @param {Token[]} tokens
   */
  constructor(tokens) {
    this.tokens = tokens;
    this.current = 0;
  }

  /**
   * @return {Token}
   */
  next() {
    this.current++;

    if (this.current >= this.tokens.length) {
      const token = this.tokens[this.current - 1];

      throw new SyntaxError("Unexpected end of template.", token.getLine(), token.getColumn());
    }

    return this.tokens[this.current - 1];
  }

  /**
   * @param {TokenType} type
   * @param {String|String[]|Number} value
   * @return {Token|null}
   */
  nextIf(type, value) {
    if (this.tokens[this.current].test(type, value)) {
      return this.next();
    }

    return null;
  }

  /**
   * @param {TokenType} type
   * @param {String|String[]|Number} value
   * @return {Token}
   */
  expect(type, value = null, message = null) {
    const token = this.tokens[this.current];

    if (!token.test(type, value)) {
      const line = token.getLine();
      const column = token.getColumn();

      throw new SyntaxError(`${message ? message + ". " : ""}Unexpected token "${typeToString(token.getType())}" of value "${token.getValue()}" ("${typeToString(type)}" expected${value ? ` with value "${value}"` : ""}).`, line, column);
    }

    this.next();

    return token;
  }

  /**
   * Looks at the next token.
   *
   * @param number {number}
   * @return Token
   */
  look(number = 1) {
    const index = this.current + number;

    if (index >= this.tokens.length) {
      const token = this.tokens[this.current + number - 1];

      throw new SyntaxError("Unexpected end of template.", token.getLine(), token.getColumn());
    }

    return this.tokens[index];
  }

  /**
   * Tests the active token.
   *
   * @param {TokenType} type
   * @param {String|String[]|Number} value
   * @return {boolean}
   */
  test(type, value = null) {
    return this.tokens[this.current].test(type, value);
  }

  /**
   * Checks if end of stream was reached.
   *
   * @return bool
   */
  isEOF() {
    return this.tokens[this.current].getType() === TokenType.EOF;
  }

  /**
   * @return Token
   */
  getCurrent() {
    return this.tokens[this.current];
  }
};

exports.TokenStream = TokenStream;
