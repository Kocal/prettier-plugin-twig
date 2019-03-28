const path = require("path");
const { TwingEnvironment, TwingSource } = require("twing");

const twing = new TwingEnvironment();

function parse(text, parsers, opts) {
  const filename = opts.filepath ? path.basename(opts.filepath) : null;
  const filepath = opts.filepath ? opts.filepath : null;

  const source = new TwingSource(text, filename, filepath);
  const tokens = twing.tokenize(source);
  const nodeModule = twing.parse(tokens);

  return nodeModule;
}

module.exports = parse;
