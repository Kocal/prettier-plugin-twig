export const formatMarkdown = (
  inputCode,
  outputCode,
  version,
  cliOptions,
  url
) => {
  const optionsString = formatCLIOptions(cliOptions);

  return [
    `**Prettier ${version}**`,
    `[Playground link](${url})`,
    optionsString === "" ? null : codeBlock(optionsString, "sh"),
    "",
    "**Input code:**",
    codeBlock(inputCode, "twig"),
    "",
    "**Output code:**",
    codeBlock(outputCode, "twig"),
    "**Expected behavior:**"
  ].join("\n");
};

function formatCLIOptions(cliOptions) {
  return cliOptions
    .map(option => {
      const name = option[0];
      const value = option[1];
      return value === true ? name : `${name} ${value}`;
    })
    .join("\n");
}

function codeBlock(code, lang) {
  return ["```", lang || "", "\n", code, "\n", "```"].join("");
}
