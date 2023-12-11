import type { FilterPattern } from '@rollup/pluginutils';
import { createFilter } from '@rollup/pluginutils';
import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'rollup';

export interface RollupDynamicImportOptions {
  /**
   * A picomatch pattern, or array of patterns, which specifies the files in the build the plugin
   * should operate on.
   * By default all files are targeted.
   */
  include?: FilterPattern;
  /**
    * A picomatch pattern, or array of patterns, which specifies the files in the build the plugin
    * should _ignore_.
    * By default no files are ignored.
    */
  exclude?: FilterPattern;
}

export function dynamicImport(options: RollupDynamicImportOptions = {}): Plugin {
  const filter = createFilter(options.include, options.exclude);
  return {
    name: 'dynamic-import-plugin',
    transform(code, id) {
      if (!filter(id)) {
        return null
      }
      const dir = path.dirname(id)
      const modules = fs.readdirSync(dir).filter(item => !item.includes('index.'))

      const generatedCode =
        `${modules.reduce((acc, curr) => {
          const name = curr.split('.')[0]
          return acc + `import ${name + 'Router'} from './${curr}'\n`
        }, '')}
        export default function registerRouter(app) {
          ${modules.reduce((acc, curr) => {
          const name = curr.split('.')[0]
          return acc + `app.use(${name + 'Router'}.routes()).use(${name + 'Router'}.allowedMethods())\n`
        }, '')}
        }
        `
      return {
        code: generatedCode,
        map: null
      }
    }
  }
}

export default dynamicImport