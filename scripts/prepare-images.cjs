const fs = require('node:fs');
const path = require('node:path');
// Requer o sharp: rode `npm install --no-save sharp` antes de usar este script.
const sharp = require('sharp');

async function main() {
  const root = path.resolve(__dirname, '..');
  const { assets } = JSON.parse(fs.readFileSync(path.join(root, 'docs/visual-assets.json'), 'utf8'));
  const output = path.join(root, 'public/images');
  fs.mkdirSync(output, { recursive: true });
  for (const asset of assets) {
    await sharp(asset.source).resize({ width: asset.name === 'hero' ? 1600 : 640, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(output, `${asset.name}.webp`));
    console.log(`${asset.name}.webp`);
  }
}
main().catch(error => { console.error(error); process.exit(1); });
