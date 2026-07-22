// One-off image optimizer.
// Converts every image in m4yank-bucket/ to WebP and writes it to
// optimised-bucket/ while preserving the folder structure and base filename.
// Usage: node scripts/optimise-images.ts
// The output folder is gitignored and should be uploaded to R2 manually.
import sharp from "sharp";
import { readdir, stat, mkdir, writeFile } from "node:fs/promises";
import { extname, basename, dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const INPUT_DIR = ROOT + "m4yank-bucket";
const OUTPUT_DIR = ROOT + "optimised-bucket";

const IMAGE_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".avif",
  ".tiff",
  ".bmp",
]);

const QUALITY = 80;

// Resize rules are matched in order; the first match wins.
// width/height of undefined means "do not constrain that dimension".
// fit "cover" crops to the exact ratio; "inside" preserves ratio and scales down.
const SIZE_RULES: {
  match: RegExp;
  width?: number;
  height?: number;
  fit?: "cover" | "inside" | "fill";
  withoutEnlargement?: boolean;
}[] = [
  // Project hero images (the file named 1.* inside a project folder).
  {
    match: /projects\/[^/]+\/1\.(png|jpe?g|webp)$/i,
    width: 1200,
    height: 900,
    fit: "cover",
    withoutEnlargement: false,
  },
  // Any other project image.
  {
    match: /projects\//,
    width: 800,
    height: 600,
    fit: "cover",
    withoutEnlargement: false,
  },
  // Notebook, blog, and work images: cap width but keep original aspect ratio.
  { match: /notebook\//, width: 1200, fit: "inside" },
  { match: /blog\//, width: 1200, fit: "inside" },
  { match: /work\//, width: 1200, fit: "inside" },
];

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(path);
    } else if (entry.isFile()) {
      yield path;
    }
  }
}

async function optimize(inputPath: string) {
  const rel = relative(INPUT_DIR, inputPath);
  const ext = extname(rel).toLowerCase();

  if (!IMAGE_EXTENSIONS.has(ext)) {
    console.log(`⏭ skip ${rel} (not a supported image)`);
    return;
  }

  const base = basename(rel, ext);
  const outRel = join(dirname(rel), `${base}.webp`);
  const outputPath = join(OUTPUT_DIR, outRel);

  await mkdir(dirname(outputPath), { recursive: true });

  const rule = SIZE_RULES.find((r) => r.match.test(rel));
  let pipeline = sharp(inputPath).webp({ quality: QUALITY, effort: 4 });

  if (rule?.width || rule?.height) {
    pipeline = pipeline.resize({
      width: rule.width,
      height: rule.height,
      fit: rule.fit ?? "inside",
      withoutEnlargement: rule.withoutEnlargement ?? true,
    });
  }

  const buffer = await pipeline.toBuffer();
  await writeFile(outputPath, buffer);

  const inputStat = await stat(inputPath);
  const outputStat = await stat(outputPath);
  const inputKb = (inputStat.size / 1024).toFixed(1);
  const outputKb = (outputStat.size / 1024).toFixed(1);
  const saved = Math.round((1 - outputStat.size / inputStat.size) * 100);
  console.log(
    `✓ ${rel} → ${outRel} (${inputKb}KB → ${outputKb}KB, -${saved}%)`,
  );
}

let count = 0;
for await (const file of walk(INPUT_DIR)) {
  await optimize(file);
  count++;
}

console.log(`\nProcessed ${count} images into ${OUTPUT_DIR}`);
