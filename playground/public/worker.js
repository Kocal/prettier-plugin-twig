importScripts(
  "https://unpkg.com/prettier/standalone.js",
  "https://cdn.jsdelivr.net/npm/twing/dist/lib.min.js",
  "./prettier-plugin-twig.js"
);

self.onmessage = function(event) {
  self.postMessage({
    uid: event.data.uid,
    message: handleMessage(event.data.message)
  });
};

function handleMessage(message) {
  if (message.type === "meta") {
    return {
      type: "meta",
      supportInfo: JSON.parse(JSON.stringify(prettier.getSupportInfo(null))),
      version: prettier.version
    };
  }

  if (message.type === "format") {
    var options = message.options || {};

    options.plugins = prettierPlugins;
    options.parser = "twig";

    var response = {
      formatted: formatCode(message.code, options)
    };

    return response;
  }
}

function formatCode(text, options) {
  try {
    return prettier.format(text, options);
  } catch (e) {
    return typeof e === "string" ? e : e.message;
  }
}
