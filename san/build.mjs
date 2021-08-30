#!/usr/bin/env node

import { copyFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

const files = ['package.json'];
const outDir = join(cwd(), './dist');

if (!existsSync(outDir)) {
  await mkdir(outDir);
}

/** @type {Array<Promise<void>>} */
const tasks = [];

for (const i of files) {
  tasks.push(copyFile(join(cwd(), i), join(outDir, i)));
}

await Promise.all(tasks);
