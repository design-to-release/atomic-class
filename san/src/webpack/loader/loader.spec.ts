import type { LoaderContext } from 'webpack';

import { readFile } from 'fs/promises';
import { join } from 'path';

import { PluginSymbol } from '../plugin';
import loader from './index';

const TestdataDir = join(__dirname, './testdata');

function getLoaderContext(): LoaderContext<{ dbg: boolean }> {
  return { getOptions: () => ({}), [PluginSymbol]: { adoptedClasses: new Set() } } as any;
}

test('Basic', async () => {
  const [source, compiled] = await Promise.all(
    [
      readFile(join(TestdataDir, './button.san')),
      readFile(join(TestdataDir, './button.compiled.san')),
    ],
  );
  const result = await loader.call(getLoaderContext(), source.toString());
  expect(result).toEqual(compiled.toString());
});
