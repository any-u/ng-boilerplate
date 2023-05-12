import { defineConfig, InputPluginOption, ExternalOption } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'

const input = 'src/index.ts'

const plugins: InputPluginOption = [
  esbuild(),
  nodeResolve(),
  commonjs(),
]

const external: ExternalOption = [
  "puppeteer"
]

export default defineConfig([{
  input,
  output: {
    file: `dist/index.mjs`,
    format: 'es'
  },
  plugins,
  external
}, {
  input,
  output: {
    file: 'dist/index.d.ts',
    format: 'es'
  },
  plugins: [
    ...plugins,
    dts()
  ],
  external
}])