import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const archivePath = path.join(root, 'assets', 'gemstone-catalogue-images.tar.gz');
const outputDir = path.join(root, 'public', 'gemstone-assets');
const expected = 22;

if (!fs.existsSync(archivePath)) {
  throw new Error(`Gemstone image archive is missing: ${archivePath}`);
}

const tar = gunzipSync(fs.readFileSync(archivePath));
fs.mkdirSync(outputDir, { recursive: true });
let offset = 0;
const written = [];

while (offset + 512 <= tar.length) {
  const header = tar.subarray(offset, offset + 512);
  const name = header.subarray(0, 100).toString('utf8').replace(/\0.*$/, '');
  if (!name) break;
  const sizeText = header.subarray(124, 136).toString('ascii').replace(/\0.*$/, '').trim();
  const size = Number.parseInt(sizeText || '0', 8);
  if (!Number.isFinite(size) || size < 0) throw new Error(`Invalid tar size for ${name}`);

  const dataStart = offset + 512;
  const dataEnd = dataStart + size;
  if (dataEnd > tar.length) throw new Error(`Truncated gemstone asset: ${name}`);

  if (name.endsWith('.webp') && !name.includes('..') && !name.includes('/')) {
    fs.writeFileSync(path.join(outputDir, name), tar.subarray(dataStart, dataEnd));
    written.push(name);
  }

  offset = dataStart + Math.ceil(size / 512) * 512;
}

if (written.length !== expected) {
  throw new Error(`Expected ${expected} gemstone images, extracted ${written.length}`);
}
console.log(`Materialized ${written.length} illustrative gemstone images into public/gemstone-assets.`);
