const path = require("path");
const { TwingEnvironment, TwingSource } = require("twing");

const twing = new TwingEnvironment();

function parse(text, parsers, opts) {
  const source = new TwingSource(text, path.basename(opts.filepath), opts.filepath);
  const tokens = twing.tokenize(source);
  const nodeModule = twing.parse(tokens);

  return nodeModule;
}

module.exports = parse;
