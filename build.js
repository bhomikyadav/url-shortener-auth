const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/app.js"],

  bundle: true,

  platform: "node",

  target: "node22",

  format: "cjs",

  outfile: "dist/app.js",

  minify: true,

  sourcemap: true,

  external: [
    "express",
    "env-cmd"
  ]
}).catch(() => process.exit(1));