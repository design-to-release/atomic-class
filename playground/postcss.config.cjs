const tailwindcss = require('tailwindcss');
const nesting = require('tailwindcss/nesting');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const plugins = [nesting, tailwindcss, autoprefixer];

if (!dev) {
	plugins.push(cssnano({ preset: 'default' }));
}

const config = {
	plugins
};

module.exports = config;
