import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const PUBLIC_DIR = path.join(__dirname, 'public');
const DATA_DIR = path.join(__dirname, 'data');
const CHANNELS_FILE = path.join(DATA_DIR, 'channels.json');
const META_FILE = path.join(DATA_DIR, 'meta.json');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Load public channels and meta data (mutable so Admin panel can edit & persist)
let channels = JSON.parse(fs.readFileSync(CHANNELS_FILE, 'utf8'));
let meta = JSON.parse(fs.readFileSync(META_FILE, 'utf8'));

function savePublicChannels() {
  fs.writeFileSync(CHANNELS_FILE, JSON.stringify(channels, null, 2), 'utf8');
}

function saveMeta() {
  fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 2), 'utf8');
}

// Password hashing helper
function hashPassword(password) {
  return crypto.createHash('sha256').update('sfx_salt_2026_' + String(password)).digest('hex');
}

// Initialize or load database with default Admin user
function loadDb() {
  let db = {
    users: [],
    sources: [],
    settings: {
      allowRegistration: true,
      requireLogin: true
    }
  };

  if (fs.existsSync(DB_FILE)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      db = {
        users: Array.isArray(parsed.users) ? parsed.users : [],
        sources: Array.isArray(parsed.sources) ? parsed.sources : [],
        settings: {
          allowRegistration: true,
          requireLogin: true,
          ...(parsed.settings || {})
        }
      };
    } catch {
      // keep default
    }
  }

  // Ensure default admin account exists (migrate legacy admin email if present)
  const legacyAdmin = db.users.find(u => u.email.toLowerCase() === 'admin@sefirox.com');
  const hasAdmin = db.users.some(u => u.email.toLowerCase() === 'admin@tesflix.com.tr');
  if (!hasAdmin && legacyAdmin) {
    legacyAdmin.email = 'admin@tesflix.com.tr';
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
  } else if (!hasAdmin) {
    db.users.unshift({
      id: 'usr-admin',
      name: 'Sistem Yöneticisi',
      email: 'admin@tesflix.com.tr',
      passwordHash: hashPassword('admin123'),
      role: 'admin',
      isActive: true,
      createdAt: new Date().toISOString()
    });
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
  }

  return db;
}

function saveDb(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
}

// Per-user IPTV channel storage on disk
function getUserIptvFile(userId) {
  const safeId = String(userId || 'default').replace(/[^a-zA-Z0-9_-]/g, '');
  return path.join(DATA_DIR, `iptv_${safeId}.json`);
}

function loadUserIptvChannels(userId) {
  const file = getUserIptvFile(userId);
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return [];
  }
}

function saveUserIptvChannels(userId, list) {
  const file = getUserIptvFile(userId);
  try {
    fs.writeFileSync(file, JSON.stringify(list), 'utf8');
  } catch {
    // ignore disk error
  }
}

// Token generation and verification
function createToken(user) {
  const payload = JSON.stringify({
    id: user.id,
    email: user.email,
    role: user.role,
    iat: Date.now()
  });
  const b64 = Buffer.from(payload).toString('base64url');
  const sig = crypto.createHmac('sha256', 'sfx_secret_key_2026').update(b64).digest('base64url');
  return `${b64}.${sig}`;
}

function getAuthUser(req) {
  const auth = req.headers['authorization'] || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
  if (!token || !token.includes('.')) return null;

  try {
    const [b64, sig] = token.split('.');
    const expectedSig = crypto.createHmac('sha256', 'sfx_secret_key_2026').update(b64).digest('base64url');
    if (sig !== expectedSig) return null;
    const data = JSON.parse(Buffer.from(b64, 'base64url').toString('utf8'));
    const db = loadDb();
    const user = db.users.find(u => u.id === data.id);
    if (!user || user.isActive === false) return null;
    return user;
  } catch {
    return null;
  }
}

function sanitizeUser(u) {
  const iptvCount = loadUserIptvChannels(u.id).length;
  return {
    id: u.id,
    name: u.name || u.email.split('@')[0],
    email: u.email,
    role: u.role || 'user',
    isActive: u.isActive !== false,
    iptvChannelCount: iptvCount,
    youtubeAccount: u.youtubeAccount || null,
    createdAt: u.createdAt
  };
}

// Extract exact JSON object starting at a given index using balanced braces
function extractBalancedJson(str, startBraceIdx) {
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = startBraceIdx; i < str.length; i++) {
    const ch = str[i];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }
    if (ch === '"') {
      inString = true;
    } else if (ch === '{') {
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0) {
        return str.slice(startBraceIdx, i + 1);
      }
    }
  }
  return null;
}

// Walk any YouTube InnerTube / ytInitialData JSON tree and collect videos
function collectYoutubeVideosFromTree(rootNode, maxResults = 36) {
  const results = [];
  const seen = new Set();

  const walk = node => {
    if (!node || typeof node !== 'object' || results.length >= maxResults) return;
    if (Array.isArray(node)) {
      for (const item of node) {
        if (results.length >= maxResults) break;
        walk(item);
      }
      return;
    }

    const vr =
      node.videoRenderer ||
      node.playlistVideoRenderer ||
      node.gridVideoRenderer ||
      node.compactVideoRenderer ||
      node.reelItemRenderer;

    if (vr && vr.videoId && !seen.has(vr.videoId)) {
      seen.add(vr.videoId);
      const title =
        vr.title?.runs?.map(r => r.text).join('') ||
        vr.title?.simpleText ||
        vr.headline?.simpleText ||
        'YouTube Video';
      const channel =
        vr.ownerText?.runs?.[0]?.text ||
        vr.longBylineText?.runs?.[0]?.text ||
        vr.shortBylineText?.runs?.[0]?.text ||
        'YouTube';
      const duration =
        vr.lengthText?.simpleText ||
        (vr.badges?.some(b => b?.metadataBadgeRenderer?.style?.includes('LIVE')) ? 'CANLI' : 'VİDEO');
      const views =
        vr.shortViewCountText?.simpleText ||
        vr.viewCountText?.simpleText ||
        vr.viewCountText?.runs?.map(r => r.text).join('') ||
        (duration === 'CANLI' ? 'CANLI YAYIN' : '');

      results.push({
        id: 'yt-' + vr.videoId,
        videoId: vr.videoId,
        title,
        channel,
        duration,
        views,
        cat: duration === 'CANLI' ? 'Canlı Yayın' : 'YouTube'
      });
    }

    for (const k of Object.keys(node)) {
      if (results.length >= maxResults) break;
      walk(node[k]);
    }
  };

  walk(rootNode);
  return results;
}

