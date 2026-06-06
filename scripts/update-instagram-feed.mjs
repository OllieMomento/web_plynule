import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const token = process.env.INSTAGRAM_ACCESS_TOKEN;
const userId = process.env.INSTAGRAM_USER_ID;
const outputPath = resolve(process.env.INSTAGRAM_FEED_PATH || 'assets/instagram-feed.json');

if (!token) {
  console.log('INSTAGRAM_ACCESS_TOKEN is not set; keeping the checked-in Instagram feed.');
  process.exit(0);
}

const fields = 'id,media_type,media_url,thumbnail_url,permalink,timestamp';
const endpoint = userId
  ? `https://graph.facebook.com/v20.0/${encodeURIComponent(userId)}/media?fields=${fields}&limit=25&access_token=${encodeURIComponent(token)}`
  : `https://graph.instagram.com/me/media?fields=${fields}&limit=25&access_token=${encodeURIComponent(token)}`;

const response = await fetch(endpoint);
const payload = await response.json();

if (!response.ok) {
  throw new Error(`Instagram feed request failed: ${response.status} ${JSON.stringify(payload)}`);
}

const items = (payload.data || [])
  .filter(item => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM')
  .map(item => ({
    media_url: item.media_url || item.thumbnail_url,
    permalink: item.permalink || 'https://www.instagram.com/plynule/',
    alt: 'Plynule Instagram photo',
    timestamp: item.timestamp,
  }))
  .filter(item => item.media_url)
  .slice(0, 5);

if (!items.length) {
  throw new Error('Instagram feed returned no photo posts.');
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(
  outputPath,
  `${JSON.stringify({ generated_at: new Date().toISOString(), items }, null, 2)}\n`,
);

console.log(`Wrote ${items.length} Instagram photos to ${outputPath}`);
