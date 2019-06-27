const { Lexer: TwigLexer } = require("twig-lexer");

function parse(text, parsers, opts) {
  const lexer = new TwigLexer();
  const tokens = lexer.tokenize(text);

  return tokens;
}

module.exports = parse;
