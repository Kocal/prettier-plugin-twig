const { Lexer: TwigLexer, TokenType } = require("twig-lexer");
const { TokenStream } = require("@/lib/token-stream");

describe("TokenStream", () => {
  const lexer = new TwigLexer();

  test("next()", () => {
    const tokens = lexer.tokenize("{{foo}}");
    const stream = new TokenStream(tokens);

    expect(stream.next()).toBe(tokens[0]);
    expect(stream.next()).toBe(tokens[1]);
    expect(stream.next()).toBe(tokens[2]);

    expect(() => {
      stream.next();
    }).toThrow("Unexpected end of template.");
  });

  test("nextIf()", () => {
    const tokens = lexer.tokenize("{{foo}}");
    const stream = new TokenStream(tokens);

    expect(stream.nextIf(TokenType.VARIABLE_START)).toBe(tokens[0]);
    expect(stream.nextIf(TokenType.NAME)).toBe(tokens[1]);
    expect(stream.nextIf(TokenType.VARIABLE_END)).toBe(tokens[2]);

    // returns `null` because normally it's a EOF token
    expect(stream.nextIf(TokenType.LINE_TRIMMING_MODIFIER)).toBeNull();
  });

  test("lookup()", () => {
    const tokens = lexer.tokenize("{{foo}}");
    const stream = new TokenStream(tokens);

    expect(stream.look(0)).toBe(tokens[0]);
    expect(stream.look(0)).toBe(stream.getCurrent());
    expect(stream.look()).toBe(tokens[1]);
    expect(stream.look(2)).toBe(tokens[2]);

    stream.next();
    expect(stream.look(0)).toBe(tokens[1]);
    expect(stream.look(0)).toBe(stream.getCurrent());
    expect(stream.look()).toBe(tokens[2]);
    expect(stream.look(2)).toBe(tokens[3]);
  });

  test("test()", () => {
    const tokens = lexer.tokenize("{{foo}}");
    const stream = new TokenStream(tokens);

    expect(stream.test(TokenType.VARIABLE_START)).toBeTruthy();

    stream.next();
    expect(stream.test(TokenType.NAME)).toBeTruthy();

    stream.next();
    expect(stream.test(TokenType.VARIABLE_END)).toBeTruthy();
  })
});
