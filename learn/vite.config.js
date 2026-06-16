import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// DriveAruba Learn is the whole site now, served from the GitHub Pages project
// root (https://<owner>.github.io/claude-code-/), so every asset URL must be
// prefixed with that base. Override with VITE_BASE if you later move to a
// custom domain (then it'd just be '/').
const base = process.env.VITE_BASE || '/claude-code-/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
