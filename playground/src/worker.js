// Inspired from https://github.com/prettier/prettier/blob/master/website/playground/WorkerApi.js

const worker = new Worker("./worker.js");

let counter = 0;
let handlers = {};

worker.onmessage = event => {
  const { uid, message, error } = event.data;
  if (!handlers[uid]) {
    return;
  }

  const { resolve, reject } = handlers[uid];
  delete handlers[uid];

  if (error) {
    reject(error);
  } else {
    resolve(message);
  }
};

export const postMessage = (message) => {
  const uid = ++counter;
  return new Promise((resolve, reject) => {
    handlers[uid] = { resolve, reject };
    worker.postMessage({ uid, message });
  });
};

export const getMetadata = () => {
  return postMessage({ type: "meta" });
};

export const prettify = (code, options) => {
  return postMessage({ type: "format", code, options });
};
