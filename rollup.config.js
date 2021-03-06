import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import pkg from './package.json'

const banner = `/*!
 * Timeline.js v${pkg.version }
 *
 * (c) ${new Date().getFullYear() } Sawada Makoto.
 * Released under the MIT License
 */`;

export default {
  entry: 'src/TimelineChart.ts',
  dest: 'dist/TimelineChart.js',
  format: 'umd',
  moduleName: 'TimelineChart',
  banner: banner,
  plugins: [
    typescript(),
    nodeResolve({
      jsNext: true
    }),
    commonjs(),
    babel()
  ]
}
