import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import {terser} from 'rollup-plugin-terser';
import tildeImporter from 'node-sass-tilde-importer';
import scss from 'rollup-plugin-scss';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import ac from '../rollup/index';
const svelteConfig = require('../svelte.config');

const production = !process.env.ROLLUP_WATCH;

function serve() {
    let server;

    function toExit() {
        if (server) {
            server.kill(0);
        }
    }

    return {
        writeBundle() {
            if (server) {
                return;
            }
            server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true,
            });

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        },
    };
}

export default {
    input: 'demo/index.ts',
    output: {
        sourcemap: true,
        format: 'es',
        name: 'app',
        file: '../playground/static/packages/playground/svelte-components/mod.js',
    },
    plugins: [
        ac({
            target: 'tailwind', // less, sass, tailwind
        }),
        svelte(svelteConfig),
        // we'll extract any component CSS out into
        // a separate file - better for performance
        // css({output: 'bundle.css'}),
        scss({
            include: ['/**/*.css', '/**/*.scss', '/**/*.sass'],
            importer: tildeImporter,
            // output: `bundle.css`,
            // outputStyle: production ? 'compressed' : 'compact',
            // watch: './src/styles',
        }),
      

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),
        typescript({
            tsconfig: production ? './tsconfig.svelte.prod.json' : './tsconfig.svelte.json',
            sourceMap: !production,
            inlineSources: !production,
        }),
        commonjs(),
        copy({
            targets: [
                { src: 'demo/assets/**/*', dest: '../playground/static/packages/playground/svelte-components/assets' }
            ]
        }),
        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),
    ],
    watch: {
        clearScreen: false,
    },
};