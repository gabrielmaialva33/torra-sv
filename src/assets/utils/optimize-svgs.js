/**
 * Utility script to optimize SVG files
 * Run: node src/assets/utils/optimize-svgs.js
 * 
 * Note: Requires svgo to be installed
 * npm install -D svgo
 */

import { optimize } from 'svgo';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '..');
const SVG_FOLDERS = ['icons/brand', 'icons/ui'];

const svgoConfig = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeViewBox: false,
          removeDimensions: false,
        },
      },
    },
    'removeDimensions',
    'removeXMLNS',
  ],
};

function optimizeSVGFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  const result = optimize(data, { ...svgoConfig, path: filePath });
  
  if (result.data) {
    fs.writeFileSync(filePath, result.data);
    console.log(`✓ Optimized: ${path.relative(ICONS_DIR, filePath)}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (path.extname(file).toLowerCase() === '.svg') {
      optimizeSVGFile(filePath);
    }
  });
}

// Process all SVG folders
console.log('Optimizing SVG files...\n');
SVG_FOLDERS.forEach(folder => {
  const folderPath = path.join(ICONS_DIR, folder);
  if (fs.existsSync(folderPath)) {
    processDirectory(folderPath);
  }
});
console.log('\n✓ SVG optimization complete!');