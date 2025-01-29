import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		workspace: [
			{
				extends: true,
				test: {
					name: 'unit',
					include: ['**/*.spec.ts'],
					exclude: ['src/http/controllers/**/*.spec.ts'],
				},
			},
			{
				extends: true,
				test: {
					name: 'e2e',
					include: ['src/http/controllers/**/*.spec.ts'],
					environment: './vitest-environments/prisma.ts',
				},
			},
		],
	},
});
