import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({ fallback: 'index.html', strict: false }),
		prerender: { entries: [] },
		//paths: { base: '/new' }  // jen pokud nasazuješ do podadresáře
	}
};
export default config;