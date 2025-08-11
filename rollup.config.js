import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import pkg from './package.json'

const banner = `/*!\n * TimelineChart v${pkg.version }\n * (c) ${new Date().getFullYear()} Sawada Makoto.\n * Released under the MIT License\n */`;

export default {
  input: 'src/TimelineChart.ts',
  output: {
    file: 'dist/TimelineChart.js',
    format: 'umd',
    name: 'TimelineChart',
    banner
  },
  plugins: [
    typescript({
      // TODO: d.ts 出力したい場合は tsconfig で declaration:true & rollup-plugin-dts 等を追加
    }),
    nodeResolve({
      jsNext: true
    }),
    commonjs(),
    babel()
  ]
}
