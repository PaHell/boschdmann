import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import tailwindCss from 'tailwindcss';
import postCssNesting from 'postcss-nesting';
import autoprefixer from 'autoprefixer';

const production = process.env.NODE_ENV !== 'debug';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		sourceMap: !production,
		postcss: {
			plugins: [postCssNesting, tailwindCss, autoprefixer]
		}
	}),

	kit: {
		adapter: adapter({ out: './build' }),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		}
	}
};

export default config;
