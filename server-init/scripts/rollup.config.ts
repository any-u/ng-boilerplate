import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { defineConfig, InputPluginOption } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import dynamicImportPlugin from './dynamicImportPlugin';

const plugins: InputPluginOption = [
  esbuild(),
  nodeResolve(),
  commonjs(),
  json(),
  terser({ format: { comments: false } }),
  dynamicImportPlugin({
    include: 'src/routes/index.ts',
  })
]

export default defineConfig({
  input: 'src/index.ts',
  output: {
    file: `dist/index.js`,
    format: 'cjs'
  },
  external: [
    /node_modules/
  ],
  plugins,
})