// Parse YouTube HTML for video search & channel/playlist import
function extractYoutubeVideosFromHtml(html) {
  if (!html) return [];

  // 1. Try balanced JSON extraction from ytInitialData
  const markerMatch = html.match(/(?:var\s+ytInitialData|window\["ytInitialData"\])\s*=\s*\{/);
  if (markerMatch && typeof markerMatch.index === 'number') {
    const braceStart = html.indexOf('{', markerMatch.index);
    if (braceStart >= 0) {
      const jsonText = extractBalancedJson(html, braceStart);
      if (jsonText) {
        try {
          const parsed = JSON.parse(jsonText);
          const list = collectYoutubeVideosFromTree(parsed, 36);
          if (list.length > 0) return list;
        } catch {}
      }
    }
  }

  // 2. Regex fallback directly over HTML if script format varies
  const fallbackResults = [];
  const seen = new Set();
  const regex = /"videoRenderer":\{"videoId":"([A-Za-z0-9_-]{11})".+?"title":\{"runs":\[\{"text":"((?:[^"\\]|\\.)*)"\}/g;
  let m;
  while ((m = regex.exec(html)) !== null && fallbackResults.length < 30) {
    const videoId = m[1];
    if (seen.has(videoId)) continue;
    seen.add(videoId);
    let title = m[2];
    try {
      title = JSON.parse(`"${m[2]}"`);
    } catch {}
    fallbackResults.push({
      id: 'yt-' + videoId,
      videoId,
      title,
      channel: 'YouTube',
      duration: 'VİDEO',
      views: '',
      cat: 'YouTube'
    });
  }

  return fallbackResults;
}

// Direct YouTube InnerTube v1 JSON Search API (fast, no HTML/cookie-wall issues)
function searchYoutubeInnerTube(query, gl = 'TR', hl = 'tr') {
  return new Promise((resolve, reject) => {
    const cleanGl = String(gl || 'TR').toUpperCase().slice(0, 2);
    const cleanHl = String(hl || 'tr').toLowerCase().slice(0, 2);
    const payload = JSON.stringify({
      context: {
        client: {
          clientName: 'WEB',
          clientVersion: '2.20241111.01.00',
          hl: cleanHl,
          gl: cleanGl
        }
      },
      query: String(query || '').trim()
    });

    const req = https.request(
      'https://www.youtube.com/youtubei/v1/search?prettyPrint=false',
      {
        method: 'POST',
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          'Accept-Language': `${cleanHl}-${cleanGl},${cleanHl};q=0.9,en;q=0.7`,
          'Cookie': 'CONSENT=YES+cb.20210328-17-p0.en+FX+410; SOCS=CAISHAgBEhJnd3NfMjAyMzA4MTAtMF9SQzIaAmVuIAEaBgiAo_CmBg'
        }
      },
      res => {
        const chunks = [];
        res.on('data', c => chunks.push(c));
        res.on('end', () => {
          try {
            const json = JSON.parse(Buffer.concat(chunks).toString('utf8'));
            const videos = collectYoutubeVideosFromTree(json, 36);
            resolve(videos);
          } catch (err) {
            reject(err);
          }
        });
        res.on('error', reject);
      }
    );

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('YouTube arama zaman aşımı'));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// Fetch YouTube Trending / Popular videos for a given country (gl, hl)
async function fetchYoutubeTrendingByCountry(gl = 'TR', hl = 'tr') {
  const cleanGl = String(gl || 'TR').toUpperCase().slice(0, 2);
  const cleanHl = String(hl || 'tr').toLowerCase().slice(0, 2);

  const tryBrowse = browseId =>
    new Promise(resolve => {
      const payload = JSON.stringify({
        context: {
          client: {
            clientName: 'WEB',
            clientVersion: '2.20241111.01.00',
            hl: cleanHl,
            gl: cleanGl
          }
        },
        browseId
      });

      const req = https.request(
        'https://www.youtube.com/youtubei/v1/browse?prettyPrint=false',
        {
          method: 'POST',
          timeout: 8000,
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            'Accept-Language': `${cleanHl}-${cleanGl},${cleanHl};q=0.9,en;q=0.7`,
            'Cookie': 'CONSENT=YES+cb.20210328-17-p0.en+FX+410; SOCS=CAISHAgBEhJnd3NfMjAyMzA4MTAtMF9SQzIaAmVuIAEaBgiAo_CmBg'
          }
        },
        res => {
          const chunks = [];
          res.on('data', c => chunks.push(c));
          res.on('end', () => {
            try {
              const json = JSON.parse(Buffer.concat(chunks).toString('utf8'));
              resolve(collectYoutubeVideosFromTree(json, 36));
            } catch {
              resolve([]);
            }
          });
          res.on('error', () => resolve([]));
        }
      );

      req.on('timeout', () => {
        req.destroy();
        resolve([]);
      });
      req.on('error', () => resolve([]));
      req.write(payload);
      req.end();
    });

  let videos = await tryBrowse('FEtrending');
  if (!videos || videos.length < 6) {
    const exploreVideos = await tryBrowse('FEexplore');
    if (exploreVideos && exploreVideos.length >= 6) {
      videos = exploreVideos;
    }
  }
  if (!videos || videos.length < 6) {
    const fallbackQueries = {
      TR: 'Türkiye trend popüler videolar müzik 2026',
      DE: 'Deutschland Trends beliebte Videos Musik 2026',
      US: 'USA trending popular videos music 2026',
      GB: 'UK trending popular videos music 2026',
      FR: 'France tendances vidéos populaires musique 2026',
      NL: 'Nederland trending populaire videos muziek 2026'
    };
    const q = fallbackQueries[cleanGl] || `${cleanGl} trending popular videos 2026`;
    const searched = await searchYoutubeInnerTube(q, cleanGl, cleanHl).catch(() => []);
    if (searched && searched.length > 0) {
      videos = searched;
    }
  }
  return videos || [];
}

// In-memory cache for proxied logos
const logoCache = new Map();

// Generate a valid 1-second 8kHz mono 8-bit PCM silent WAV buffer for Tesla Keep-Alive
function createSilentWavBuffer() {
  const sampleRate = 8000;
  const numSamples = sampleRate;
  const buffer = Buffer.alloc(44 + numSamples);

  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + numSamples, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate, 28);
  buffer.writeUInt16LE(1, 32);
  buffer.writeUInt16LE(8, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(numSamples, 40);
  buffer.fill(128, 44);
  return buffer;
}

const SILENT_WAV = createSilentWavBuffer();

// Generate a crisp broadcast-style SVG logo when a remote logo is unavailable
function generateSvgLogo(name = 'TV', category = 'ULUSAL') {
  const cleanName = String(name || 'TV').trim();
  const words = cleanName.split(/\s+/);
  let mainText = cleanName.toUpperCase();
  let subText = '';

  if (words.length >= 2) {
    mainText = words[0].toUpperCase();
    subText = words.slice(1).join(' ').toUpperCase();
  }
  if (mainText.length > 8) {
    mainText = mainText.slice(0, 7);
  }

  const palettes = {
    ULUSAL: ['#ff3568', '#c060ff'],
    HABER: ['#ef4444', '#f97316'],
    SPOR: ['#10b981', '#059669'],
    BELGESEL: ['#f59e0b', '#d97706'],
    'ÇOCUK': ['#ec4899', '#8b5cf6'],
    'MÜZİK': ['#a855f7', '#ec4899'],
    GENEL: ['#3b82f6', '#8b5cf6'],
    INTERNATIONAL: ['#06b6d4', '#3b82f6'],
    IPTV: ['#3fca82', '#06b6d4']
  };
  const [c1, c2] = palettes[category] || ['#ff3568', '#c060ff'];

  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const fontSize = mainText.length <= 3 ? 52 : mainText.length <= 5 ? 40 : 30;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" width="240" height="160">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}" />
      <stop offset="100%" stop-color="${c2}" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="${c1}" flood-opacity="0.35"/>
    </filter>
  </defs>
  <rect x="16" y="18" width="208" height="124" rx="24" fill="rgba(255,255,255,0.04)" stroke="url(#g)" stroke-width="2.5" filter="url(#glow)"/>
  <circle cx="38" cy="40" r="5" fill="url(#g)"/>
  <text x="120" y="${subText ? '84' : '96'}" text-anchor="middle" fill="#ffffff" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="${fontSize}" letter-spacing="1.5">${esc(mainText)}</text>
  ${subText ? `<text x="120" y="114" text-anchor="middle" fill="${c1}" font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="16" letter-spacing="2.5">${esc(subText.slice(0, 14))}</text>` : ''}
</svg>`;
}

// Fetch remote binary/text with redirect support & configurable User-Agent and max bytes
function fetchRemoteBuffer(targetUrl, options = {}) {
  const {
    timeoutMs = 20000,
    redirectsLeft = 5,
    maxBytes = 90 * 1024 * 1024,
    userAgent = 'VLC/3.0.20 LibVLC/3.0.20'
  } = options;

  return new Promise((resolve, reject) => {
    try {
      const parsed = new URL(targetUrl);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.get(
        targetUrl,
        {
          timeout: timeoutMs,
          headers: {
            'User-Agent': userAgent,
            'Accept': '*/*',
            'Connection': 'keep-alive'
          }
        },
        res => {
          if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && redirectsLeft > 0) {
            const nextUrl = new URL(res.headers.location, targetUrl).toString();
            res.resume();
            return resolve(fetchRemoteBuffer(nextUrl, { ...options, redirectsLeft: redirectsLeft - 1 }));
          }
          if (res.statusCode !== 200 && res.statusCode !== 206) {
            res.resume();
            return reject(new Error(`HTTP ${res.statusCode}`));
          }
          const chunks = [];
          let total = 0;
          res.on('data', chunk => {
            total += chunk.length;
            if (total > maxBytes) {
              req.destroy();
              return resolve({
                buffer: Buffer.concat(chunks),
                contentType: res.headers['content-type'] || 'text/plain',
                partial: true
              });
            }
            chunks.push(chunk);
          });
          res.on('end', () => {
            resolve({
              buffer: Buffer.concat(chunks),
              contentType: res.headers['content-type'] || 'application/octet-stream'
            });
          });
          res.on('error', err => {
            if (chunks.length > 0) {
              resolve({
                buffer: Buffer.concat(chunks),
                contentType: res.headers['content-type'] || 'text/plain'
              });
            } else {
              reject(err);
            }
          });
        }
      );
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Bağlantı zaman aşımına uğradı (Timeout)'));
      });
      req.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
}

function extractXtreamFromUrl(rawUrl) {
  try {
    const u = new URL(rawUrl);
    const username = u.searchParams.get('username');
    const password = u.searchParams.get('password');
    const output = u.searchParams.get('output') || 'ts';
    if (username && password) {
      return {
        baseUrl: `${u.protocol}//${u.host}`,
        username,
        password,
        output
      };
    }
  } catch {}
  return null;
}

