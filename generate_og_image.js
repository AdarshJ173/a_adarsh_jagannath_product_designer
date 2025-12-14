import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, 'public/assets');
const INPUT_FILE = path.join(ASSETS_DIR, 'Gemini_Generated_Image_mnq55imnq55imnq5.png');
const OUTPUT_FILE = path.join(ASSETS_DIR, 'og-image.jpg');

async function createOgImage() {
    console.log('Generating OG Image from new source...');

    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`Input file not found: ${INPUT_FILE}`);
        return;
    }

    try {
        const info = await sharp(INPUT_FILE)
            .resize(1200, 630, {
                fit: 'cover', // Crop to cover 1200x630
                position: 'center'
            })
            .jpeg({ quality: 90 }) // High quality JPG
            .toFile(OUTPUT_FILE);

        console.log(`OG Image Updated:`);
        console.log(`  Size: ${(info.size / 1024).toFixed(2)} KB`);
        console.log(`  Path: ${OUTPUT_FILE}`);
    } catch (err) {
        console.error('Error creating OG image:', err);
    }
}

createOgImage();
