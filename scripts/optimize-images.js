/**
 * Script d'optimisation des images
 * Usage : node scripts/optimize-images.js
 *
 * Stratégie :
 * - Logos (4531px -> taille d'affichage)       : gains énormes
 * - Posters vidéo (paysage, ~1900px)           : version desktop 1300px + mobile 700px
 * - Images portrait (sc, immo2)                : version desktop 700px + mobile 500px
 * - Tito.webp (carré, 1958px -> affiché 619px) : 900px max
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMG_DIR = path.join(__dirname, '../public/img');

const tasks = [
  // ─── LOGOS ────────────────────────────────────────────────────────────────
  // Logo.webp : affiché 52x42 sur mobile, ~100px sur desktop → 200px suffit (2x retina)
  {
    src: 'Logo.webp',
    out: 'Logo.webp',
    width: 200,
    quality: 85,
  },
  // logo_white.webp : affiché 279x224 en footer → 600px (2x retina)
  {
    src: 'logo_white.webp',
    out: 'logo_white.webp',
    width: 600,
    quality: 85,
  },

  // ─── POSTER VIDÉO PAYSAGE ─────────────────────────────────────────────────
  // Versions desktop (max 1300px) + mobile (max 700px)
  ...['immo1', 'immo3', 'av1', 'av2', 'av3', 'live1', 'live2', 'live3', 'fp'].flatMap((name) => [
    { src: `${name}.webp`, out: `${name}.webp`,        width: 1300, quality: 75 },
    { src: `${name}.webp`, out: `${name}-mobile.webp`, width: 700,  quality: 70 },
  ]),

  // ─── POSTER VIDÉO PORTRAIT ────────────────────────────────────────────────
  ...['sc1', 'sc2', 'sc3', 'immo2'].flatMap((name) => [
    { src: `${name}.webp`, out: `${name}.webp`,        width: 700, quality: 75 },
    { src: `${name}.webp`, out: `${name}-mobile.webp`, width: 500, quality: 70 },
  ]),

  // ─── TITO (carré) ─────────────────────────────────────────────────────────
  // Affiché 619x619 → 900px (2x retina)
  { src: 'Tito.webp', out: 'Tito.webp', width: 900, quality: 80 },
];

// Sauvegarde les originaux avant traitement
const BACKUP_DIR = path.join(IMG_DIR, '_originals');
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR);

let totalSaved = 0;

for (const task of tasks) {
  const srcPath = path.join(IMG_DIR, task.src);
  const outPath = path.join(IMG_DIR, task.out);

  if (!fs.existsSync(srcPath)) {
    console.warn(`⚠  Fichier introuvable : ${task.src}`);
    continue;
  }

  // Sauvegarde de l'original (une seule fois)
  const backupPath = path.join(BACKUP_DIR, task.src);
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(srcPath, backupPath);
  }

  const sizeBefore = fs.statSync(srcPath).size;

  await sharp(srcPath)
    .resize({ width: task.width, withoutEnlargement: true })
    .webp({ quality: task.quality })
    .toFile(outPath + '.tmp');

  // Remplace seulement si le fichier optimisé est plus petit
  const sizeAfter = fs.statSync(outPath + '.tmp').size;
  if (sizeAfter < sizeBefore || task.out.endsWith('-mobile.webp')) {
    fs.renameSync(outPath + '.tmp', outPath);
    const saved = Math.round((sizeBefore - sizeAfter) / 1024);
    totalSaved += saved;
    console.log(`✓  ${task.out.padEnd(25)} ${Math.round(sizeBefore / 1024)}KB → ${Math.round(sizeAfter / 1024)}KB  (−${saved}KB)`);
  } else {
    fs.unlinkSync(outPath + '.tmp');
    console.log(`─  ${task.out.padEnd(25)} déjà optimal, non modifié`);
  }
}

console.log(`\n🎉  Total économisé : ~${totalSaved} KB`);