async function fetchViaXtreamApi(baseUrl, username, password, sourceName = 'Xtream IPTV', preferredOutput = 'ts') {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const catUrl = `${cleanBase}/player_api.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&action=get_live_categories`;
  const streamsUrl = `${cleanBase}/player_api.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&action=get_live_streams`;

  const [catRes, streamsRes] = await Promise.all([
    fetchRemoteBuffer(catUrl, { timeoutMs: 12000, userAgent: 'IPTVSmartersPro/1.1.1 (iPad; iOS 16.5; Scale/2.00)' }).catch(() => null),
    fetchRemoteBuffer(streamsUrl, { timeoutMs: 18000, userAgent: 'IPTVSmartersPro/1.1.1 (iPad; iOS 16.5; Scale/2.00)' })
  ]);

  const catMap = new Map();
  if (catRes && catRes.buffer) {
    try {
      const cats = JSON.parse(catRes.buffer.toString('utf8'));
      if (Array.isArray(cats)) {
        cats.forEach(c => {
          if (c.category_id && c.category_name) {
            catMap.set(String(c.category_id), String(c.category_name).trim().toUpperCase());
          }
        });
      }
    } catch {}
  }

  const streamsJson = JSON.parse(streamsRes.buffer.toString('utf8'));
  if (!Array.isArray(streamsJson)) {
    throw new Error('Xtream API geçerli kanal listesi döndürmedi');
  }

  const batchId = Date.now();
  return streamsJson.slice(0, 8000).map((st, idx) => {
    const streamId = st.stream_id || st.num || idx;
    const catName = catMap.get(String(st.category_id)) || sourceName.toUpperCase() || 'IPTV';
    const hlsUrl = `${cleanBase}/live/${encodeURIComponent(username)}/${encodeURIComponent(password)}/${streamId}.m3u8`;
    const tsUrl = `${cleanBase}/live/${encodeURIComponent(username)}/${encodeURIComponent(password)}/${streamId}.ts`;

    return {
      id: `xt-${batchId}-${streamId}`,
      name: String(st.name || `Kanal ${idx + 1}`).trim(),
      logo_url: String(st.stream_icon || '').trim(),
      category: catName,
      epg_id: st.epg_channel_id || '',
      stream_url: preferredOutput === 'ts' ? tsUrl : hlsUrl,
      alt_stream_url: preferredOutput === 'ts' ? hlsUrl : tsUrl,
      is_ts: preferredOutput === 'ts',
      country: 'TR',
      source: sourceName
    };
  });
}

function parseM3uContent(content, sourceName = 'IPTV M3U') {
  const text = String(content || '').trim();
  if (!text) return [];

  if (/^https?:\/\/\S+$/i.test(text) && !text.includes('\n')) {
    return [
      {
        id: `iptv-direct-${Date.now()}`,
        name: sourceName || 'Canlı IPTV Yayını',
        category: 'IPTV',
        stream_url: text,
        logo_url: '',
        country: 'TR',
        source: sourceName
      }
    ];
  }

  const lines = text.split(/\r?\n/);
  const result = [];
  let current = null;
  const batchId = Date.now();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('#EXTINF:')) {
      const commaIdx = line.lastIndexOf(',');
      const rawName = commaIdx >= 0 ? line.slice(commaIdx + 1).trim() : `Kanal ${result.length + 1}`;
      const logoMatch = line.match(/tvg-logo="([^"]*)"/i);
      const groupMatch = line.match(/group-title="([^"]*)"/i);
      const idMatch = line.match(/tvg-id="([^"]*)"/i);

      current = {
        id: `m3u-${batchId}-${result.length}`,
        name: rawName || `Kanal ${result.length + 1}`,
        logo_url: logoMatch && logoMatch[1] ? logoMatch[1].trim() : '',
        category: groupMatch && groupMatch[1] ? groupMatch[1].trim().toUpperCase() : 'IPTV',
        epg_id: idMatch && idMatch[1] ? idMatch[1].trim() : '',
        country: 'TR',
        source: sourceName
      };
    } else if (line.startsWith('#EXTGRP:')) {
      if (current && (!current.category || current.category === 'IPTV')) {
        current.category = line.replace('#EXTGRP:', '').trim().toUpperCase() || 'IPTV';
      }
    } else if (!line.startsWith('#') && /^https?:\/\//i.test(line)) {
      const isTs = /\.ts(\?.*)?$/i.test(line) || (!/\.m3u8(\?.*)?$/i.test(line) && /\/\d+$/.test(line));
      if (current) {
        current.stream_url = line;
        current.is_ts = isTs;
        result.push(current);
        current = null;
      } else {
        result.push({
          id: `m3u-${batchId}-${result.length}`,
          name: `${sourceName} #${result.length + 1}`,
          logo_url: '',
          category: 'IPTV',
          stream_url: line,
          is_ts: isTs,
          country: 'TR',
          source: sourceName
        });
      }
      if (result.length >= 8000) break;
    }
  }
  return result;
}

