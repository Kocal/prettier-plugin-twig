"use strict";

const parse = require("./parser");
const print = require("./printer");
const options = require("./options");

function createLanguage(linguistData, { extend, override }) {
  const language = {};

  for (const key in linguistData) {
    const newKey = key === "languageId" ? "linguistLanguageId" : key;
    language[newKey] = linguistData[key];
  }

  if (extend) {
    for (const key in extend) {
      language[key] = (language[key] || []).concat(extend[key]);
    }
  }

  for (const key in override) {
    language[key] = override[key];
  }

  return language;
}

const languages = [
  createLanguage(require("linguist-languages/data/twig"), {
    override: {
      parsers: ["twig"]
    }
  })
];

const loc = prop => node => {
  return node.loc && node.loc[prop] && node.loc[prop].offset;
};

const parsers = {
  twig: {
    parse,
    astFormat: "twig",
    locStart: loc("start"),
    locEnd: loc("end")
  }
};

const printers = {
  twig: {
    print
  }
};

module.exports = {
  languages,
  parsers,
  printers,
  options,
  defaultOptions: {
    tabWidth: 4
  }
};
