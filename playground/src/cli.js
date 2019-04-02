import paramCase from "param-case";

export const toCliArg = (name, inverted) => {
  return `--${(inverted ? "no-" : "")}${paramCase(name)}`;
};

export const buildCliArgs = (options, optionsValues) => {
  const args = [];

  for (const option of options) {
    const value = optionsValues[option.name];

    if (typeof value === "undefined") {
      continue;
    }

    if (option.type === "boolean") {
      if ((value && !option.inverted) || (!value && option.inverted)) {
        args.push([option.cliName, true]);
      }
    } else if (value !== option.default) {
      args.push([option.cliName, value]);
    }
  }

  return args;
};
