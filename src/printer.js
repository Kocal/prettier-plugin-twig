const { TwingNode, TwingNodeType, TwingNodeExpressionHash, TwingNodeExpressionName, TwingNodeExpressionGetAttr } = require("twing");
const { indent, join, line, softline, hardline, concat, group, ifBreak } = require("prettier").doc.builders;
const util = require("./_util-from-prettier");

// The root, in fact that's not really a node, but it contains references to blocks, macros, ...
let nodeModule;
let options;

function indentConcat(docs) {
  return indent(concat(docs));
}

function groupConcat(docs) {
  return group(concat(docs));
}

function printString(rawContent, options) {
  const double = {
    quote: "\"",
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
 * @param {TwingNode} node
 * @param {String} openDoc
 * @param {TwingNode[]} elements
 * @param {String} closeDoc
 */
function printArrayLike(node, openDoc, elements, closeDoc) {
  return groupConcat([
    openDoc,
    indentConcat([
      softline,
      join(concat([",", line]), elements)
    ]),
    softline,
    closeDoc
  ]);
}

function extractArrayLikeItems(node, isHash) {
  const items = [];
  for (let i = 0; i < node.getNodes().size; i += 2) {
    const keyNode = node.getNode(i);
    const valueNode = node.getNode(i + 1);

    if (isHash) {
      const keyName = keyNode instanceof TwingNodeExpressionName
        ? concat(["(", keyNode.getAttribute("name"), ")"])
        : keyNode.getAttribute("value");

      items.push(
        concat([
          keyName,
          ": ",
          genericPrint(valueNode)
        ])
      );
    } else {
      items.push(genericPrint(valueNode));
    }
  }

  return items;
}

function trimQuotes(stringValue) {
  if (["\"", "'"].includes(stringValue[0])) {
    stringValue = stringValue.substr(1);
  }

  if (["\"", "'"].includes(stringValue[stringValue.length - 1])) {
    stringValue = stringValue.substr(0, stringValue.length - 1);
  }

  return stringValue;
}

/**
 * @param {TwingNode} node
 */
function printEveryNodes(node) {
  return concat(
    [...node.getNodes().values()].map(n => genericPrint(n))
  );
}

/**
 * @param {FastPath|TwingNode} path
 * @param {Object?} opts
 * @return {string}
 */
function genericPrint(path, opts) {
  /** @type {TwingNode|string} */
  let node = path.constructor.name === "FastPath" ? path.getValue() : path;

  if (!node) {
    return "";
  }

  if (typeof node === "number") {
    return String(node);
  }

  if (typeof node === "string") {
    return printString(node, options || opts);
  }

  if (node.getType() === TwingNodeType.MODULE) {
    nodeModule = node;
    options = opts;
    node = nodeModule.getNode("body");
  }

  switch (node.getType()) {
    case null:
    case TwingNodeType.BODY: {
      return printEveryNodes(node);
    }
    case TwingNodeType.SET: {
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
      ).map(n => genericPrint(n));
      // const values = printEveryNodes(node.getNode("values"));

      return join(" ", [
        "{%",
        node.getNodeTag(),
        join(", ", names),
        "=",
        join(", ", values),
        "%}",
        hardline
      ]);
    }
    case TwingNodeType.EXPRESSION_ARRAY: {
      const isHash = node instanceof TwingNodeExpressionHash;
      const openDoc = isHash ? concat(["{", ifBreak(" ", line)]) : "[";
      const closeDoc = isHash ? concat([ifBreak("", line), "}"]) : "]";
      const items = extractArrayLikeItems(node, isHash);

      return printArrayLike(node, openDoc, items, closeDoc);
    }
    case TwingNodeType.EXPRESSION_CONSTANT: {
      const value = node.getAttribute("value");

      if (typeof value === "string") {
        return printString(value, options);
      }

      return String(value);
    }
    case TwingNodeType.EXPRESSION_GET_ATTR: {
      const nodeNode = node.getNode("node");
      const nodeAttribute = node.getNode("attribute");
      const nodeArguments = node.getNode("arguments");

      const keyValue = genericPrint(nodeNode);
      const type = node.getAttribute("type");
      const value = trimQuotes(genericPrint(nodeAttribute));

      const parameters = nodeArguments.getNodes().size === 0
        ? ""
        : printArrayLike(nodeArguments, "(", extractArrayLikeItems(nodeArguments), ")");

      if (type === "array") {
        return concat([keyValue, "[", value, "]"]);
      }

      return concat([keyValue, ".", value, parameters]);
    }
    case TwingNodeType.EXPRESSION_NAME: {
      return node.getAttribute("name");
    }
    case TwingNodeType.PRINT: {
      return join(" ", [
        "{{",
        printEveryNodes(node),
        "}}"
      ]);
    }
    case TwingNodeType.TEXT:
      return node.getAttribute("data");
    default:
      throw new Error(`Impossible to prettify a node of type "${node.getType()}". Please open an issue on https://github.com/Kocal/prettier-plugin-twig.`);
  }

  return "";
}

module.exports = genericPrint;
