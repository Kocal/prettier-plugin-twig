export const prettify = (code, options) => {
  if (!code) {
    return "";
  }

  try {
    return global.prettier.format(code, {
      plugins: global.prettierPlugins,
      parser: "twig",
      ...options
    });
  } catch (e) {
    return typeof e === "string" ? e : e.message;
  }
};
