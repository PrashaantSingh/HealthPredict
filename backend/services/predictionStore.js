import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, "../data");
const STORE_FILE = path.join(DATA_DIR, "predictions.json");

async function ensureStoreFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(STORE_FILE);
  } catch {
    await fs.writeFile(STORE_FILE, "[]", "utf8");
  }
}

async function readAllPredictions() {
  await ensureStoreFile();
  const content = await fs.readFile(STORE_FILE, "utf8");

  try {
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAllPredictions(records) {
  await ensureStoreFile();
  await fs.writeFile(STORE_FILE, JSON.stringify(records, null, 2), "utf8");
}

export async function appendPrediction({ disease, input, result }) {
  const records = await readAllPredictions();

  records.push({
    id: randomUUID(),
    disease,
    input,
    result,
    createdAt: new Date().toISOString(),
  });

  await writeAllPredictions(records);
}

export async function getPredictionHistory({ disease, limit } = {}) {
  const records = await readAllPredictions();

  let filtered = records;
  if (disease) {
    filtered = filtered.filter((r) => r.disease === disease);
  }

  const ordered = [...filtered].reverse();

  if (Number.isFinite(limit) && limit > 0) {
    return ordered.slice(0, limit);
  }

  return ordered;
}

export async function clearPredictionHistory() {
  await writeAllPredictions([]);
}
