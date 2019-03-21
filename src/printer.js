const { TwingNode, TwingNodeType } = require("twing");
const { join, hardline, concat } = require("prettier").doc.builders;
const util = require("./_util-from-prettier");

// The root, in fact that's not really a node, but it contains references to blocks, macros, ...
let nodeModule;

function printString(rawContent, options) {
  const double = {
    quote: '"',
    regex: /"/g
  };
  const single = {
    quote: "'",
    regex: /'/g
  };

  const preferred = options.singleQuote ? single : double;
  const alternate = preferred === single ? double : single;

  let shouldUseAlternateQuote = false;

  // If `rawContent` contains at least one of the quote preferred for enclosing
  // the string, we might want to enclose with the alternate quote instead, to
  // minimize the number of escaped quotes.
  // Also check for the alternate quote, to determine if we're allowed to swap
  // the quotes on a DirectiveLiteral.
  if (rawContent.includes(preferred.quote) || rawContent.includes(alternate.quote)) {
    const numPreferredQuotes = (rawContent.match(preferred.regex) || []).length;
    const numAlternateQuotes = (rawContent.match(alternate.regex) || []).length;

    shouldUseAlternateQuote = numPreferredQuotes > numAlternateQuotes;
  }

  const quote = shouldUseAlternateQuote ? alternate.quote : preferred.quote;

  return util.makeString(rawContent, quote);
}

/**
 * @param {FastPath} path
 * @param {Object} options
 * @param {Function} print
 * @return {string}
 */
function genericPrint(path, options, print) {
  console.log(options.singleQuote)
  /** @type TwingNode */
  let node = path instanceof TwingNode ? path : path.getValue();

  if (!node) {
    return "";
  }

  if (node.getType() === TwingNodeType.MODULE) {
    nodeModule = node;
    node = nodeModule.getNode("body");
  }

  switch (node.getType()) {
    case null:
    case TwingNodeType.BODY: {
      return concat(
        Array.from(node.getNodes().values()).map(n => genericPrint(n, options))
      );
    }
    case TwingNodeType.SET:
      const names = Array.from(
        node
          .getNode("names")
          .getNodes()
          .values()
      ).map(n => n.getAttribute("name"));

      const values = Array.from(
        node
          .getNode("values")
          .getNodes()
          .values()
      ).map(n => {
        switch (n.getType()) {
          case TwingNodeType.EXPRESSION_CONSTANT:
            return printString(n.getAttribute("value"), options);
          default:
            console.log({ n });
            return "XXX";
        }
      });

      console.log({ names, values });

      return join(" ", [
        "{%",
        node.getNodeTag(),
        join(", ", names),
        "=",
        join(", ", values),
        "%}",
        hardline
      ]);
    default:
      return "ok";
  }

  return "";
}

module.exports = genericPrint;
