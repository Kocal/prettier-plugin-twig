"use strict";

const options = require("./options");

const languages = [];

const parsers = {};

const printers = {};

module.exports = {
  languages,
  parsers,
  printers,
  options,
  defaultOptions: {
    tabWidth: 4
  }
};
