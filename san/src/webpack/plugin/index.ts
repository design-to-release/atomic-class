import type { Compiler, WebpackPluginInstance } from 'webpack';
import type { PluginConfig } from './config';
import type { PartialOrRequired, RL } from './utility-types';

import { parse } from 'postcss';
import { resolve as resolveConfig } from './config';
import { merge as mergeStyleSheets } from './css';

const PluginName = 'ac-san-webpack-plugin';
export const PluginSymbol = Symbol(PluginName);

export default class implements WebpackPluginInstance {
  #cfg: Required<PartialOrRequired<PluginConfig, RL>>;

  get cssCfg() {
    return this.#cfg.css;
  }

  constructor(cfg: PluginConfig) {
    this.#cfg = resolveConfig(cfg);
  }

  apply(compiler: Compiler) {
    const normalModule = compiler.webpack.NormalModule;
    const adoptedClasses = new Set<string>();

    const cssContentFuture = mergeStyleSheets(compiler.context, this.cssCfg.paths);

    compiler.hooks.thisCompilation.tap(PluginName, async compilation => {
      const normalModuleLoader = normalModule.getCompilationHooks(compilation).loader;
      normalModuleLoader.tap(PluginName, loaderContext => {
        loaderContext[PluginSymbol] = { adoptedClasses };
      });

      let cssContent = await cssContentFuture;
      compilation.hooks.renderManifest.tap(PluginName, (result, { chunk }) => {
        if (this.#cfg.css.treeShaking) {
          const ast = parse(cssContent);
          ast.walkRules(rule => {
            if (rule.selector[0] === '.' && !adoptedClasses.has(rule.selector.slice(1))) {
              rule.remove();
            }
          });

          cssContent = ast.toString();
        }
        const { ConcatSource } = compiler.webpack.sources;
        const source = new ConcatSource(cssContent);
        result.push({
          render: () => source,
          filenameTemplate: '[name].css',
          pathOptions: {
            chunk,
          },
          identifier: `${PluginName}.${chunk.id}`,
        });

        return result;
      });
    });
  }
}
