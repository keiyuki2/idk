import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync, writeFileSync, copyFileSync, mkdirSync, existsSync } from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        background: resolve(__dirname, 'background.js'),
        'content-script': resolve(__dirname, 'content-script.js'),
        App: resolve(__dirname, 'App.js'),
        SimpleApp: resolve(__dirname, 'SimpleApp.tsx')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  plugins: [
    {
      name: 'copy-manifest-and-assets',
      writeBundle: async () => {
        // Make sure dist directory exists
        if (!existsSync('dist')) {
          mkdirSync('dist');
        }

        // Copy manifest.json
        try {
          let manifest = JSON.parse(readFileSync('manifest.json', 'utf-8'));
          writeFileSync('dist/manifest.json', JSON.stringify(manifest, null, 2));
          console.log('✓ manifest.json copied to dist');
        } catch (err) {
          console.error('Error copying manifest.json:', err);
        }

        // Create icons directory if it doesn't exist
        if (!existsSync('dist/icons')) {
          mkdirSync('dist/icons', { recursive: true });
        }

        // Copy icon files if they exist
        try {
          const iconSizes = [16, 48, 128];
          for (const size of iconSizes) {
            const iconPath = `icons/icon${size}.png`;
            if (existsSync(iconPath)) {
              copyFileSync(iconPath, `dist/icons/icon${size}.png`);
              console.log(`✓ ${iconPath} copied to dist/icons`);
            }
          }
        } catch (err) {
          console.error('Error copying icon files:', err);
        }

        // Copy public directory
        if (existsSync('public')) {
          if (!existsSync('dist/public')) {
            mkdirSync('dist/public', { recursive: true });
          }
          
          // Copy public/js directory
          if (existsSync('public/js')) {
            if (!existsSync('dist/public/js')) {
              mkdirSync('dist/public/js', { recursive: true });
            }
            
            // Copy all JS files in public/js
            const jsFiles = [
              'tailwind.min.js',
              'tailwind-config.js',
              'global-vars.js',
              'react.production.min.js',
              'react-dom.production.min.js',
              'gsap.min.js',
              'react-globals.js'
            ];
            
            for (const file of jsFiles) {
              if (existsSync(`public/js/${file}`)) {
                copyFileSync(`public/js/${file}`, `dist/public/js/${file}`);
                console.log(`✓ public/js/${file} copied to dist/public/js`);
              } else {
                console.warn(`! public/js/${file} not found, skipping`);
              }
            }
          }
        }
      }
    }
  ]
});
