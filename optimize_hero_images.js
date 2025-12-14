import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, 'public/assets');

const FILES = [
    'lpg.png',
    'frontAuraR.png',
    'rpngFix.png'
];

async function optimize() {
    console.log('Starting optimization...');

    for (const file of FILES) {
        const inputPath = path.join(ASSETS_DIR, file);
        const outputPath = path.join(ASSETS_DIR, `${path.parse(file).name}_opt.webp`);

        if (!fs.existsSync(inputPath)) {
            console.warn(`File not found: ${inputPath}`);
            continue;
        }

        try {
            const info = await sharp(inputPath)
                .resize({ width: 1920, withoutEnlargement: true }) // Max width 1920px (standard HD is enough for web)
                .webp({ quality: 80, effort: 6 }) // High compression effort
                .toFile(outputPath);

            console.log(`Optimized ${file}:`);
            console.log(`  New Size: ${(info.size / 1024 / 1024).toFixed(2)} MB`);
            console.log(`  Saved to: ${outputPath}`);
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }

    console.log('Done.');
}

optimize();