// Unified helper to resolve an IPTV payload ({ url, name, content, server, username, password }) into channels
async function resolveIptvRequest(body) {
  const url = String(body.url || '').trim();
  const name = String(body.name || 'IPTV Paketi').trim();
  const rawContent = String(body.content || '').trim();

  if (rawContent) {
    const parsedChannels = parseM3uContent(rawContent, name);
    return { ok: true, channels: parsedChannels, count: parsedChannels.length, sourceType: 'm3u_file' };
  }

  if (body.server && body.username && body.password) {
    try {
      const xtChannels = await fetchViaXtreamApi(body.server, body.username, body.password, name, 'm3u8');
      if (xtChannels.length > 0) {
        return { ok: true, channels: xtChannels, count: xtChannels.length, sourceType: 'xtream_api' };
      }
    } catch (err) {
      const fallbackGetPhp = `${String(body.server).replace(/\/+$/, '')}/get.php?username=${encodeURIComponent(body.username)}&password=${encodeURIComponent(body.password)}&type=m3u_plus&output=ts`;
      try {
        const fetched = await fetchRemoteBuffer(fallbackGetPhp, { timeoutMs: 25000 });
        const parsed = parseM3uContent(fetched.buffer.toString('utf8'), name);
        if (parsed.length > 0) {
          return { ok: true, channels: parsed, count: parsed.length, sourceType: 'xtream_m3u' };
        }
      } catch {}
      return {
        ok: false,
        error: `Xtream sunucusuna (${body.server}) bağlanılamadı veya abonelik süresi dolmuş: ${err.message}`
      };
    }
  }

  if (!url || !/^https?:\/\//i.test(url)) {
    return { ok: false, error: 'Geçerli bir http:// veya https:// IPTV linki girin.' };
  }

  const xtInfo = extractXtreamFromUrl(url);
  if (xtInfo) {
    try {
      const xtChannels = await fetchViaXtreamApi(xtInfo.baseUrl, xtInfo.username, xtInfo.password, name, xtInfo.output);
      if (xtChannels.length > 0) {
        return { ok: true, channels: xtChannels, count: xtChannels.length, sourceType: 'xtream_api' };
      }
    } catch {}

    const m3uPlusUrl = url.replace(/type=m3u(?!_plus)/i, 'type=m3u_plus');
    let lastErrorMsg = '';
    for (const candidateUrl of [m3uPlusUrl, url]) {
      try {
        const fetched = await fetchRemoteBuffer(candidateUrl, {
          timeoutMs: 25000,
          userAgent: 'VLC/3.0.20 LibVLC/3.0.20'
        });
        const text = fetched.buffer.toString('utf8');
        const parsedChannels = parseM3uContent(text, name);
        if (parsedChannels.length > 0) {
          return { ok: true, channels: parsedChannels, count: parsedChannels.length, sourceType: 'xtream_m3u' };
        }
      } catch (err) {
        lastErrorMsg = err.message || '';
      }
    }

    const is512 = lastErrorMsg.includes('512') || lastErrorMsg.includes('401') || lastErrorMsg.includes('403');
    return {
      ok: false,
      error: is512
        ? `IPTV sunucusu (${xtInfo.baseUrl}) ${lastErrorMsg} hatası döndürdü: "${xtInfo.username}" hesabının süresi dolmuş, şifre hatalı veya hesapta IP/cihaz kilidi var.`
        : `IPTV sunucusu (${xtInfo.baseUrl}) yanıt vermedi (${lastErrorMsg || 'Boş yanıt'}).`
    };
  }

  try {
    const fetched = await fetchRemoteBuffer(url, {
      timeoutMs: 20000,
      userAgent: 'VLC/3.0.20 LibVLC/3.0.20'
    });
    const text = fetched.buffer.toString('utf8');

    if (text.includes('#EXT-X-TARGETDURATION') || text.includes('#EXT-X-STREAM-INF')) {
      const directChannel = {
        id: `iptv-live-${Date.now()}`,
        name: name || 'Canlı IPTV Yayını',
        category: 'IPTV',
        stream_url: url,
        logo_url: '',
        country: 'TR',
        source: name
      };
      return { ok: true, isDirectStream: true, channels: [directChannel], count: 1, sourceType: 'direct' };
    }

    const parsedChannels = parseM3uContent(text, name);
    if (parsedChannels.length > 0) {
      return { ok: true, channels: parsedChannels, count: parsedChannels.length, sourceType: 'm3u_url' };
    }
  } catch (err) {
    if (/\.(m3u8|ts|mp4)(\?.*)?$/i.test(url)) {
      const directChannel = {
        id: `iptv-live-${Date.now()}`,
        name: name || 'Özel IPTV Yayını',
        category: 'IPTV',
        stream_url: url,
        is_ts: /\.ts(\?.*)?$/i.test(url),
        logo_url: '',
        country: 'TR',
        source: name
      };
      return { ok: true, isDirectStream: true, channels: [directChannel], count: 1, sourceType: 'direct' };
    }

    return {
      ok: false,
      error: `IPTV linkine bağlanılamadı (${err.message}). Linkin aktif olduğundan emin olun.`
    };
  }

  return {
    ok: false,
    error: 'Link içeriğinde geçerli bir M3U kanal listesi bulunamadı (Sunucu boş yanıt döndürdü veya üyelik pasif).'
  };
}

