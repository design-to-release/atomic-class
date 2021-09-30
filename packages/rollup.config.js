import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import {terser} from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const format = process.env.format || 'umd';

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
    input: 'index.ts',
    output: {
        sourcemap: true,
        format: format,
        name: 'core',
        file: `dist/${format}.js`,
    },
    plugins: [

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
        }),
        typescript({
            tsconfig: production ? '../tsconfig.json' : '../tsconfig.json',
            sourceMap: !production,
            inlineSources: !production,
        }),
        commonjs(),

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