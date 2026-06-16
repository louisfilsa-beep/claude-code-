import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// DriveAruba Learn is served from the /learn sub-path of the GitHub Pages
// project site (https://<owner>.github.io/claude-code-/learn/), so every asset
// URL must be prefixed with that base. Override with VITE_BASE if you later
// move to a custom domain (then it'd just be '/learn/' or '/').
const base = process.env.VITE_BASE || '/claude-code-/learn/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
