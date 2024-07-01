import { defineConfig, Options } from 'tsup';

export default defineConfig((options: Options) => ({
    treeshake: true,
    splitting: true,
    dts: true,
    minify: true,
    clean: true,
    external: ['react'],
    entry: ['index.ts'],
    format: ['cjs', 'esm'],
    ...options,
}));
