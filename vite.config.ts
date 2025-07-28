import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 3000,
      cors: true,
      proxy: {
        '/api': {
          changeOrigin: true,
          target: env.VITE_API_URL,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, 'src/components'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@partials': path.resolve(__dirname, 'src/partials'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@contexts': path.resolve(__dirname, 'src/contexts'),
        '@providers': path.resolve(__dirname, 'src/providers'),
        '@services': path.resolve(__dirname, 'src/services'),
        '@models': path.resolve(__dirname, 'src/models'),
      },
    },
  };
});
