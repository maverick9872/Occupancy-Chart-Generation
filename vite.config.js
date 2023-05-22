import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { vitePreprocess } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	preprocess: vitePreprocess(),
	optimizeDeps: {
		include: ['materialize-css'],
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "materialize-css/sass/materialize";`,
			},
		},
	},
});
