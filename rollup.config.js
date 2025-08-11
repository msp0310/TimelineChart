import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { readFileSync } from "fs";
const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf-8")
);

const banner = `/*!\n * TimelineChart v${
  pkg.version
}\n * (c) ${new Date().getFullYear()} Sawada Makoto.\n * Released under the MIT License\n */`;

export default {
  input: "src/TimelineChart.ts",
  output: {
    file: "dist/TimelineChart.js",
    format: "umd",
    name: "TimelineChart",
    banner,
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
  ],
};