const LLMS_TXT = `# Tesflix (tesflix.com.tr) - Connected Car Web Utility (Tesla Optimized)
> Tesflix is a web-based multimedia, live TV (74+ public channels), personal IPTV (Xtream Codes & M3U), and Admin management platform optimized for Tesla MCU2/MCU3 and connected car browsers.
`;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wav': 'audio/wav',
  '.txt': 'text/plain; charset=utf-8'
};

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise(resolve => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function handleStreamProxy(req, res, targetUrl, redirectsLeft = 5) {
  if (!targetUrl || !/^https?:\/\//i.test(targetUrl)) {
    res.writeHead(400, { 'Access-Control-Allow-Origin': '*' });
    return res.end('Invalid stream URL');
  }

  try {
    const parsed = new URL(targetUrl);
    const client = parsed.protocol === 'https:' ? https : http;
    const upstreamReq = client.get(
      targetUrl,
      {
        timeout: 15000,
        headers: {
          'User-Agent': 'VLC/3.0.20 LibVLC/3.0.20',
          'Accept': '*/*',
          'Connection': 'keep-alive'
        }
      },
      upstreamRes => {
        if ([301, 302, 303, 307, 308].includes(upstreamRes.statusCode) && upstreamRes.headers.location && redirectsLeft > 0) {
          const nextUrl = new URL(upstreamRes.headers.location, targetUrl).toString();
          upstreamRes.resume();
          return handleStreamProxy(req, res, nextUrl, redirectsLeft - 1);
        }

        const contentType = upstreamRes.headers['content-type'] || '';
        const isM3u8 =
          targetUrl.includes('.m3u8') ||
          contentType.includes('mpegurl') ||
          contentType.includes('x-mpegURL');

        if (isM3u8) {
          const chunks = [];
          upstreamRes.on('data', c => chunks.push(c));
          upstreamRes.on('end', () => {
            const rawText = Buffer.concat(chunks).toString('utf8');
            const rewritten = rawText
              .split(/\r?\n/)
              .map(line => {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith('#')) return line;
                try {
                  const abs = new URL(trimmed, targetUrl).toString();
                  return `/api/stream?url=${encodeURIComponent(abs)}`;
                } catch {
                  return line;
                }
              })
              .join('\n');

            res.writeHead(200, {
              'Content-Type': 'application/vnd.apple.mpegurl',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'no-cache'
            });
            res.end(rewritten);
          });
          return;
        }

        res.writeHead(upstreamRes.statusCode || 200, {
          'Content-Type': contentType || 'video/mp2t',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        });
        upstreamRes.pipe(res);
        req.on('close', () => {
          upstreamReq.destroy();
        });
      }
    );

    upstreamReq.on('error', err => {
      if (!res.headersSent) {
        res.writeHead(502, { 'Access-Control-Allow-Origin': '*' });
        res.end(`Stream proxy error: ${err.message}`);
      }
    });
  } catch (err) {
    if (!res.headersSent) {
      res.writeHead(500, { 'Access-Control-Allow-Origin': '*' });
      res.end(err.message);
    }
  }
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // ==========================================================================
  // AUTHENTICATION API (/api/auth/*)
  // ==========================================================================
  if (pathname === '/api/auth/register' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const db = loadDb();

    if (db.settings && db.settings.allowRegistration === false) {
      return sendJson(res, 403, { ok: false, error: 'Yeni üye kaydı şu anda yönetici tarafından kapatılmıştır.' });
    }

    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '').trim();
    const name = String(body.name || email.split('@')[0] || 'Sürücü').trim();

    if (!email || !email.includes('@')) {
      return sendJson(res, 400, { ok: false, error: 'Geçerli bir e-posta adresi girin.' });
    }
    if (password.length < 4) {
      return sendJson(res, 400, { ok: false, error: 'Şifre en az 4 karakter olmalıdır.' });
    }
    if (db.users.some(u => u.email.toLowerCase() === email)) {
      return sendJson(res, 409, { ok: false, error: 'Bu e-posta adresi ile kayıtlı bir hesap zaten var.' });
    }

    const newUser = {
      id: 'usr-' + Date.now(),
      name,
      email,
      passwordHash: hashPassword(password),
      role: 'user',
      isActive: true,
      createdAt: new Date().toISOString()
    };
    db.users.push(newUser);
    saveDb(db);

    const token = createToken(newUser);
    return sendJson(res, 201, {
      ok: true,
      token,
      user: sanitizeUser(newUser)
    });
  }

  if (pathname === '/api/auth/login' && req.method === 'POST') {
    const body = await readJsonBody(req);
    const rawEmail = String(body.email || '').trim().toLowerCase();
    const email = rawEmail === 'admin' ? 'admin@tesflix.com.tr' : rawEmail;
    const password = String(body.password || '').trim();

    const db = loadDb();
    const user = db.users.find(u => u.email.toLowerCase() === email);
    if (!user) {
      return sendJson(res, 401, { ok: false, error: 'Bu e-posta adresine ait kullanıcı bulunamadı.' });
    }
    if (user.isActive === false) {
      return sendJson(res, 403, { ok: false, error: 'Hesabınız yönetici tarafından pasife alınmıştır.' });
    }
    if (user.passwordHash && user.passwordHash !== hashPassword(password)) {
      return sendJson(res, 401, { ok: false, error: 'Hatalı şifre girdiniz.' });
    }

    const token = createToken(user);
    return sendJson(res, 200, {
      ok: true,
      token,
      user: sanitizeUser(user)
    });
  }

  if (pathname === '/api/auth/me' && req.method === 'GET') {
    const user = getAuthUser(req);
    const db = loadDb();
    if (!user) {
      return sendJson(res, 401, {
        ok: false,
        allowRegistration: db.settings?.allowRegistration !== false
      });
    }
    return sendJson(res, 200, {
      ok: true,
      user: sanitizeUser(user),
      allowRegistration: db.settings?.allowRegistration !== false
    });
  }

  // ==========================================================================
  // PUBLIC & USER CHANNELS / SOURCES API
  // ==========================================================================
  if (pathname === '/api/channels' && req.method === 'GET') {
    return sendJson(res, 200, channels);
  }

  if (pathname === '/api/iptv/channels') {
    const user = getAuthUser(req);
    const userId = user ? user.id : 'default';
    if (req.method === 'GET') {
      return sendJson(res, 200, loadUserIptvChannels(userId));
    }
    if (req.method === 'DELETE') {
      saveUserIptvChannels(userId, []);
      return sendJson(res, 200, { ok: true, count: 0 });
    }
  }

  if (pathname === '/api/user/epg' && req.method === 'GET') {
    return sendJson(res, 200, { epg: meta.epg || {} });
  }

  if (pathname === '/api/announcements/active' && req.method === 'GET') {
    return sendJson(res, 200, { announcements: meta.announcements || [] });
  }

  if (pathname === '/api/user/sources') {
    const user = getAuthUser(req);
    const userId = user ? user.id : 'default';
    const db = loadDb();
    if (req.method === 'GET') {
      const userSources = (db.sources || []).filter(s => !s.userId || s.userId === userId);
      return sendJson(res, 200, userSources);
    }
    if (req.method === 'POST') {
      const body = await readJsonBody(req);
      const src = { id: body.id || 'src-' + Date.now(), userId, ...body };
      db.sources.unshift(src);
      saveDb(db);
      return sendJson(res, 201, src);
    }
    if (req.method === 'DELETE') {
      const id = parsedUrl.searchParams.get('id');
      db.sources = (db.sources || []).filter(s => s.id !== id);
      saveDb(db);
      return sendJson(res, 200, { ok: true });
    }
  }

  // Server-side M3U & Xtream IPTV Fetcher/Parser (Saves to current logged-in user)
  if (pathname === '/api/parse-m3u' && req.method === 'POST') {
    const user = getAuthUser(req);
    const userId = user ? user.id : 'default';
    const body = await readJsonBody(req);

    const result = await resolveIptvRequest(body);
    if (!result.ok) {
      return sendJson(res, 502, result);
    }

    const existing = loadUserIptvChannels(userId);
    saveUserIptvChannels(userId, [...result.channels, ...existing].slice(0, 10000));
    return sendJson(res, 200, result);
  }

  // ==========================================================================
  // YOUTUBE TRENDING, SEARCH & PERSONAL ACCOUNT / PLAYLIST SYNC API (/api/youtube/*)
  // ==========================================================================
  if (pathname === '/api/youtube/trending' && req.method === 'GET') {
    const headerCountry = req.headers['cf-ipcountry'] || req.headers['x-country'] || '';
    const acceptLang = String(req.headers['accept-language'] || 'tr-TR');
    const langMatch = acceptLang.match(/([a-z]{2})(?:-([A-Z]{2}))?/i);
    const paramGl = parsedUrl.searchParams.get('gl') || headerCountry || (langMatch && langMatch[2]) || 'TR';
    const paramHl = parsedUrl.searchParams.get('hl') || (langMatch && langMatch[1]) || 'tr';
    const gl = String(paramGl).toUpperCase().replace(/[^A-Z]/g, '').slice(0, 2) || 'TR';
    const hl = String(paramHl).toLowerCase().replace(/[^a-z]/g, '').slice(0, 2) || 'tr';

    const videos = await fetchYoutubeTrendingByCountry(gl, hl);
    return sendJson(res, 200, { ok: true, gl, hl, videos });
  }

  if (pathname === '/api/youtube/search' && req.method === 'GET') {
    const q = String(parsedUrl.searchParams.get('q') || '').trim();
    if (!q) {
      return sendJson(res, 400, { ok: false, error: 'Arama terimi girin.' });
    }
    try {
      let videos = await searchYoutubeInnerTube(q).catch(() => []);
      if (!videos || videos.length === 0) {
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}&hl=tr&gl=TR`;
        const fetched = await fetchRemoteBuffer(searchUrl, {
          timeoutMs: 10000,
          maxBytes: 6 * 1024 * 1024,
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
        });
        videos = extractYoutubeVideosFromHtml(fetched.buffer.toString('utf8'));
      }
      return sendJson(res, 200, { ok: true, videos, results: videos });
    } catch (err) {
      return sendJson(res, 502, { ok: false, error: 'YouTube araması yapılamadı: ' + err.message });
    }
  }

  if (pathname === '/api/youtube/account') {
    const user = getAuthUser(req);
    if (!user) {
      return sendJson(res, 401, { ok: false, error: 'Oturum açmanız gerekiyor.' });
    }
    const db = loadDb();
    const uIdx = db.users.findIndex(u => u.id === user.id);
    if (uIdx < 0) {
      return sendJson(res, 404, { ok: false, error: 'Kullanıcı bulunamadı.' });
    }

    if (req.method === 'GET') {
      return sendJson(res, 200, {
        ok: true,
        youtubeAccount: db.users[uIdx].youtubeAccount || null
      });
    }

    if (req.method === 'POST') {
      const body = await readJsonBody(req);
      const currentAcc = db.users[uIdx].youtubeAccount || {
        handle: '',
        handleOrUrl: '',
        email: '',
        displayName: '',
        channelTitle: '',
        avatarUrl: '',
        connectedAt: new Date().toISOString(),
        myVideos: [],
        homeFeed: [],
        subscriptions: [
          { handle: '@netdmüzik', name: 'netd müzik' },
          { handle: '@TRT1', name: 'TRT 1' },
          { handle: '@beINSPORTSTurkiye', name: 'beIN SPORTS Türkiye' },
          { handle: '@HaberturkTV', name: 'Habertürk TV' }
        ],
        subscriptionVideos: [],
        playlists: [],
        savedVideos: [],
        historyVideos: []
      };

      // Action 1: Connect YouTube account / Google email / @handle / playlist URL
      if (body.action === 'connect') {
        const rawInput = String(body.handleOrUrl || body.input || body.email || '').trim();
        const emailInput = String(
          body.email ||
            (rawInput.includes('@') && rawInput.includes('.') && !rawInput.startsWith('@') ? rawInput : '') ||
            ''
        ).trim();

        let cleanQuery = rawInput;
        if (emailInput && (!rawInput || rawInput === emailInput)) {
          cleanQuery = '@' + emailInput.split('@')[0].replace(/[^a-zA-Z0-9_-]/g, '');
        }

        let detectedTitle = '';
        let detectedAvatar = currentAcc.avatarUrl || '';
        let myChannelVideos = [];
        let playlistImported = null;

        if (cleanQuery) {
          let targetYtUrl = '';
          const plMatch = cleanQuery.match(/[?&]list=([A-Za-z0-9_-]+)/) || (/^PL[A-Za-z0-9_-]+$/.test(cleanQuery) ? [null, cleanQuery] : null);

          if (plMatch && plMatch[1]) {
            targetYtUrl = `https://www.youtube.com/playlist?list=${encodeURIComponent(plMatch[1])}`;
          } else if (/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(cleanQuery)) {
            targetYtUrl = cleanQuery;
            if (targetYtUrl.includes('/@') && !targetYtUrl.endsWith('/videos') && !targetYtUrl.includes('playlist')) {
              targetYtUrl = targetYtUrl.replace(/\/$/, '') + '/videos';
            }
          } else if (cleanQuery.startsWith('@')) {
            targetYtUrl = `https://www.youtube.com/${encodeURIComponent(cleanQuery)}/videos`;
          } else {
            targetYtUrl = `https://www.youtube.com/@${encodeURIComponent(cleanQuery.replace(/\s+/g, ''))}/videos`;
          }

          try {
            const fetched = await fetchRemoteBuffer(targetYtUrl, {
              timeoutMs: 9000,
              maxBytes: 6 * 1024 * 1024,
              userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
            });
            const htmlStr = fetched.buffer.toString('utf8');
            const titleMatch = htmlStr.match(/"channelMetadataRenderer":\{"title":"([^"]+)"/);
            if (titleMatch && titleMatch[1]) {
              detectedTitle = titleMatch[1];
            }
            const avatarMatch = htmlStr.match(/"avatar":\{"thumbnails":\[\{"url":"([^"]+)"/);
            if (avatarMatch && avatarMatch[1]) {
              detectedAvatar = avatarMatch[1];
            }
            myChannelVideos = extractYoutubeVideosFromHtml(htmlStr);

            if (plMatch && plMatch[1] && myChannelVideos.length > 0) {
              playlistImported = {
                id: plMatch[1],
                title: body.displayName || detectedTitle || 'YouTube Oynatma Listem',
                url: targetYtUrl,
                videoCount: myChannelVideos.length,
                videos: myChannelVideos.slice(0, 50)
              };
            }
          } catch {}

          // If @handle had no public videos or is a personal account, search YouTube by user's handle/name
          if (myChannelVideos.length === 0) {
            try {
              const searchName = cleanQuery.replace(/^@/, '') || 'Türkçe Pop 2026';
              myChannelVideos = await searchYoutubeInnerTube(searchName);
            } catch {}
          }
        }

        // Fetch Personalized Home Feed & Subscription Videos in parallel
        const subs = Array.isArray(currentAcc.subscriptions) && currentAcc.subscriptions.length > 0
          ? currentAcc.subscriptions
          : [
              { handle: '@netdmüzik', name: 'netd müzik' },
              { handle: '@TRT1', name: 'TRT 1' },
              { handle: '@beINSPORTSTurkiye', name: 'beIN SPORTS Türkiye' },
              { handle: '@HaberturkTV', name: 'Habertürk TV' }
            ];

        const [homeFeedRes, subFeedRes] = await Promise.all([
          searchYoutubeInnerTube('Türkiye trend müzik klip spor haber 2026').catch(() => []),
          searchYoutubeInnerTube(subs.map(s => s.name).slice(0, 3).join(' | ') + ' son videolar').catch(() => [])
        ]);

        const rawDisplayName = String(body.displayName || '').trim();
        const isGenericAdminName =
          !rawDisplayName ||
          rawDisplayName === user.name ||
          rawDisplayName === 'Sistem Yöneticisi' ||
          rawDisplayName === 'Sistem Yöneticisi YouTube';
        const fallbackLabel =
          detectedTitle ||
          (emailInput ? emailInput.split('@')[0] : '') ||
          (cleanQuery ? cleanQuery.replace(/^@/, '') : '') ||
          'YouTube Hesabım';
        const finalDisplayName = isGenericAdminName ? fallbackLabel : rawDisplayName;

        const existingSavedIds = new Set((currentAcc.savedVideos || []).map(v => v.videoId));
        const mergedSaved = [
          ...myChannelVideos.slice(0, 12).filter(v => !existingSavedIds.has(v.videoId)),
          ...(currentAcc.savedVideos || [])
        ].slice(0, 100);

        const playlists = Array.isArray(currentAcc.playlists) ? [...currentAcc.playlists] : [];
        if (playlistImported && !playlists.some(p => p.id === playlistImported.id)) {
          playlists.unshift(playlistImported);
        } else if (playlists.length === 0 && myChannelVideos.length > 0) {
          playlists.push({
            id: 'pl-favorilerim',
            title: `${finalDisplayName} - Araç İçi Seçkilerim`,
            url: '',
            videoCount: Math.min(myChannelVideos.length, 20),
            videos: myChannelVideos.slice(0, 20)
          });
        }

        const safePrevEmail = currentAcc.email && currentAcc.email !== user.email ? currentAcc.email : '';
        db.users[uIdx].youtubeAccount = {
          handle: cleanQuery ? (cleanQuery.startsWith('@') ? cleanQuery : '@' + cleanQuery.replace(/[^a-zA-Z0-9_-]/g, '')) : '@youtube',
          handleOrUrl: rawInput || cleanQuery || '@youtube',
          email: emailInput || safePrevEmail || '',
          displayName: finalDisplayName,
          channelTitle: finalDisplayName,
          avatarUrl: detectedAvatar,
          connectedAt: new Date().toISOString(),
          myVideos: myChannelVideos.slice(0, 36),
          homeFeed: (homeFeedRes.length > 0 ? homeFeedRes : myChannelVideos).slice(0, 36),
          subscriptions: subs,
          subscriptionVideos: (subFeedRes.length > 0 ? subFeedRes : homeFeedRes).slice(0, 36),
          playlists,
          savedVideos: mergedSaved,
          historyVideos: currentAcc.historyVideos || []
        };
        saveDb(db);
        return sendJson(res, 200, {
          ok: true,
          youtubeAccount: db.users[uIdx].youtubeAccount,
          importedCount: myChannelVideos.length
        });
      }

      // Action 1b: Refresh Personal Feed / Category Filter
      if (body.action === 'refresh_feed') {
        const topic = String(body.topic || 'Türkiye trend videolar müzik 2026').trim();
        const feedVideos = await searchYoutubeInnerTube(topic).catch(() => []);
        currentAcc.homeFeed = feedVideos.slice(0, 36);
        currentAcc.activeTopic = body.topicLabel || 'Tümü';
        db.users[uIdx].youtubeAccount = currentAcc;
        saveDb(db);
        return sendJson(res, 200, { ok: true, youtubeAccount: currentAcc });
      }

      // Action 1c: Add / Import a YouTube Playlist or Channel
      if (body.action === 'add_playlist') {
        const plUrlOrName = String(body.playlistUrl || '').trim();
        const plTitle = String(body.title || 'YouTube Oynatma Listem').trim();
        if (!plUrlOrName) {
          return sendJson(res, 400, { ok: false, error: 'Oynatma listesi URL veya adı girin.' });
        }
        let plVideos = [];
        const plMatch = plUrlOrName.match(/[?&]list=([A-Za-z0-9_-]+)/) || (/^PL[A-Za-z0-9_-]+$/.test(plUrlOrName) ? [null, plUrlOrName] : null);
        if (plMatch && plMatch[1]) {
          try {
            const targetUrl = `https://www.youtube.com/playlist?list=${encodeURIComponent(plMatch[1])}`;
            const fetched = await fetchRemoteBuffer(targetUrl, {
              timeoutMs: 10000,
              maxBytes: 6 * 1024 * 1024,
              userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0'
            });
            plVideos = extractYoutubeVideosFromHtml(fetched.buffer.toString('utf8'));
          } catch {}
        }
        if (plVideos.length === 0) {
          plVideos = await searchYoutubeInnerTube(plUrlOrName).catch(() => []);
        }
        const newPl = {
          id: (plMatch && plMatch[1]) || 'pl-' + Date.now(),
          title: plTitle,
          url: plUrlOrName,
          videoCount: plVideos.length,
          videos: plVideos.slice(0, 40)
        };
        currentAcc.playlists = [newPl, ...(currentAcc.playlists || [])];
        db.users[uIdx].youtubeAccount = currentAcc;
        saveDb(db);
        return sendJson(res, 200, { ok: true, youtubeAccount: currentAcc });
      }

      // Action 1d: Add or Remove Subscription Channel
      if (body.action === 'add_subscription') {
        const chInput = String(body.channel || '').trim();
        if (!chInput) {
          return sendJson(res, 400, { ok: false, error: 'Kanal adı veya @kullanıcıadı girin.' });
        }
        const handle = chInput.startsWith('@') ? chInput : '@' + chInput.replace(/\s+/g, '');
        const subs = Array.isArray(currentAcc.subscriptions) ? currentAcc.subscriptions : [];
        if (!subs.some(s => s.handle.toLowerCase() === handle.toLowerCase())) {
          subs.unshift({ handle, name: chInput.replace(/^@/, '') });
        }
        currentAcc.subscriptions = subs;
        const newVideos = await searchYoutubeInnerTube(`${chInput} son videolar`).catch(() => []);
        currentAcc.subscriptionVideos = [...newVideos, ...(currentAcc.subscriptionVideos || [])].slice(0, 40);
        db.users[uIdx].youtubeAccount = currentAcc;
        saveDb(db);
        return sendJson(res, 200, { ok: true, youtubeAccount: currentAcc });
      }

      if (body.action === 'remove_subscription') {
        const handle = String(body.handle || '').trim();
        currentAcc.subscriptions = (currentAcc.subscriptions || []).filter(s => s.handle !== handle);
        db.users[uIdx].youtubeAccount = currentAcc;
        saveDb(db);
        return sendJson(res, 200, { ok: true, youtubeAccount: currentAcc });
      }

      // Action 1e: Record watched video into history
      if (body.action === 'add_history' && body.video && body.video.videoId) {
        const hist = (currentAcc.historyVideos || []).filter(v => v.videoId !== body.video.videoId);
        hist.unshift({
          id: 'yth-' + body.video.videoId,
          videoId: body.video.videoId,
          title: body.video.title || 'YouTube Video',
          channel: body.video.channel || 'YouTube',
          duration: body.video.duration || 'VİDEO',
          watchedAt: new Date().toISOString()
        });
        currentAcc.historyVideos = hist.slice(0, 50);
        db.users[uIdx].youtubeAccount = currentAcc;
        saveDb(db);
        return sendJson(res, 200, { ok: true, youtubeAccount: currentAcc });
      }

      // Action 2: Save a video to personal YouTube library
      if (body.action === 'save_video' && body.video && body.video.videoId) {
        const list = currentAcc.savedVideos || [];
        if (!list.some(v => v.videoId === body.video.videoId)) {
          list.unshift({
            id: 'yt-' + body.video.videoId,
            videoId: body.video.videoId,
            title: body.video.title || 'YouTube Video',
            channel: body.video.channel || 'YouTube',
            duration: body.video.duration || 'VİDEO',
            views: body.video.views || '',
            cat: 'Kitaplığım'
          });
        }
        currentAcc.savedVideos = list.slice(0, 100);
        if (!currentAcc.channelTitle) currentAcc.channelTitle = user.name + ' YouTube Kitaplığı';
        db.users[uIdx].youtubeAccount = currentAcc;
        saveDb(db);
        return sendJson(res, 200, { ok: true, youtubeAccount: currentAcc });
      }

      // Action 3: Remove a saved video
      if (body.action === 'remove_video' && body.videoId) {
        currentAcc.savedVideos = (currentAcc.savedVideos || []).filter(v => v.videoId !== body.videoId);
        db.users[uIdx].youtubeAccount = currentAcc;
        saveDb(db);
        return sendJson(res, 200, { ok: true, youtubeAccount: currentAcc });
      }

      // Action 4: Disconnect YouTube account
      if (body.action === 'disconnect') {
        db.users[uIdx].youtubeAccount = null;
        saveDb(db);
        return sendJson(res, 200, { ok: true, youtubeAccount: null });
      }
    }
  }

  // ==========================================================================
  // ADMIN CONTROL PANEL API (/api/admin/*)
  // ==========================================================================
  if (pathname.startsWith('/api/admin/')) {
    const adminUser = getAuthUser(req);
    if (!adminUser || adminUser.role !== 'admin') {
      return sendJson(res, 403, { ok: false, error: 'Bu işlem için Yönetici (Admin) yetkisi gereklidir.' });
    }

    const db = loadDb();

    // GET /api/admin/overview
    if (pathname === '/api/admin/overview' && req.method === 'GET') {
      return sendJson(res, 200, {
        ok: true,
        stats: {
          totalUsers: db.users.length,
          activeUsers: db.users.filter(u => u.isActive !== false).length,
          publicChannelsCount: channels.length,
          totalSources: (db.sources || []).length,
          announcementsCount: (meta.announcements || []).length
        },
        settings: db.settings || { allowRegistration: true, requireLogin: true },
        users: db.users.map(sanitizeUser),
        announcements: meta.announcements || []
      });
    }

    // PUT /api/admin/settings
    if (pathname === '/api/admin/settings' && req.method === 'PUT') {
      const body = await readJsonBody(req);
      db.settings = {
        ...(db.settings || {}),
        ...body
      };
      saveDb(db);
      return sendJson(res, 200, { ok: true, settings: db.settings });
    }

    // POST /api/admin/users (Create user from Admin panel)
    if (pathname === '/api/admin/users' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '').trim();
      const name = String(body.name || email.split('@')[0] || 'Kullanıcı').trim();
      const role = body.role === 'admin' ? 'admin' : 'user';

      if (!email || !password) {
        return sendJson(res, 400, { ok: false, error: 'E-posta ve şifre zorunludur.' });
      }
      if (db.users.some(u => u.email.toLowerCase() === email)) {
        return sendJson(res, 409, { ok: false, error: 'Bu e-posta zaten kayıtlı.' });
      }

      const newUser = {
        id: 'usr-' + Date.now(),
        name,
        email,
        passwordHash: hashPassword(password),
        role,
        isActive: true,
        createdAt: new Date().toISOString()
      };
      db.users.push(newUser);
      saveDb(db);
      return sendJson(res, 201, { ok: true, user: sanitizeUser(newUser) });
    }

    // PUT or DELETE /api/admin/users/:id
    if (pathname.startsWith('/api/admin/users/')) {
      const parts = pathname.split('/');
      const targetUserId = decodeURIComponent(parts[4] || '');
      const subAction = parts[5] || '';

      const userIdx = db.users.findIndex(u => u.id === targetUserId);
      if (userIdx < 0) {
        return sendJson(res, 404, { ok: false, error: 'Kullanıcı bulunamadı.' });
      }

      // Remote IPTV assignment: POST /api/admin/users/:id/assign-iptv
      if (subAction === 'assign-iptv' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const result = await resolveIptvRequest(body);
        if (!result.ok) {
          return sendJson(res, 502, result);
        }
        const existing = loadUserIptvChannels(targetUserId);
        saveUserIptvChannels(targetUserId, [...result.channels, ...existing].slice(0, 10000));

        const src = {
          id: 'src-' + Date.now(),
          userId: targetUserId,
          type: result.sourceType || 'm3u',
          name: body.name || 'Admin IPTV Paketi',
          url: body.url || body.server || 'Admin Tanımlı',
          channelCount: result.channels.length,
          createdAt: new Date().toISOString()
        };
        db.sources.unshift(src);
        saveDb(db);

        return sendJson(res, 200, {
          ok: true,
          count: result.channels.length,
          user: sanitizeUser(db.users[userIdx])
        });
      }

      // Clear user's IPTV channels: DELETE /api/admin/users/:id/clear-iptv
      if (subAction === 'clear-iptv' && req.method === 'DELETE') {
        saveUserIptvChannels(targetUserId, []);
        db.sources = (db.sources || []).filter(s => s.userId !== targetUserId);
        saveDb(db);
        return sendJson(res, 200, { ok: true, user: sanitizeUser(db.users[userIdx]) });
      }

      if (req.method === 'PUT') {
        const body = await readJsonBody(req);
        const u = db.users[userIdx];
        if (typeof body.name === 'string' && body.name.trim()) u.name = body.name.trim();
        if (typeof body.role === 'string') u.role = body.role === 'admin' ? 'admin' : 'user';
        if (typeof body.isActive === 'boolean') u.isActive = body.isActive;
        if (typeof body.password === 'string' && body.password.trim().length >= 4) {
          u.passwordHash = hashPassword(body.password.trim());
        }
        saveDb(db);
        return sendJson(res, 200, { ok: true, user: sanitizeUser(u) });
      }

      if (req.method === 'DELETE') {
        if (db.users[userIdx].email === 'admin@tesflix.com.tr' || db.users[userIdx].email === 'admin@sefirox.com') {
          return sendJson(res, 400, { ok: false, error: 'Ana yönetici hesabı silinemez.' });
        }
        db.users.splice(userIdx, 1);
        saveUserIptvChannels(targetUserId, []);
        saveDb(db);
        return sendJson(res, 200, { ok: true });
      }
    }

    // POST /api/admin/channels (Add new public channel)
    if (pathname === '/api/admin/channels' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const name = String(body.name || '').trim();
      const stream_url = String(body.stream_url || '').trim();
      const category = String(body.category || 'ULUSAL').trim().toUpperCase();
      const logo_url = String(body.logo_url || '').trim();
      const epg_id = String(body.epg_id || '').trim();

      if (!name || !stream_url) {
        return sendJson(res, 400, { ok: false, error: 'Kanal adı ve yayın URL (stream_url) zorunludur.' });
      }

      const newCh = {
        id: 'ch-' + Date.now(),
        name,
        category,
        stream_url,
        logo_url,
        epg_id,
        country: 'TR'
      };
      channels.unshift(newCh);
      savePublicChannels();
      return sendJson(res, 201, { ok: true, channel: newCh, total: channels.length });
    }

    // PUT or DELETE /api/admin/channels/:id
    if (pathname.startsWith('/api/admin/channels/')) {
      const chId = decodeURIComponent(pathname.replace('/api/admin/channels/', ''));
      const idx = channels.findIndex(c => String(c.id) === String(chId));
      if (idx < 0) {
        return sendJson(res, 404, { ok: false, error: 'Kanal bulunamadı.' });
      }

      if (req.method === 'PUT') {
        const body = await readJsonBody(req);
        channels[idx] = {
          ...channels[idx],
          name: body.name ? String(body.name).trim() : channels[idx].name,
          category: body.category ? String(body.category).trim().toUpperCase() : channels[idx].category,
          stream_url: body.stream_url ? String(body.stream_url).trim() : channels[idx].stream_url,
          logo_url: typeof body.logo_url === 'string' ? body.logo_url.trim() : channels[idx].logo_url,
          epg_id: typeof body.epg_id === 'string' ? body.epg_id.trim() : channels[idx].epg_id
        };
        savePublicChannels();
        return sendJson(res, 200, { ok: true, channel: channels[idx] });
      }

      if (req.method === 'DELETE') {
        channels.splice(idx, 1);
        savePublicChannels();
        return sendJson(res, 200, { ok: true, total: channels.length });
      }
    }

    // POST or DELETE /api/admin/announcements
    if (pathname === '/api/admin/announcements' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const title = String(body.title || 'DUYURU').trim();
      const message = String(body.message || '').trim();
      if (!message) {
        return sendJson(res, 400, { ok: false, error: 'Duyuru mesajı boş olamaz.' });
      }
      const ann = {
        id: 'ann-' + Date.now(),
        title,
        message,
        createdAt: new Date().toISOString()
      };
      meta.announcements = [ann, ...(meta.announcements || [])];
      saveMeta();
      return sendJson(res, 201, { ok: true, announcements: meta.announcements });
    }

    if (pathname.startsWith('/api/admin/announcements/') && req.method === 'DELETE') {
      const annId = decodeURIComponent(pathname.replace('/api/admin/announcements/', ''));
      meta.announcements = (meta.announcements || []).filter(a => String(a.id) !== String(annId));
      saveMeta();
      return sendJson(res, 200, { ok: true, announcements: meta.announcements });
    }
  }

  // Live Stream Proxy for .ts and .m3u8 IPTV streams
  if (pathname === '/api/stream' && req.method === 'GET') {
    const streamUrl = parsedUrl.searchParams.get('url') || '';
    return handleStreamProxy(req, res, streamUrl);
  }

  // Logo Proxy + Automatic Broadcast SVG Badge Fallback
  if (pathname === '/api/logo' && req.method === 'GET') {
    const targetUrl = parsedUrl.searchParams.get('url') || '';
    const name = parsedUrl.searchParams.get('name') || 'TV';
    const cat = parsedUrl.searchParams.get('cat') || 'ULUSAL';

    if (targetUrl && /^https?:\/\//i.test(targetUrl)) {
      if (logoCache.has(targetUrl)) {
        const cached = logoCache.get(targetUrl);
        res.writeHead(200, {
          'Content-Type': cached.contentType,
          'Cache-Control': 'public, max-age=86400',
          'Access-Control-Allow-Origin': '*'
        });
        return res.end(cached.buffer);
      }
      try {
        const fetched = await fetchRemoteBuffer(targetUrl, {
          timeoutMs: 3500,
          maxBytes: 2 * 1024 * 1024,
          userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/126.0.0.0'
        });
        if (fetched && fetched.buffer.length > 64 && !fetched.contentType.includes('text/html')) {
          logoCache.set(targetUrl, fetched);
          res.writeHead(200, {
            'Content-Type': fetched.contentType,
            'Cache-Control': 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*'
          });
          return res.end(fetched.buffer);
        }
      } catch {}
    }

    const svg = generateSvgLogo(name, cat);
    res.writeHead(200, {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*'
    });
    return res.end(svg);
  }

  // Special Tesla endpoints
  if (pathname === '/silent.wav') {
    res.writeHead(200, {
      'Content-Type': 'audio/wav',
      'Content-Length': SILENT_WAV.length,
      'Cache-Control': 'public, max-age=86400'
    });
    return res.end(SILENT_WAV);
  }

  if (pathname === '/llms.txt') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end(LLMS_TXT);
  }

  // Serve static files from public/
  const safeSuffix = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  let filePath = path.join(PUBLIC_DIR, safeSuffix);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    return fs.createReadStream(filePath).pipe(res);
  }

  // SPA fallback to index.html for client-side routes (/dashboard, /admin, /watch/:id, /auth/*, etc.)
  const indexHtml = path.join(PUBLIC_DIR, 'index.html');
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-cache'
  });
  return fs.createReadStream(indexHtml).pipe(res);
});

server.listen(PORT, () => {
  console.log(`⚡ Tesflix Server running at http://localhost:${PORT}`);
});
