import { defineConfig } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { builtinModules } from 'module';

// Set UTC timezone for consistent test results (dateTime tests depend on it)
process.env.TZ = 'UTC';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/shared-helpers',

  plugins: [
    nxViteTsPaths(),
  ],

  build: {
    outDir: '../../dist/libs/shared-helpers',
    reportCompressedSize: true,
    commonjsOptions: { transformMixedEsModules: true },
    lib: {
      entry: 'src/index.ts',
      name: 'shared-helpers',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        ...builtinModules,
        ...builtinModules.map((m) => `node:${m}`),
        /^@aws-sdk\//,
        /^@maxmind\//,
        'dotenv',
        'winston',
        'pg',
        'tedious',
        'tarn',
        'undici',
        'xlsx',
        'date-fns',
        'date-fns-tz',
        'jwt-decode',
      ],
    },
  },

  test: {
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/libs/shared-helpers',
      provider: 'v8',
    },
    globals: true,
    cache: { dir: '../../node_modules/.vitest' },
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    include: [
      'src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}',
      'tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}',
    ],
  },
});
