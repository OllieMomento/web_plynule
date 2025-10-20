import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// SPA mód: nevyrábí se HTML pro každou stránku, vše řeší index.html
		adapter: adapter({
			fallback: 'index.html', // důležité pro SPA
			strict: false           // neřeší "dynamické" routy při buildu
		}),
		prerender: { entries: [] } // řekni SvelteKitu, ať nic necrawlí/prerenderuje
		// Pokud web poběží v podadresáři:
		// paths: { base: '/NAZEV' }
	}
};

export default config;