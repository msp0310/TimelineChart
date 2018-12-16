import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import minify from 'rollup-plugin-babel-minify'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'

const banner = `/*!
 * Timeline.js v${pkg.version}
 *
 * (c) ${new Date().getFullYear()} Sawada Makoto.
 * Released under the MIT License
 */`;

export default {
  entry: 'src/timeline-chart.js',
  dest: 'dist/TimelineChart.js',
  format: 'umd',
  moduleName: 'TimelineChart',
  banner: banner,
  plugins: [
    minify({
      comments: false
    }),
    nodeResolve({
      jsNext: true
    }),
    commonjs(),
    babel()
  ]
}