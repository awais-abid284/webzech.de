import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

function getAllHtmlFiles(dir: string, fileList: Record<string, string> = {}): Record<string, string> {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === 'dist' || file.startsWith('.')) continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      const relPath = path.relative(process.cwd(), filePath);
      const name = relPath.replace(/\.html$/, '').replace(/[\\/]/g, '_');
      fileList[name] = filePath;
    }
  }
  return fileList;
}

export default defineConfig(() => {
  const htmlFiles = getAllHtmlFiles(process.cwd());

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        input: htmlFiles,
      },
    },
  };
});
