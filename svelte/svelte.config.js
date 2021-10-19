const sveltePreprocess = require('svelte-preprocess');
// import adapter from '@sveltejs/adapter-static';
const { env } = require('process');

const isDev = env.NODE_ENV === 'development';
const production = !process.env.ROLLUP_WATCH;


const preprocess = sveltePreprocess({
    sourceMap: !production,
    sass: true,
    defaults: {
        style: 'scss',
    },
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')()],
    },
});

const config = {
	preprocess: preprocess
};

module.exports = config;
