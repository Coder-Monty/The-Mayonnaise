import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let metrics = [];

// Initialize in-memory store from seedReels.json
try {
  const seedPath = path.join(__dirname, 'seedReels.json');
  const seedData = fs.readFileSync(seedPath, 'utf8');
  metrics = JSON.parse(seedData);
} catch (err) {
  console.error('Failed to load seedReels.json into metricsStore:', err);
  metrics = [];
}

/**
 * Get all metric entries sorted by date (newest first)
 */
export function getMetrics() {
  return [...metrics].sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Add a new metric entry to memory
 */
export function addMetric(entry) {
  const newEntry = {
    id: `reel-${Date.now()}`,
    title: entry.title || 'Untitled Reel',
    niche: entry.niche || 'General',
    views: Number(entry.views) || 0,
    likes: Number(entry.likes) || 0,
    comments: Number(entry.comments) || 0,
    avgWatchPercent: Number(entry.avgWatchPercent) || 0,
    date: entry.date || new Date().toISOString().split('T')[0]
  };
  metrics.unshift(newEntry);
  return newEntry;
}
