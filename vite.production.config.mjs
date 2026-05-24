import {mergeConfig} from 'vite';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import common from './vite.common.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const r = (p) => path.resolve(__dirname, p);

export default mergeConfig(common, {
    mode: 'production',
    base: '/',
    publicDir: r('resources/template'),
    build: {
        outDir: r('public'),
        emptyOutDir: true,
        manifest: false,
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/js/[name].[hash]-chunk.js',
                entryFileNames: 'assets/js/[name].[hash].js',
                assetFileNames: 'assets/[ext]/[name].[hash][extname]',
            },
        },
    },
    // vite-ssg 設定
    ssgOptions: {
        script: 'async',
        formatting: 'minify',
        // 顯式列出所有要 prerender 的 routes：首頁 + 404 + 所有 /cases/:id
        async includedRoutes() {
            const {cases} = await import('./resources/js/data/cases.js');
            return [
                '/',
                '/404',
                ...cases.map((c) => `/cases/${c.id}`),
            ];
        },
        // SSR 時 mock 一些 client-only globals（雙保險）
        mock: true,
    },
});
