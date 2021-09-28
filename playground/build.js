import { promisify } from 'util';
import { exec as _exec } from 'child_process';
import { chdir, cwd, exit } from 'process';
import { mkdir, copyFile, rm, readdir } from 'fs/promises';

const exec = promisify(_exec);
let install_cmd = 'pnpm i';

// /packages/ => /playground/static/packages/
async function buildPackages() {
	const packages = ['action', 'core', 'process'];

	await Promise.all([
		exec(`cd action && ${install_cmd} && pnpm build`),
		exec(`cd core && ${install_cmd} && pnpm build`),
		exec(`cd process && ${install_cmd} && pnpm build`)
	]);

	/** @type {Array<Promise<void>>} */
	const processes = [];
	for (const dir of packages) {
		const outputDir = `../playground/static/packages/${dir}`;
		await mkdir(outputDir, { recursive: true });
		processes.push(copyFile(`${dir}/dist/es.js`, `${outputDir}/mod.js`));
	}

	await Promise.all(processes);
}

// /san/playground/** => /playground/static/packages/playground/san-components/**
async function buildSanComponents() {
	await exec(`${install_cmd} && npm run build`);
	await exec(`cd playground && ${install_cmd} && npm run build -- --mode development`);
	const outputDir = '../playground/static/packages/playground/san-components';
	await mkdir(outputDir, { recursive: true });
	const files = await readdir('./playground/dist');
	/** @type {Array<Promise<void>>} */
	const processes = [];
	for (const f of files) {
		processes.push(copyFile(`./playground/dist/${f}`, `${outputDir}/${f}`));
	}
	await Promise.all(processes);
}

// /svelte/playground/** => /playground/static/packages/playground/svelte-components/**
async function buildSvelteComponents() {
	await exec(`${install_cmd} && pnpm build`);
}

if (!cwd().endsWith('/playground')) {
	console.error('Please cd playground/ first!');
	exit(1);
}

const argv = process.argv;
if (process.argv.indexOf('--help') > -1) {
	console.log(`
    --di  disable install Dependices
    --dp  disable build Packages
    --dc  disable build Components
  `);
	process.exit();
}

if (argv.indexOf('--di') > -1) {
	install_cmd = 'echo ""';
}
if (argv.indexOf('--dp') == -1) {
	// await rm("./static/packages/action", { recursive: true, force: true });
	// await rm("./static/packages/core", { recursive: true, force: true });
	// await rm("./static/packages/process", { recursive: true, force: true });
	// chdir("../packages");
	// await buildPackages();
}
if (argv.indexOf('--dc') == -1) {
	await rm('./static/packages/playground', { recursive: true, force: true });
	chdir('../san');
	await buildSanComponents();
	chdir('../svelte');
	await buildSvelteComponents();
}
