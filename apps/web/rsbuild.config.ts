import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { internalIpV4 } from 'internal-ip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM || '');

export default defineConfig({
    plugins: [pluginReact(), pluginSass()],
    html: {
        template: './index.html',
    },
    source: {
        decorators: {
            version: 'legacy',
        },
    },

    server: {
        port: 1420,
        strictPort: true,
        // host: mobile ? '0.0.0.0' : false,
    },
    dev: {
        hmr: true,
        client: mobile
            ? {
                  protocol: 'ws',
                  host: await internalIpV4(),
                  port: 1421,
              }
            : undefined,
    },
    resolve: {
        alias: {
            '@': '/src',
            '@vines/ui': path.resolve(__dirname, '../../packages/ui/src'),
        },
    },
    tools: {},
});
