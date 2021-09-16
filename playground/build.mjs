import { promisify } from "util";
import { exec as _exec } from "child_process";
import { chdir, cwd, exit } from "process";
import { mkdir, copyFile, rm, readdir } from "fs/promises";

const exec = promisify(_exec);

// /packages/ => /playground/packages/
async function buildPackages() {
  const packages = ["action", "core", "process"];

  await Promise.all([
    exec("cd action && pnpm i && pnpm build"),
    exec("cd core && pnpm i && pnpm build"),
    exec("cd process && pnpm i && pnpm build"),
  ]);

  /** @type {Array<Promise<void>>} */
  const processes = [];
  for (const dir of packages) {
    const outputDir = `../playground/packages/${dir}`;
    await mkdir(outputDir, { recursive: true });
    processes.push(copyFile(`${dir}/dist/es.js`, `${outputDir}/mod.js`));
  }

  await Promise.all(processes);
}

// /san/playground/** => /playground/packages/playground/san-components/**
async function buildSanComponents() {
  await exec("npm i && npm run build");
  await exec("cd playground && npm i && npm run build -- --mode development");
  const outputDir = "../playground/packages/playground/san-components";
  await mkdir(outputDir, { recursive: true });
  const files = await readdir("./playground/dist");
  /** @type {Array<Promise<void>>} */
  const processes = [];
  for (const f of files) {
    processes.push(copyFile(`./playground/dist/${f}`, `${outputDir}/${f}`));
  }
  await Promise.all(processes);
}

// /svelte/playground/** => /playground/packages/playground/svelte-components/**
async function buildSvelteComponents() {
  await exec("pnpm i && pnpm build");
}

if (!cwd().endsWith("atomic-class/playground")) {
  console.error("Please cd playground/ first!");
  exit(1);
}

await rm("./packages", { recursive: true, force: true });
chdir("../packages");
await buildPackages();
chdir("../san");
await buildSanComponents();
chdir("../svelte");
await buildSvelteComponents();
