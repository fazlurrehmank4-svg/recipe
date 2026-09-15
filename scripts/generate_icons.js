import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';

function generateIcon(size, outputPath) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#f97316'); // Orange 500
  gradient.addColorStop(1, '#e11d48'); // Rose 600

  ctx.fillStyle = gradient;
  ctx.beginPath();
  const radius = size * 0.2;
  ctx.roundRect(0, 0, size, size, radius);
  ctx.fill();

  // Globe / Plate SVG drawing
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${Math.round(size * 0.5)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🍛', size / 2, size / 2 + size * 0.03);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated ${outputPath} (${size}x${size})`);
}

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

generateIcon(192, path.join(publicDir, 'pwa-192x192.png'));
generateIcon(512, path.join(publicDir, 'pwa-512x512.png'));
generateIcon(180, path.join(publicDir, 'apple-touch-icon.png'));
generateIcon(64, path.join(publicDir, 'favicon.png'));
