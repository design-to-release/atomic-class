#!/usr/bin/env node

import { join } from 'path';
import { cwd } from 'process';
import { existsSync } from 'fs';
import { copyFile, mkdir } from 'fs/promises';

const files = ['package.json', 'package-lock.json'];
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