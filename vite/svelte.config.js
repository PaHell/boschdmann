import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import tailwindCss from 'tailwindcss';
import postCssNesting from 'postcss-nesting';
import autoprefixer from 'autoprefixer';

const production = process.env.NODE_ENV !== 'debug';

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess({
		sourceMap: !production,
		postcss: {
			plugins: [postCssNesting, tailwindCss, autoprefixer]
		}
	}),
  adapter: adapter({
    // default options are shown
    pages: 'build',
    assets: 'build',
    fallback: null,
    precompress: false
  }),
}
