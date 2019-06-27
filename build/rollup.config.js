import { resolve } from "path";
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import replace from "rollup-plugin-replace";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

const SRC_DIR = resolve(__dirname, "..", "src");
const BUILD_DIR = resolve(__dirname, "..", "build");

export default {
  input: resolve(SRC_DIR, "index.js"),
  output: {
    file: "standalone.js",
    format: "umd",
    name: "prettierPlugins.twig",
    exports: "named",
    globals: {
      prettier: "prettier",
    },
    paths: {
      prettier: "prettier/standalone"
    }
  },
  external: ["prettier"],
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    replace({
      "process.arch": JSON.stringify("x32")
    }),
    babel({
      babelrc: false,
      plugins: [],
      compact: false,
      presets: [
        [
          require.resolve("@babel/preset-env"),
          {
            targets: { browsers: [">0.25%", "not ie 11", "not op_mini all"] },
            modules: false
          }
        ]
      ]
    }),
    terser()
  ]
};
