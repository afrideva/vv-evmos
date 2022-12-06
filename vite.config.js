// https://vitejs.dev/config/
import { defineConfig } from "vite";
// import prefresh from "@prefresh/vite";
import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
// You don't need to add this to deps, it's included by @esbuild-plugins/node-modules-polyfill
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import commonjs from "vite-plugin-commonjs";
const inject = require('@rollup/plugin-inject')
import { visualizer } from "rollup-plugin-visualizer";
let baseConfig = {
  plugins: [svgr(),react()],
  define: {},
  esbuild: {
    // target:['es2020'],
    // jsxFactory: "h",
    // jsxFragment: "Fragment",
    // jsxInject: `import { h, Fragment } from 'preact'`,
  },
  // alias: {
  //   react: "preact/compat",
  // },
  resolve: {
    alias: {
//       react: "preact/compat",
// "react-dom/test-utils": "preact/test-utils",
// "react-dom": "preact/compat",     // Must be below test-utils
// "react/jsx-runtime": "preact/jsx-runtime",
      "@soar": path.resolve(__dirname, "./src/app"),
      "@": path.resolve(__dirname, "./src"),

      // util: "rollup-plugin-node-polyfills/polyfills/util",
      // sys: "util",
      // stream: "rollup-plugin-node-polyfills/polyfills/stream",
      // // buffer: "rollup-plugin-node-polyfills/polyfills/buffer",
      // path: "rollup-plugin-node-polyfills/polyfills/path",
      // querystring: "rollup-plugin-node-polyfills/polyfills/qs",
      // punycode: "rollup-plugin-node-polyfills/polyfills/punycode",
      // url: "rollup-plugin-node-polyfills/polyfills/url",
      // http: "rollup-plugin-node-polyfills/polyfills/http",
      // https: "rollup-plugin-node-polyfills/polyfills/http",
      // os: "rollup-plugin-node-polyfills/polyfills/os",
      // assert: "rollup-plugin-node-polyfills/polyfills/assert",
      // constants: "rollup-plugin-node-polyfills/polyfills/constants",
      // _stream_duplex:
      //   "rollup-plugin-node-polyfills/polyfills/readable-stream/duplex",
      // _stream_passthrough:
      //   "rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough",
      // _stream_readable:
      //   "rollup-plugin-node-polyfills/polyfills/readable-stream/readable",
      // _stream_writable:
      //   "rollup-plugin-node-polyfills/polyfills/readable-stream/writable",
      // _stream_transform:
      //   "rollup-plugin-node-polyfills/polyfills/readable-stream/transform",
      // timers: "rollup-plugin-node-polyfills/polyfills/timers",
      // console: "rollup-plugin-node-polyfills/polyfills/console",
      // vm: "rollup-plugin-node-polyfills/polyfills/vm",
      // zlib: "rollup-plugin-node-polyfills/polyfills/zlib",
      // tty: "rollup-plugin-node-polyfills/polyfills/tty",
      // domain: "rollup-plugin-node-polyfills/polyfills/domain",
    }, 
  },
  optimizeDeps: {
    exclude: [
      // 'noble-ed25519',
      'noble-secp256k1'
      ],
    esbuildOptions: {
      // target:['es2020'],
      define: {
        global: "globalThis",
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  server: {
    host: "0.0.0.0",
  },
  build: {
    // target:['es2020'],
    commonjsOptions: {
      transformMixedEsModules: true,
      exclude:[
// 'node_modules/noble-ed25519/**',

      ]
    },
    minify: "esbuild",
    rollupOptions: {
      plugins: [visualizer(), rollupNodePolyFill(),inject({ Buffer: ['Buffer', 'Buffer'] })],
    },
  },
};
export default defineConfig(({ command, mode }) => {
  let c = { ...baseConfig };
  if (command === "serve") {
    c.define.process = { env: {} };
    // c.define.exports = { };
    return c;
  } else {
    c.optimizeDeps.esbuildOptions.define.global = {};
    c.define["process.env"] = {};
    return c;
  }
});
