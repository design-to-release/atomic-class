import type { LoaderContext } from 'webpack';

import { join } from 'path/posix';
import { readFileSync, writeFileSync } from 'fs';
import { PluginSymbol } from '../plugin';
import loader from './index';

function getLoaderContext(): LoaderContext<{ dbg: boolean }> {
  return { getOptions: () => ({}), [PluginSymbol]: { adoptedClasses: new Set() } } as any;
}

const source = readFileSync(join(__dirname, './testdata/button.san')).toString();

loader.call(getLoaderContext(), source).then(res => {
  writeFileSync(join(__dirname, './testdata/button.compiled.san'), res);
});
