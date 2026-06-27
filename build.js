const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/app.ts"],
    outfile: "dist/app.js",
    bundle: true,
    platform: "node",
    target: "node22",
    format: "cjs",
    packages: "external",
    sourcemap: true,
    minify: false,
  })
  .catch(() => process.exit(1));
