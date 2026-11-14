// ============================================================================
// SEFIROX CLONE — COMPLETE SPA APPLICATION (TESLA & CONNECTED CAR OPTIMIZED)
// ============================================================================

const STORAGE_KEYS = {
  THEME: 'sfx_theme',
  UI_MODE: 'sfx_ui',
  FAVS: 'sfx_favs',
  SOURCES: 'sfx_sources',
  CUSTOM_CHANNELS: 'sfx_custom_channels',
  EPG_ENABLED: 'sfx_epg_enabled',
  PROXY_REGION: 'sfx_proxy_region',
  CAT_CONFIG: 'sfx_cat_config',
  USER: 'sfx_user',
  TOKEN: 'sfx_token',
  ANNOUNCEMENT_DISMISSED: 'sfx_ann_dismissed',
  IPTV_BAR_OPEN: 'sfx_iptv_bar_open'
};

const THEMES = [
  { id: 'dark', name: 'Gece (Varsayılan)', desc: 'Derin mor-siyah Tesflix imzası', swatch: 'linear-gradient(135deg,#090710,#1e1738,#ff3568)' },
  { id: 'light', name: 'Gündüz (Açık)', desc: 'Parlak kabin / gündüz sürüşü', swatch: 'linear-gradient(135deg,#faf7ff,#e7ddff,#9333ea)' },
  { id: 'oled', name: 'Tam Siyah (OLED)', desc: 'Sıfır parlama, saf siyah arka plan', swatch: 'linear-gradient(135deg,#000000,#0c0a12,#c060ff)' },
  { id: 'graphite', name: 'Grafit (Tesla)', desc: 'Tesla MCU3 gri-mavi kokpit uyumu', swatch: 'linear-gradient(135deg,#121316,#232730,#3b82f6)' },
  { id: 'ember', name: 'Köz (Gece Sürüşü)', desc: 'Göz yormayan sıcak kehribar-kırmızı', swatch: 'linear-gradient(135deg,#0f0806,#281510,#f97316)' },
  { id: 'aurora', name: 'Kuzey Işığı', desc: 'Zümrüt ve siber camgöbeği', swatch: 'linear-gradient(135deg,#050d10,#102a34,#10b981)' }
];

const UI_MODES = [
  { id: 'mevcut', name: 'Mevcut (Klasik)', desc: 'Üst sekme çubuğu + sol kategori menüsü' },
  { id: 'kull1', name: 'Kullanım 1 (Dock)', desc: 'Alt yüzen uygulama dock çubuğu + tam ekran' },
  { id: 'kull2', name: 'Kullanım 2 (Bölünmüş)', desc: 'Sol canlı önizleme oynatıcı + sağ kanal ızgarası' },
  { id: 'kull3', name: 'Kullanım 3 (Minimal)', desc: 'Tek satır kompakt başlık + maksimum kart alanı' }
];

const YOUTUBE_CURATED = [
  { id: 'yt-1', title: '4K Scenic Drive — Swiss Alps Mountain Pass', channel: 'Scenic Relaxation', views: '4.2M', duration: '1:14:20', videoId: 'linlz7-Pnvw', cat: 'Sürüş & Doğa' },
  { id: 'yt-2', title: 'Lofi Hip Hop Radio — Beats to Drive / Relax To', channel: 'Lofi Girl', views: 'CANLI', duration: 'LIVE', videoId: 'jfKfPfyJRdk', cat: 'Müzik' },
  { id: 'yt-3', title: 'Tesla Cybercab & FSD Unsupervised Teknoloji Analizi', channel: 'OtoTekno TR', views: '310B', duration: '24:15', videoId: '6v2L2UGZJAM', cat: 'Teknoloji' },
  { id: 'yt-4', title: '8K Dolby Atmos Test — OLED Kontrast & Ses', channel: 'Jacob + Katie Schwarz', views: '18M', duration: '05:13', videoId: 'LXb3EKWsInQ', cat: 'Test & Demo' },
  { id: 'yt-5', title: 'Synthwave Night Drive Mix — Retro Future', channel: 'The Prime Thanatos', views: '1.9M', duration: '58:40', videoId: '4xDzrJKXOOY', cat: 'Müzik' },
  { id: 'yt-6', title: 'NASA ISS Canlı Dünya Görünümü (HD Uzay Yayını)', channel: 'NASA Live', views: 'CANLI', duration: 'LIVE', videoId: 'P9C25Un7xaM', cat: 'Bilim' }
];

const TWITCH_FEATURED = [
  { channel: 'elraenn', title: 'Gece Sohbeti & Oyun Maratonu', game: 'Just Chatting', viewers: '34.2B' },
  { channel: 'wtcn', title: 'Rekabetçi Turnuva Hazırlığı', game: 'Valorant', viewers: '18.5B' },
  { channel: 'jahrein', title: 'Gündem Değerlendirmesi & İnceleme', game: 'Just Chatting', viewers: '12.1B' },
  { channel: 'fextralife', title: 'RPG Marathon & Drops Enabled', game: 'Action RPG', viewers: '22.4B' }
];

const KICK_FEATURED = [
  { channel: 'elraenn', title: 'Kick Özel Canlı Yayın', category: 'IRL / Sohbet', viewers: '41.0B' },
  { channel: 'cordiseps', title: 'Sim Racing Kokpit Yayını — Nürburgring', category: 'Assetto Corsa', viewers: '6.8B' },
  { channel: 'mithrain', title: 'Squad Duo & Taktiksel Yayın', category: 'PUBG', viewers: '9.4B' },
  { channel: 'xqc', title: 'Late Night Variety Stream', category: 'Just Chatting', viewers: '52.3B' }
];

const SAMPLE_VOD_MOVIES = [
  { id: 'vod-m1', name: 'Interstellar: Yıldızlararası (4K Remastered)', category: 'BİLİM KURGU', rating: '8.7', year: '2014', stream_url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  { id: 'vod-m2', name: 'Le Mans 66: Asfaltın Kralları', category: 'AKSİYON / YARIŞ', rating: '8.1', year: '2019', stream_url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  { id: 'vod-m3', name: 'Big Buck Bunny (1080p HLS Test)', category: 'ANİMASYON', rating: '7.9', year: '2024', stream_url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  { id: 'vod-m4', name: 'Sintel — Open Movie (Dolby HLS)', category: 'FANTASTİK', rating: '8.0', year: '2023', stream_url: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8' }
];

const SAMPLE_VOD_SERIES = [
  { id: 'vod-s1', name: 'Drive to Survive — S06E01', category: 'BELGESEL DİZİ', rating: '8.6', year: 'S06', stream_url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  { id: 'vod-s2', name: 'Cyberpunk: Edgerunners — S01E01', category: 'BİLİM KURGU', rating: '8.4', year: 'S01', stream_url: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8' },
  { id: 'vod-s3', name: 'Top Gear Electric Specials — S01E02', category: 'OTOMOBİL', rating: '8.2', year: 'S01', stream_url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' }
];

// Global Reactive State
const state = {
  route: window.location.pathname || '/',
  channels: [],
  customChannels: loadJson(STORAGE_KEYS.CUSTOM_CHANNELS, []),
  epg: {},
  announcements: [],
  announcementDismissed: sessionStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT_DISMISSED) === '1',
  theme: localStorage.getItem(STORAGE_KEYS.THEME) || 'dark',
  uiMode: localStorage.getItem(STORAGE_KEYS.UI_MODE) || 'mevcut',
  favs: loadJson(STORAGE_KEYS.FAVS, []),
  sources: loadJson(STORAGE_KEYS.SOURCES, []),
  epgEnabled: localStorage.getItem(STORAGE_KEYS.EPG_ENABLED) !== '0',
  proxyRegion: localStorage.getItem(STORAGE_KEYS.PROXY_REGION) || 'TR',
  catConfig: loadJson(STORAGE_KEYS.CAT_CONFIG, {}),
  user: loadJson(STORAGE_KEYS.USER, null),
  token: localStorage.getItem(STORAGE_KEYS.TOKEN) || '',
  authMode: 'login', // 'login' | 'register'

  // Admin Panel state
  adminTab: 'users', // 'users' | 'channels' | 'announcements'
  adminOverview: null,
  adminAssignUserId: null,
  adminEditingChannel: null,
  adminChannelSearch: '',

  // Landing Page UI state
  landingTab: 'public', // 'public' | 'mine'
  landingCategory: 'TÜMÜ',
  landingSearch: '',
  iptvQuickBarOpen: localStorage.getItem(STORAGE_KEYS.IPTV_BAR_OPEN) !== '0',
  iptvQuickMode: 'm3u_url', // 'm3u_url' | 'xtream' | 'm3u_file'
  visibleLimit: 120,
  iptvLoading: false,

  // Dashboard UI state
  dashTab: 'live', // 'live' | 'movies' | 'series' | 'favs' | 'youtube' | 'twitch' | 'kick' | 'nav'
  dashCategory: 'TÜMÜ',
  dashSearch: '',
  selectedYoutubeId: null,
  selectedYoutubeTitle: '',
  ytSearchQuery: '',
  ytSearchResults: [],
  ytSearching: false,
  ytTrendingVideos: [],
  ytTrendingLoading: false,
  ytCountry: '',
  ytDriveProtect: true,
  ytConnectOpen: false,
  ytGoogleModalOpen: false,
  ytGoogleWaitingPopup: false,
  ytLoginEmailDraft: '',
  ytListTab: 'trending', // 'trending' | 'home' | 'my_videos' | 'subscriptions' | 'playlists' | 'account' | 'search'
  selectedTwitchChannel: TWITCH_FEATURED[0].channel,
  selectedKickChannel: KICK_FEATURED[0].channel,
  pipNavOpen: false,
  splitPreviewChannelId: null,

  // Sources Page UI state
  m3uSubTab: 'url', // 'url' | 'file'

  // Watch Page state
  watchDrawerOpen: true,
  watchCanvasMode: false,
  watchLowLatency: true,
  activeHls: null,
  activeMpegts: null,
  canvasAnimFrame: null,

  // Clock
  clockStr: formatClock()
};

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    // ignore storage quota errors
  }
}

function authHeaders(extra = {}) {
  const headers = { ...extra };
  if (state.token) {
    headers['Authorization'] = `Bearer ${state.token}`;
  }
  return headers;
}

async function loadUserSessionData() {
  try {
    const [iptvRes, srcRes] = await Promise.all([
      fetch('/api/iptv/channels', { headers: authHeaders() }).catch(() => null),
      fetch('/api/user/sources', { headers: authHeaders() }).catch(() => null)
    ]);
    if (iptvRes && iptvRes.ok) {
      const list = await iptvRes.json();
      state.customChannels = Array.isArray(list) ? list : [];
    }
    if (srcRes && srcRes.ok) {
      const srcs = await srcRes.json();
      state.sources = Array.isArray(srcs) ? srcs : [];
    }
  } catch {}
}

async function fetchAdminOverview() {
  if (!state.user || state.user.role !== 'admin') return;
  try {
    const res = await fetch('/api/admin/overview', { headers: authHeaders() });
    if (res.ok) {
      state.adminOverview = await res.json();
      render();
    }
  } catch {}
}

function formatClock() {
  const now = new Date();
  return now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function showToast(msg) {
  const existing = document.querySelector('.sfx-toast');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.className = 'sfx-toast';
  el.innerHTML = `<span class="sfx-dot"></span><span>${escapeHtml(msg)}</span>`;
  document.body.appendChild(el);
  setTimeout(() => {
    el.remove();
  }, 3400);
}

// Apply theme and UI mode attributes to <html>
function applyThemeAndUi(theme = state.theme, uiMode = state.uiMode) {
  state.theme = theme;
  state.uiMode = uiMode;
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('data-ui', uiMode);
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
  localStorage.setItem(STORAGE_KEYS.UI_MODE, uiMode);
}

// Get combined list of channels (public + custom IPTV imported)
function getAllChannels() {
  return [...state.customChannels, ...state.channels];
}

// Helper to get channel logo URL and fallback proxy URL
function getChannelLogoUrls(ch) {
  const rawUrl = (ch.logo_url || ch.logo || '').trim();
  const fallbackUrl = `/api/logo?url=${encodeURIComponent(rawUrl)}&name=${encodeURIComponent(ch.name || 'TV')}&cat=${encodeURIComponent(ch.category || 'ULUSAL')}`;
  return {
    primary: rawUrl || fallbackUrl,
    fallback: fallbackUrl
  };
}

// Helper to get EPG program info for a channel
function getChannelEpg(ch) {
  if (!state.epgEnabled) return null;
  const key = ch.epg_id || ch.epg_channel_id || ch.id;
  if (!key || !state.epg) return null;
  const entry = state.epg[key];
  if (!entry) return null;
  // In meta.json, epg entries can be { current: { title, start, stop, progress } } or direct
  const cur = entry.current || entry;
  if (!cur || !cur.title) return null;

  let progress = typeof cur.progress === 'number' ? cur.progress : 48;
  let timeRange = '';
  if (cur.start && cur.stop) {
    try {
      const s = new Date(cur.start);
      const e = new Date(cur.stop);
      const now = Date.now();
      if (!isNaN(s) && !isNaN(e) && e > s) {
        progress = Math.max(5, Math.min(96, Math.round(((now - s.getTime()) / (e.getTime() - s.getTime())) * 100)));
        const fmt = d => d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        timeRange = `${fmt(s)} - ${fmt(e)}`;
      }
    } catch {
      // keep default
    }
  }
  return {
    title: cur.title,
    progress,
    timeRange: timeRange || 'CANLI'
  };
}

// Get ordered and renamed categories
function getCategories(channelList) {
  const rawSet = new Set();
  channelList.forEach(c => {
    if (c.category) rawSet.add(c.category);
  });
  const list = Array.from(rawSet);
  return ['TÜMÜ', ...list];
}

function getCategoryDisplayName(cat) {
  if (cat === 'TÜMÜ') return 'TÜMÜ';
  return (state.catConfig[cat] && state.catConfig[cat].alias) || cat;
}

function toggleFav(channelId, ev) {
  if (ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  const idx = state.favs.indexOf(channelId);
  if (idx >= 0) {
    state.favs.splice(idx, 1);
    showToast('Favorilerden çıkarıldı');
  } else {
    state.favs.push(channelId);
    showToast('⭐ Favorilere eklendi');
  }
  saveJson(STORAGE_KEYS.FAVS, state.favs);
  render();
}

// Navigate SPA
function navigate(path) {
  cleanupMediaPlayers();
  state.route = path;
  window.history.pushState({}, '', path);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
}

window.addEventListener('popstate', () => {
  cleanupMediaPlayers();
  state.route = window.location.pathname || '/';
  render();
});

function cleanupMediaPlayers() {
  if (state.activeHls) {
    try {
      state.activeHls.destroy();
    } catch {}
    state.activeHls = null;
  }
  if (state.activeMpegts) {
    try {
      state.activeMpegts. pause();
      state.activeMpegts.unload();
      state.activeMpegts.detachMediaElement();
      state.activeMpegts.destroy();
    } catch {}
    state.activeMpegts = null;
  }
  if (state.canvasAnimFrame) {
    cancelAnimationFrame(state.canvasAnimFrame);
    state.canvasAnimFrame = null;
  }
}

// ============================================================================
// SHARED COMPONENT RENDERERS
// ============================================================================

function renderChannelCard(ch) {
  const isFav = state.favs.includes(ch.id);
  const { primary, fallback } = getChannelLogoUrls(ch);
  const glyph = (ch.name || 'TV').slice(0, 3).toUpperCase();

  return `
    <a href="/watch/${encodeURIComponent(ch.id)}" class="sfx-card" data-nav="/watch/${escapeHtml(ch.id)}" data-channel-id="${escapeHtml(ch.id)}">
      <div class="sfx-glyph">${escapeHtml(glyph)}</div>
      <img
        class="sfx-logo"
        src="${escapeHtml(primary)}"
        alt="${escapeHtml(ch.name)}"
        loading="lazy"
        referrerpolicy="no-referrer"
        onload="if(this.previousElementSibling) this.previousElementSibling.style.opacity='0.05';"
        onerror="if(this.src !== window.location.origin + '${escapeHtml(fallback)}'){ this.src='${escapeHtml(fallback)}'; } else { this.style.display='none'; if(this.previousElementSibling) this.previousElementSibling.style.opacity='1'; }"
      />
      <button type="button" class="sfx-fav ${isFav ? 'on' : ''}" data-fav-btn="${escapeHtml(ch.id)}" title="Favorilere Ekle">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </button>
      <div class="sfx-info">
        <h3>${escapeHtml(ch.name)}</h3>
        <div class="cat-lbl">${escapeHtml(getCategoryDisplayName(ch.category || 'ULUSAL'))}</div>
      </div>
    </a>
  `;
}

// Clean IPTV Input Bar (only shown inside the "Kanallarım (IPTV)" tab)
function renderQuickIptvPanel() {
  return `
    <div class="sfx-scard" style="margin-bottom:20px; padding:16px 18px;">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:12px;">
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          <button type="button" class="sfx-btn ${state.iptvQuickMode === 'm3u_url' ? 'sfx-btn-primary' : ''}" data-iptv-mode="m3u_url" style="padding:7px 13px; font-size:0.8rem;">
            🔗 M3U Linki Ekle
          </button>
          <button type="button" class="sfx-btn ${state.iptvQuickMode === 'xtream' ? 'sfx-btn-primary' : ''}" data-iptv-mode="xtream" style="padding:7px 13px; font-size:0.8rem;">
            🔐 Xtream Hesabı Ekle
          </button>
          <button type="button" class="sfx-btn ${state.iptvQuickMode === 'm3u_file' ? 'sfx-btn-primary' : ''}" data-iptv-mode="m3u_file" style="padding:7px 13px; font-size:0.8rem;">
            📄 M3U Dosyası Yükle
          </button>
        </div>
        ${
          state.customChannels.length > 0
            ? `
          <button type="button" id="clear-custom-channels-btn" class="sfx-btn" style="padding:6px 12px; font-size:0.76rem; color:#ff8080; border-color:rgba(255,80,80,0.35);">
            🗑️ IPTV Kanallarımı Temizle (${state.customChannels.length})
          </button>
        `
            : ''
        }
      </div>

      ${
        state.iptvQuickMode === 'm3u_url'
          ? `
        <form id="quick-m3u-url-form" style="display:flex; gap:10px; flex-wrap:wrap;">
          <input type="hidden" name="name" value="IPTV Listem" />
          <input
            type="url"
            name="url"
            id="quick-iptv-url-input"
            class="sfx-input"
            style="flex:1; min-width:260px;"
            placeholder="IPTV M3U linkinizi buraya yapıştırın (http://...)"
            required
          />
          <button type="submit" name="action" value="import" class="sfx-btn sfx-btn-primary" style="padding:10px 22px; white-space:nowrap;">
            ➕ Kanalları Yükle
          </button>
        </form>
      `
          : state.iptvQuickMode === 'xtream'
          ? `
        <form id="quick-xtream-form" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap:10px;">
          <input type="hidden" name="name" value="Xtream IPTV" />
          <input type="url" name="server" class="sfx-input" placeholder="Sunucu (http://domain.com:8080)" required />
          <input type="text" name="username" class="sfx-input" placeholder="Kullanıcı Adı" required />
          <input type="password" name="password" class="sfx-input" placeholder="Şifre" required />
          <button type="submit" class="sfx-btn sfx-btn-primary" style="justify-content:center;">
            ➕ Bağlan & Yükle
          </button>
        </form>
      `
          : `
        <form id="quick-m3u-file-form" style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <input type="hidden" name="name" value="M3U Dosyam" />
          <input type="file" name="file" accept=".m3u,.m3u8,.txt" class="sfx-input" style="flex:1;" required />
          <button type="submit" class="sfx-btn sfx-btn-primary" style="padding:10px 22px;">
            ➕ Dosyayı Yükle
          </button>
        </form>
      `
      }
    </div>
  `;
}

// ============================================================================
// MAIN APPLICATION VIEW (CLEAN, SIMPLE, UNIFIED)
// ============================================================================
function renderLandingPage() {
  const publicChannels = state.channels;
  const mineChannels = [
    ...state.customChannels,
    ...state.channels.filter(c => state.favs.includes(c.id))
  ];
  const activeTabPool = state.landingTab === 'mine' ? mineChannels : publicChannels;
  const categories = getCategories(activeTabPool);

  let baseList = activeTabPool;

  if (state.landingCategory !== 'TÜMÜ') {
    baseList = baseList.filter(c => c.category === state.landingCategory);
  }

  if (state.landingSearch.trim()) {
    const q = state.landingSearch.trim().toLowerCase();
    baseList = baseList.filter(
      c =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.category && c.category.toLowerCase().includes(q))
    );
  }

  const activeAnn = !state.announcementDismissed && state.announcements && state.announcements[0];

  return `
    <div class="sfx-root">
      <!-- SIMPLE CLEAN TOPBAR -->
      <header class="sfx-topbar">
        <div class="sfx-wrap sfx-topbar-in" style="gap:16px;">
          <a href="/" data-nav="/" class="sfx-brand">
            <div class="sfx-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="#ff3568" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <div class="sfx-wordmark">
              <span>TESFLIX</span>
            </div>
          </a>

          <!-- MAIN 3 TABS RIGHT IN THE TOPBAR -->
          <div class="sfx-tabs" style="margin:0;">
            <button type="button" class="sfx-tab ${state.landingTab === 'public' ? 'active' : ''}" data-landing-tab="public">
              <span>📺 Genel Kanallar</span>
              <span class="cnt">${publicChannels.length}</span>
            </button>
            <button type="button" class="sfx-tab ${state.landingTab === 'mine' ? 'active' : ''}" data-landing-tab="mine">
              <span>📡 Kanallarım (IPTV)</span>
              <span class="cnt">${mineChannels.length}</span>
            </button>
            <button type="button" class="sfx-tab ${state.landingTab === 'youtube' ? 'active' : ''}" data-landing-tab="youtube" style="${state.landingTab === 'youtube' ? 'background:#e11d48; color:#fff;' : ''}">
              <span>▶️ YouTube</span>
            </button>
          </div>

          <div class="sfx-nav-act">
            ${
              state.user && state.user.role === 'admin'
                ? `<a href="/admin" data-nav="/admin" class="sfx-btn" style="border-color:var(--sfx-gold); color:var(--sfx-gold);">🛡️ Admin</a>`
                : ''
            }
            <span style="font-size:0.84rem; color:var(--sfx-muted); padding:0 6px;">
              👤 ${escapeHtml(state.user?.name || 'Kullanıcı')}
            </span>
            <button type="button" id="logout-btn" class="sfx-btn" style="border-color:rgba(255,53,104,0.5); color:#ff6088; background:rgba(255,53,104,0.1);">
              🚪 Oturumu Kapat
            </button>
          </div>
        </div>
      </header>

      <main class="sfx-wrap" style="padding-top:24px; padding-bottom:60px;">
        ${
          activeAnn
            ? `
          <div class="sfx-announce" style="margin-bottom:18px;">
            <div>
              <strong style="color:var(--sfx-pink); margin-right:8px;">📢 ${escapeHtml(activeAnn.title || 'DUYURU')}:</strong>
              <span>${escapeHtml(activeAnn.message || activeAnn.content || '')}</span>
            </div>
            <button type="button" id="dismiss-ann-btn" class="sfx-btn" style="padding:4px 10px; font-size:0.74rem;">✕</button>
          </div>
        `
            : ''
        }

        ${
          state.landingTab === 'youtube'
            ? renderYoutubeHubSection()
            : `
          <!-- IPTV ADD BAR ONLY WHEN IN "KANALLARIM (IPTV)" TAB -->
          ${state.landingTab === 'mine' ? renderQuickIptvPanel() : ''}

          <!-- CATEGORIES + SEARCH BAR -->
          <div style="display:flex; justify-content:space-between; align-items:center; gap:14px; flex-wrap:wrap; margin-bottom:20px;">
            <div class="sfx-cats" style="margin:0; flex:1;">
              ${categories
                .map(
                  cat => `
                <button type="button" class="sfx-cat ${state.landingCategory === cat ? 'active' : ''}" data-landing-cat="${escapeHtml(cat)}">
                  ${escapeHtml(getCategoryDisplayName(cat))}
                </button>
              `
                )
                .join('')}
            </div>

            <div class="sfx-search" style="width:280px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="search"
                id="landing-search-input"
                placeholder="Kanal ara..."
                value="${escapeHtml(state.landingSearch)}"
              />
            </div>
          </div>

          <!-- CHANNELS GRID -->
          ${
            baseList.length > 0
              ? `
            <div class="sfx-grid">
              ${baseList.slice(0, state.visibleLimit).map(ch => renderChannelCard(ch)).join('')}
            </div>
            ${
              baseList.length > state.visibleLimit
                ? `
              <div style="text-align:center; margin: 20px 0 40px;">
                <button type="button" id="load-more-channels-btn" class="sfx-btn sfx-btn-primary" style="padding:11px 26px;">
                  Daha Fazla Göster (${state.visibleLimit} / ${baseList.length})
                </button>
              </div>
            `
                : ''
            }
          `
              : `
            <div class="sfx-empty" style="padding:48px 20px;">
              <h3>Henüz Kanal Bulunmuyor</h3>
              <p>Yukarıdaki alandan IPTV M3U linkinizi veya Xtream hesabınızı ekleyerek kanallarınızı izleyebilirsiniz.</p>
            </div>
          `
          }
        `
        }
      </main>
    </div>
  `;
}

// ============================================================================
// YOUTUBE DRIVE HUB (In-Motion YouTube Player + Personal YouTube Page & Feed)
// ============================================================================
const YT_PERSONAL_TOPICS = [
  { id: 'Tümü', query: 'Türkiye trend videolar müzik 2026' },
  { id: 'Türkçe Müzik', query: 'Türkçe pop akustik hit şarkılar 2026' },
  { id: 'Canlı Yayınlar', query: 'Türkiye canlı yayın haber müzik tv' },
  { id: 'Tesla & Otomobil', query: 'Tesla Türkiye inceleme otopilot elektrikli otomobil' },
  { id: 'Spor & Özetler', query: 'Süper Lig maç özeti spor gündemi' },
  { id: 'Haber & Gündem', query: 'Türkiye son dakika haber gündem' },
  { id: 'Teknoloji & Bilim', query: 'Teknoloji inceleme yapay zeka Türkçe' },
  { id: 'Komedi & Eğlence', query: 'Türkçe stand up komedi eğlence' },
];

let ytAutoHydratedForUser = null;
let ytTrendingFetched = false;

function detectUserLocaleCountry() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz === 'Europe/Istanbul' || tz === 'Asia/Istanbul') {
      return { gl: 'TR', hl: 'tr' };
    }
    const tzMap = {
      'Europe/Berlin': { gl: 'DE', hl: 'de' },
      'Europe/Paris': { gl: 'FR', hl: 'fr' },
      'Europe/Amsterdam': { gl: 'NL', hl: 'nl' },
      'Europe/London': { gl: 'GB', hl: 'en' },
      'America/New_York': { gl: 'US', hl: 'en' },
      'America/Los_Angeles': { gl: 'US', hl: 'en' },
    };
    if (tzMap[tz]) return tzMap[tz];
  } catch {}

  const langs = Array.isArray(navigator.languages) ? navigator.languages : [navigator.language || 'tr-TR'];
  const trLang = langs.find(l => /^tr/i.test(l));
  if (trLang) return { gl: 'TR', hl: 'tr' };

  const navLang = (navigator.language || 'tr-TR').trim();
  const parts = navLang.split('-');
  const hl = (parts[0] || 'tr').toLowerCase().slice(0, 2);
  let gl = (parts[1] || '').toUpperCase().slice(0, 2);
  if (!gl) {
    const langToCountry = { tr: 'TR', de: 'DE', fr: 'FR', nl: 'NL', es: 'ES', it: 'IT', en: 'US' };
    gl = langToCountry[hl] || 'TR';
  }
  return { gl, hl };
}

function ensureTrendingYoutubeLoaded() {
  if (ytTrendingFetched || state.ytTrendingLoading) return;
  ytTrendingFetched = true;
  state.ytTrendingLoading = true;
  const { gl, hl } = detectUserLocaleCountry();

  fetch(`/api/youtube/trending?gl=${encodeURIComponent(gl)}&hl=${encodeURIComponent(hl)}`)
    .then(r => r.json())
    .then(data => {
      if (data && data.ok && Array.isArray(data.videos)) {
        state.ytTrendingVideos = data.videos;
        state.ytCountry = data.gl || gl;
      }
    })
    .catch(() => {})
    .finally(() => {
      state.ytTrendingLoading = false;
      render();
    });
}

function ensurePersonalYoutubeHydrated() {
  if (!state.user) return;
  const ytAcc = state.user.youtubeAccount;
  if (ytAcc && Array.isArray(ytAcc.homeFeed) && ytAcc.homeFeed.length > 0) return;
  if (ytAutoHydratedForUser === state.user.id) return;
  ytAutoHydratedForUser = state.user.id;

  // If the user already connected an account earlier (without homeFeed/myVideos), hydrate it automatically
  if (ytAcc) {
    fetch('/api/youtube/account', {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        action: 'connect',
        email: ytAcc.email || state.user.email || '',
        handleOrUrl: ytAcc.handleOrUrl || ytAcc.handle || '',
        displayName: ytAcc.displayName || ytAcc.channelTitle || '',
      }),
    })
      .then(r => r.json())
      .then(data => {
        if (data && data.ok && data.youtubeAccount && state.user) {
          state.user.youtubeAccount = data.youtubeAccount;
          localStorage.setItem('sfx_auth_user', JSON.stringify(state.user));
          if (!state.ytListTab || state.ytListTab === 'trending' || state.ytListTab === 'curated') {
            state.ytListTab = 'home';
          }
          render();
        }
      })
      .catch(() => {});
  }
}

function renderYoutubeHubSection() {
  const ytAcc = state.user && state.user.youtubeAccount ? state.user.youtubeAccount : null;
  if (ytAcc) {
    ensurePersonalYoutubeHydrated();
  } else {
    ensureTrendingYoutubeLoaded();
  }

  const trendingList = state.ytTrendingVideos.length > 0 ? state.ytTrendingVideos : YOUTUBE_CURATED;
  const homeFeed = ytAcc && Array.isArray(ytAcc.homeFeed) && ytAcc.homeFeed.length > 0 ? ytAcc.homeFeed : trendingList;
  const myVideos = ytAcc && Array.isArray(ytAcc.myVideos) ? ytAcc.myVideos : [];
  const subVideos = ytAcc && Array.isArray(ytAcc.subscriptionVideos) ? ytAcc.subscriptionVideos : [];
  const subsList = ytAcc && Array.isArray(ytAcc.subscriptions) ? ytAcc.subscriptions : [];
  const playlists = ytAcc && Array.isArray(ytAcc.playlists) ? ytAcc.playlists : [];
  const savedVideos = ytAcc && Array.isArray(ytAcc.savedVideos) ? ytAcc.savedVideos : [];
  const historyVideos = ytAcc && Array.isArray(ytAcc.historyVideos) ? ytAcc.historyVideos : [];

  const countryCode = state.ytCountry || detectUserLocaleCountry().gl;
  const activeTab = ytAcc
    ? state.ytListTab && state.ytListTab !== 'trending' && state.ytListTab !== 'curated'
      ? state.ytListTab
      : 'home'
    : state.ytListTab === 'search'
    ? 'search'
    : 'trending';

  const activePlaylistIdx = state.ytSelectedPlaylistIdx || 0;
  const currentPlaylist = playlists[activePlaylistIdx] || playlists[0] || null;
  const embedOrigin = encodeURIComponent(window.location.origin);

  let videoList = trendingList;
  let sectionHeading = `🔥 Popüler Videolar (${escapeHtml(countryCode)})`;
  if (activeTab === 'home') {
    videoList = homeFeed;
    sectionHeading = `🏠 Bana Özel Anasayfa`;
  } else if (activeTab === 'my_videos') {
    videoList = myVideos.length > 0 ? myVideos : savedVideos;
    sectionHeading = `📹 Videolarım`;
  } else if (activeTab === 'subscriptions') {
    videoList = subVideos;
    sectionHeading = `🔔 Abonelikler`;
  } else if (activeTab === 'playlists') {
    videoList = currentPlaylist && Array.isArray(currentPlaylist.videos) ? currentPlaylist.videos : savedVideos;
    sectionHeading = `📂 ${currentPlaylist ? escapeHtml(currentPlaylist.title) : 'Listelerim'}`;
  } else if (activeTab === 'account') {
    videoList = savedVideos;
    sectionHeading = `👍 Kayıtlı Videolar`;
  } else if (activeTab === 'history') {
    videoList = historyVideos;
    sectionHeading = `🕒 Geçmişim`;
  } else if (activeTab === 'search') {
    videoList = state.ytSearchResults || [];
    sectionHeading = `🔎 Arama Sonuçları (${videoList.length})`;
  }

  const avatarInitial = ytAcc && ytAcc.displayName ? ytAcc.displayName.trim().charAt(0).toUpperCase() : 'Y';

  return `
    <div style="display:flex; flex-direction:column; gap:16px;">
      <!-- CLEAN YOUTUBE HEADER -->
      <div class="sfx-scard" style="padding:14px 18px;">
        ${
          ytAcc
            ? `
          <!-- LOGGED-IN PERSONAL YOUTUBE TOP BAR -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <div style="width:40px; height:40px; border-radius:50%; overflow:hidden; background:#e11d48; border:2px solid #38e8a5; display:flex; align-items:center; justify-content:center; font-size:1.1rem; font-weight:800; color:#fff; flex-shrink:0;">
                ${
                  ytAcc.avatarUrl
                    ? `<img src="${escapeHtml(ytAcc.avatarUrl)}" alt="${escapeHtml(ytAcc.displayName)}" style="width:100%; height:100%; object-fit:cover;" />`
                    : escapeHtml(avatarInitial)
                }
              </div>
              <div>
                <div style="font-weight:700; font-size:0.98rem;">${escapeHtml(ytAcc.displayName || ytAcc.channelTitle)}</div>
                <div style="font-size:0.76rem; color:var(--sfx-muted);">${escapeHtml(ytAcc.email || ytAcc.handle || '@youtube')}</div>
              </div>
            </div>

            <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
              <form id="yt-search-form" style="display:flex; gap:8px; min-width:240px;">
                <input
                  type="search"
                  name="q"
                  class="sfx-input"
                  placeholder="YouTube'da ara..."
                  value="${escapeHtml(state.ytSearchQuery)}"
                />
                <button type="submit" class="sfx-btn sfx-btn-primary" style="white-space:nowrap;">
                  ${state.ytSearching ? '⏳' : '🔎 Ara'}
                </button>
              </form>
              <button type="button" id="yt-disconnect-btn" class="sfx-btn" style="padding:8px 12px; font-size:0.78rem; border-color:rgba(255,80,80,0.45); color:#ff8888;">
                Çıkış
              </button>
            </div>
          </div>

          <!-- PERSONAL YOUTUBE TABS -->
          <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center; margin-top:12px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.08);">
            <button type="button" class="sfx-btn ${activeTab === 'home' ? 'sfx-btn-primary' : ''}" style="padding:7px 12px; font-size:0.78rem;" data-yt-list-tab="home">
              🏠 Anasayfa
            </button>
            <button type="button" class="sfx-btn ${activeTab === 'my_videos' ? 'sfx-btn-primary' : ''}" style="padding:7px 12px; font-size:0.78rem;" data-yt-list-tab="my_videos">
              📹 Videolarım
            </button>
            <button type="button" class="sfx-btn ${activeTab === 'subscriptions' ? 'sfx-btn-primary' : ''}" style="padding:7px 12px; font-size:0.78rem;" data-yt-list-tab="subscriptions">
              🔔 Abonelikler
            </button>
            <button type="button" class="sfx-btn ${activeTab === 'playlists' ? 'sfx-btn-primary' : ''}" style="padding:7px 12px; font-size:0.78rem;" data-yt-list-tab="playlists">
              📂 Listelerim
            </button>
            <button type="button" class="sfx-btn ${activeTab === 'account' ? 'sfx-btn-primary' : ''}" style="padding:7px 12px; font-size:0.78rem;" data-yt-list-tab="account">
              👍 Kayıtlı (${savedVideos.length})
            </button>
            ${
              (state.ytSearchResults || []).length > 0 || activeTab === 'search'
                ? `
              <button type="button" class="sfx-btn ${activeTab === 'search' ? 'sfx-btn-primary' : ''}" style="padding:7px 12px; font-size:0.78rem;" data-yt-list-tab="search">
                🔎 Arama (${(state.ytSearchResults || []).length})
              </button>
            `
                : ''
            }
          </div>
        `
            : `
          <!-- GUEST YOUTUBE BAR: ONLY SEARCH + SIGN IN -->
          <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
            <form id="yt-search-form" style="display:flex; gap:8px; flex:1; min-width:240px;">
              <input
                type="search"
                name="q"
                class="sfx-input"
                placeholder="YouTube'da ara..."
                value="${escapeHtml(state.ytSearchQuery)}"
              />
              <button type="submit" class="sfx-btn sfx-btn-primary" style="white-space:nowrap; padding:10px 20px;">
                ${state.ytSearching ? '⏳' : '🔎 Ara'}
              </button>
            </form>

            <button type="button" id="yt-google-login-btn" class="sfx-btn" style="padding:10px 18px; font-size:0.86rem; border-color:rgba(255,100,130,0.55); color:#fff; background:rgba(225,29,72,0.22); font-weight:700; white-space:nowrap;">
              🔐 Giriş Yap
            </button>
          </div>
        `
        }

        ${
          state.ytGoogleModalOpen
            ? `
          <!-- YOUTUBE LOGIN MODAL: MANUAL EMAIL+PASSWORD OR GOOGLE -->
          <div style="margin-top:14px; padding:18px; border-radius:12px; background:rgba(10,12,22,0.97); border:1px solid rgba(66,133,244,0.45);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
              <strong style="font-size:0.96rem;">YouTube Hesabına Giriş Yap</strong>
              <button type="button" id="yt-close-google-modal-btn" class="sfx-btn" style="padding:4px 10px; font-size:0.75rem;">✕</button>
            </div>

            <form id="yt-google-direct-form" style="display:grid; grid-template-columns: 1fr 1fr auto; gap:10px; align-items:center;">
              <input
                type="text"
                id="yt-google-email-input"
                name="email"
                class="sfx-input"
                placeholder="YouTube / Google E-posta veya @kanal"
                value="${escapeHtml(state.ytLoginEmailDraft || '')}"
                required
              />
              <input
                type="password"
                id="yt-google-password-input"
                name="password"
                class="sfx-input"
                placeholder="Şifre"
                required
              />
              <button type="submit" class="sfx-btn sfx-btn-primary" style="padding:10px 20px; white-space:nowrap;">
                Giriş Yap
              </button>
            </form>

            <div style="display:flex; align-items:center; gap:10px; margin-top:12px; padding-top:12px; border-top:1px solid rgba(255,255,255,0.08); flex-wrap:wrap;">
              <button type="button" id="yt-open-google-chooser" class="sfx-btn" style="padding:9px 16px; font-size:0.82rem; background:rgba(66,133,244,0.2); border-color:rgba(66,133,244,0.55); color:#fff; font-weight:700;">
                G Google ile Giriş Yap
              </button>
              ${
                state.ytGoogleWaitingPopup
                  ? `
                <button type="button" id="yt-confirm-google-done-btn" class="sfx-btn sfx-btn-primary" style="padding:9px 16px; font-size:0.82rem; background:#10b981;">
                  ✅ Girişi Tamamladım — Kişisel Sayfamı Aç
                </button>
                <span style="font-size:0.74rem; color:var(--sfx-muted);">
                  Google penceresinde giriş yaptıktan sonra pencereyi kapatın veya bu butona basın.
                </span>
              `
                  : ''
              }
            </div>
          </div>
        `
            : ''
        }

        ${
          ytAcc && activeTab === 'home'
            ? `
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:10px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.08);">
            ${YT_PERSONAL_TOPICS.map(
              t => `
              <button
                type="button"
                class="sfx-cat ${(ytAcc && ytAcc.activeTopic === t.id) || (!ytAcc?.activeTopic && t.id === 'Tümü') ? 'active' : ''}"
                style="padding:4px 11px; font-size:0.74rem;"
                data-yt-topic-id="${escapeHtml(t.id)}"
                data-yt-topic-query="${escapeHtml(t.query)}"
              >
                ${escapeHtml(t.id)}
              </button>
            `
            ).join('')}
          </div>
        `
            : ''
        }

        ${
          activeTab === 'subscriptions'
            ? `
          <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; margin-top:10px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.08);">
            <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
              ${subsList
                .map(
                  s => `
                <span style="display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:99px; background:rgba(255,255,255,0.06); font-size:0.75rem;">
                  <strong style="cursor:pointer;" data-yt-sub-filter="${escapeHtml(s.name)}">${escapeHtml(s.name)}</strong>
                  <button type="button" data-yt-unsub="${escapeHtml(s.handle)}" style="background:none; border:none; color:#ff8080; cursor:pointer; font-size:0.75rem; padding:0;">✕</button>
                </span>
              `
                )
                .join('')}
            </div>
            <form id="yt-add-sub-form" style="display:flex; gap:6px;">
              <input type="text" name="channel" class="sfx-input" style="padding:6px 10px; font-size:0.78rem; width:190px;" placeholder="@kanal ekle..." required />
              <button type="submit" class="sfx-btn sfx-btn-primary" style="padding:6px 12px; font-size:0.76rem;">➕ Ekle</button>
            </form>
          </div>
        `
            : ''
        }

        ${
          activeTab === 'playlists'
            ? `
          <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; margin-top:10px; padding-top:10px; border-top:1px solid rgba(255,255,255,0.08);">
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              ${playlists
                .map(
                  (pl, idx) => `
                <button type="button" class="sfx-btn ${idx === activePlaylistIdx ? 'sfx-btn-primary' : ''}" style="padding:5px 11px; font-size:0.74rem;" data-yt-pl-idx="${idx}">
                  ${escapeHtml(pl.title)} (${(pl.videos || []).length})
                </button>
              `
                )
                .join('')}
            </div>
            <form id="yt-add-playlist-form" style="display:flex; gap:6px;">
              <input type="text" name="title" class="sfx-input" style="padding:6px 10px; font-size:0.78rem; width:130px;" placeholder="Liste Adı" required />
              <input type="text" name="playlistUrl" class="sfx-input" style="padding:6px 10px; font-size:0.78rem; width:200px;" placeholder="Playlist URL" required />
              <button type="submit" class="sfx-btn sfx-btn-primary" style="padding:6px 12px; font-size:0.76rem;">➕ Ekle</button>
            </form>
          </div>
        `
            : ''
        }
      </div>

      <!-- PLAYER (ONLY WHEN A VIDEO IS CLICKED) + VIDEO GRID / LIST -->
      ${
        state.selectedYoutubeId
          ? `
        <div class="sfx-scard">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:10px;">
            <h3 style="margin:0; font-size:1rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">▶️ ${escapeHtml(state.selectedYoutubeTitle || 'YouTube Oynatıcı')}</h3>
            <div style="display:flex; gap:8px; flex-shrink:0;">
              <button
                type="button"
                class="sfx-btn"
                style="padding:5px 10px; font-size:0.74rem;"
                data-yt-save="${escapeHtml(state.selectedYoutubeId)}"
                data-yt-title="${escapeHtml(state.selectedYoutubeTitle || 'YouTube Video')}"
                data-yt-channel="YouTube"
                data-yt-duration="Video"
              >
                👍 Kaydet
              </button>
              <button type="button" id="yt-close-player-btn" class="sfx-btn" style="padding:5px 10px; font-size:0.74rem;">
                ✕ Kapat
              </button>
            </div>
          </div>

          <div style="aspect-ratio:16/9; max-height:520px; border-radius:12px; overflow:hidden; background:#000; margin:0 auto;">
            <iframe
              id="sfx-yt-iframe"
              src="https://www.youtube-nocookie.com/embed/${escapeHtml(state.selectedYoutubeId)}?autoplay=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1&origin=${embedOrigin}"
              style="width:100%; height:100%; border:none;"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      `
          : ''
      }

      <div class="sfx-scard">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h3 style="margin:0; font-size:0.98rem;">${sectionHeading}</h3>
          <span style="font-size:0.74rem; color:var(--sfx-muted);">${videoList.length} video</span>
        </div>

        ${
          videoList.length > 0
            ? `
          <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap:14px;">
            ${videoList
              .map(
                v => `
              <div
                style="cursor:pointer; border-radius:12px; overflow:hidden; background:rgba(255,255,255,0.03); border:1px solid ${state.selectedYoutubeId === v.videoId ? 'var(--sfx-pink)' : 'rgba(255,255,255,0.08)'}; display:flex; flex-direction:column;"
                data-yt-id="${escapeHtml(v.videoId)}"
                data-yt-title="${escapeHtml(v.title)}"
                data-yt-channel="${escapeHtml(v.channel || 'YouTube')}"
              >
                <div style="position:relative; aspect-ratio:16/9; background:#111; overflow:hidden;">
                  <img
                    src="https://i.ytimg.com/vi/${encodeURIComponent(v.videoId)}/mqdefault.jpg"
                    alt="${escapeHtml(v.title)}"
                    style="width:100%; height:100%; object-fit:cover;"
                    loading="lazy"
                  />
                  <span style="position:absolute; bottom:6px; right:6px; padding:2px 6px; border-radius:5px; background:rgba(0,0,0,0.82); color:#fff; font-size:0.68rem; font-weight:700;">
                    ${escapeHtml(v.duration || 'VİDEO')}
                  </span>
                </div>
                <div style="padding:10px 12px; display:flex; flex-direction:column; gap:5px; flex:1; justify-content:space-between;">
                  <div style="font-weight:600; font-size:0.84rem; line-height:1.3; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
                    ${escapeHtml(v.title)}
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.72rem; color:var(--sfx-muted);">
                    <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(v.channel || 'YouTube')}</span>
                    ${
                      activeTab === 'account'
                        ? `<button type="button" class="sfx-btn" style="padding:3px 7px; font-size:0.68rem; color:#ff8080;" data-yt-remove="${escapeHtml(v.videoId)}">🗑️</button>`
                        : `<button type="button" class="sfx-btn" style="padding:3px 7px; font-size:0.68rem;" data-yt-save="${escapeHtml(v.videoId)}" data-yt-title="${escapeHtml(v.title)}" data-yt-channel="${escapeHtml(v.channel || 'YouTube')}" data-yt-duration="${escapeHtml(v.duration || 'Video')}">👍</button>`
                    }
                  </div>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        `
            : `<div style="padding:24px; text-align:center; color:var(--sfx-muted); font-size:0.84rem;">Video bulunamadı.</div>`
        }
      </div>
    </div>
  `;
}
function renderDashboardPage() {
  const allChannels = getAllChannels();
  let activePool = state.channels;
  if (state.dashTab === 'iptv') {
    activePool = state.customChannels;
  } else if (state.dashTab === 'favs') {
    activePool = allChannels.filter(c => state.favs.includes(c.id));
  }

  const categories = getCategories(activePool);
  let filteredChannels = activePool;

  if (state.dashCategory !== 'TÜMÜ') {
    filteredChannels = filteredChannels.filter(c => c.category === state.dashCategory);
  }
  if (state.dashSearch.trim()) {
    const q = state.dashSearch.trim().toLowerCase();
    filteredChannels = filteredChannels.filter(
      c =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.category && c.category.toLowerCase().includes(q))
    );
  }

  const previewCh = state.splitPreviewChannelId
    ? activePool.find(c => c.id === state.splitPreviewChannelId) || filteredChannels[0] || activePool[0]
    : filteredChannels[0] || activePool[0];

  return `
    <div class="sfx-dash">
      <div class="sfx-beam"></div>
      <div class="sfx-grid-bg"></div>

      <!-- DASHBOARD STICKY TOPBAR -->
      <header class="sfx-dtop">
        <div class="sfx-dtop-l">
          <a href="/" data-nav="/" class="sfx-brand" style="margin-right:8px;">
            <div class="sfx-mark" style="width:34px; height:34px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="#ff60a8" stroke-width="2.4">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <div class="sfx-wordmark" style="font-size:1.05rem;">
              <span>TESFLIX</span>
            </div>
          </a>

          <!-- COCKPIT MEDIA TABS -->
          <div class="sfx-dtabs">
            <button type="button" class="sfx-dtab ${state.dashTab === 'live' ? 'active' : ''}" data-dash-tab="live">
              📺 Genel Kanallar (${state.channels.length})
            </button>
            <button type="button" class="sfx-dtab ${state.dashTab === 'iptv' ? 'active' : ''}" data-dash-tab="iptv">
              📡 Kanallarım & IPTV (${state.customChannels.length})
            </button>
            <button type="button" class="sfx-dtab ${state.dashTab === 'movies' ? 'active' : ''}" data-dash-tab="movies">
              🎬 Filmler
            </button>
            <button type="button" class="sfx-dtab ${state.dashTab === 'series' ? 'active' : ''}" data-dash-tab="series">
              🍿 Diziler
            </button>
            <button type="button" class="sfx-dtab ${state.dashTab === 'favs' ? 'active' : ''}" data-dash-tab="favs">
              ⭐ Favoriler (${state.favs.length})
            </button>
            <button type="button" class="sfx-dtab ${state.dashTab === 'youtube' ? 'active-yt' : ''}" data-dash-tab="youtube">
              ▶️ YouTube
            </button>
            <button type="button" class="sfx-dtab ${state.dashTab === 'twitch' ? 'active-tw' : ''}" data-dash-tab="twitch">
              🟣 Twitch
            </button>
            <button type="button" class="sfx-dtab ${state.dashTab === 'kick' ? 'active-kk' : ''}" data-dash-tab="kick">
              🟢 Kick
            </button>
            <button type="button" class="sfx-dtab ${state.dashTab === 'nav' ? 'active-nv' : ''}" data-dash-tab="nav">
              🗺️ Navigasyon
            </button>
          </div>
        </div>

        <div class="sfx-dtop-r">
          <button type="button" id="toggle-iptv-bar-btn" class="sfx-btn sfx-btn-iptv" style="padding:7px 12px; font-size:0.78rem;">
            📡 IPTV Link Ekle
          </button>
          <button type="button" id="toggle-pip-nav-btn" class="sfx-btn" style="padding:7px 12px; font-size:0.78rem;">
            🗺️ PiP Harita ${state.pipNavOpen ? 'Kapat' : 'Aç'}
          </button>
          <button type="button" id="cycle-ui-btn" class="sfx-btn" style="padding:7px 12px; font-size:0.78rem;" title="Arayüz Görünüm Modunu Değiştir">
            🎛️ Mod: ${escapeHtml(state.uiMode.toUpperCase())}
          </button>
          <button type="button" id="cycle-theme-btn" class="sfx-btn sfx-icon-btn" title="Tema Değiştir">
            🎨
          </button>
          <a href="/dashboard/sources" data-nav="/dashboard/sources" class="sfx-btn sfx-btn-primary" style="padding:7px 14px; font-size:0.78rem;">
            ⚙️ Kaynaklar & Ayarlar
          </a>
          ${
            state.user && state.user.role === 'admin'
              ? `<a href="/admin" data-nav="/admin" class="sfx-btn" style="padding:7px 12px; font-size:0.78rem; border-color:var(--sfx-gold); color:var(--sfx-gold);">🛡️ Admin Paneli</a>`
              : ''
          }
          <button type="button" id="logout-btn" class="sfx-btn" style="padding:7px 12px; font-size:0.78rem; border-color:rgba(255,53,104,0.55); color:#ff6088; background:rgba(255,53,104,0.12);">
            🚪 Oturumu Kapat
          </button>
        </div>
      </header>

      <div class="sfx-dbody">
        ${renderQuickIptvPanel()}

        ${renderDashboardTabContent(filteredChannels, categories, previewCh)}
      </div>

      ${
        state.uiMode === 'kull1'
          ? `
        <div class="sfx-dock">
          <button type="button" class="sfx-dtab ${state.dashTab === 'live' ? 'active' : ''}" data-dash-tab="live">📺 TV</button>
          <button type="button" class="sfx-dtab ${state.dashTab === 'movies' ? 'active' : ''}" data-dash-tab="movies">🎬 Film</button>
          <button type="button" class="sfx-dtab ${state.dashTab === 'youtube' ? 'active-yt' : ''}" data-dash-tab="youtube">▶️ YouTube</button>
          <button type="button" class="sfx-dtab ${state.dashTab === 'twitch' ? 'active-tw' : ''}" data-dash-tab="twitch">🟣 Twitch</button>
          <button type="button" class="sfx-dtab ${state.dashTab === 'kick' ? 'active-kk' : ''}" data-dash-tab="kick">🟢 Kick</button>
          <button type="button" class="sfx-dtab ${state.dashTab === 'nav' ? 'active-nv' : ''}" data-dash-tab="nav">🗺️ Harita</button>
          <a href="/dashboard/sources" data-nav="/dashboard/sources" class="sfx-dtab">⚙️ IPTV</a>
        </div>
      `
          : ''
      }

      ${
        state.pipNavOpen
          ? `
        <div class="sfx-pip-nav">
          <div style="padding:8px 12px; background:rgba(9,7,16,0.92); display:flex; justify-content:space-between; align-items:center; font-size:0.76rem; font-family:var(--font-mono);">
            <span>🗺️ CANLI KOKPİT HARİTASI (PiP)</span>
            <button type="button" id="close-pip-nav-btn" style="background:none; border:none; color:#fff; cursor:pointer;">✕</button>
          </div>
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=28.85%2C40.95%2C29.15%2C41.10&layer=mapnik"
            style="width:100%; flex:1; border:none;"
            loading="lazy"
          ></iframe>
        </div>
      `
          : ''
      }
    </div>
  `;
}

function renderDashboardTabContent(filteredChannels, categories, previewCh) {
  if (state.dashTab === 'live' || state.dashTab === 'iptv' || state.dashTab === 'favs') {
    const activePool =
      state.dashTab === 'iptv'
        ? state.customChannels
        : state.dashTab === 'favs'
        ? getAllChannels().filter(c => state.favs.includes(c.id))
        : state.channels;

    return `
      <div class="sfx-dlayout">
        ${
          state.uiMode !== 'kull3'
            ? `
          <aside class="sfx-dside">
            <div class="sfx-dside-h">${state.dashTab === 'iptv' ? 'IPTV KATEGORİLERİ' : 'GENEL KATEGORİLER'}</div>
            ${categories
              .map(cat => {
                const count =
                  cat === 'TÜMÜ'
                    ? activePool.length
                    : activePool.filter(c => c.category === cat).length;
                return `
                  <button type="button" class="sfx-dcat ${state.dashCategory === cat ? 'active' : ''}" data-dash-cat="${escapeHtml(cat)}">
                    <span>${escapeHtml(getCategoryDisplayName(cat))}</span>
                    <span style="font-family:var(--font-mono); font-size:0.7rem; opacity:0.7;">${count}</span>
                  </button>
                `;
              })
              .join('')}
          </aside>
        `
            : ''
        }

        <div class="sfx-dmain">
          <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:16px; flex-wrap:wrap;">
            <div class="sfx-search" style="max-width:420px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="search"
                id="dash-search-input"
                placeholder="Kanal ara (${filteredChannels.length} kanal)..."
                value="${escapeHtml(state.dashSearch)}"
              />
            </div>

            <div style="display:flex; gap:8px; align-items:center;">
              <span style="font-family:var(--font-mono); font-size:0.74rem; color:var(--sfx-muted);">
                PROXY: <strong>${escapeHtml(state.proxyRegion)}</strong> · EPG: <strong>${state.epgEnabled ? 'AKTİF' : 'KAPALI'}</strong>
              </span>
            </div>
          </div>

          ${
            state.uiMode === 'kull2' && previewCh
              ? `
            <div class="sfx-scard" style="margin-bottom:20px; display:grid; grid-template-columns: 1.2fr 1fr; gap:18px; align-items:center;">
              <div style="aspect-ratio:16/9; background:#000; border-radius:12px; overflow:hidden; position:relative;">
                <video id="split-preview-video" controls autoplay muted playsinline style="width:100%; height:100%; object-fit:contain;"></video>
              </div>
              <div>
                <div class="sfx-tag" style="display:inline-block; margin-bottom:8px;">BÖLÜNMÜŞ EKRAN ÖNİZLEME (KULLANIM 2)</div>
                <h3 style="font-size:1.35rem; margin-bottom:6px;">${escapeHtml(previewCh.name)}</h3>
                <p style="color:var(--sfx-muted); font-size:0.86rem; margin-bottom:14px;">Kategori: ${escapeHtml(previewCh.category || 'ULUSAL')}</p>
                <a href="/watch/${encodeURIComponent(previewCh.id)}" data-nav="/watch/${escapeHtml(previewCh.id)}" class="sfx-btn sfx-btn-primary">
                  📺 Tam Ekran Oynatıcıda Aç
                </a>
              </div>
            </div>
          `
              : ''
          }

          ${
            filteredChannels.length > 0
              ? `
            <div class="sfx-dgrid">
              ${filteredChannels.slice(0, state.visibleLimit).map(ch => renderChannelCard(ch, true)).join('')}
            </div>
            ${
              filteredChannels.length > state.visibleLimit
                ? `
              <div style="text-align:center; margin: 24px 0 40px;">
                <button type="button" id="load-more-channels-btn" class="sfx-btn sfx-btn-primary" style="padding:12px 28px; font-size:0.9rem;">
                  ➕ Daha Fazla Kanal Göster (${state.visibleLimit} / ${filteredChannels.length})
                </button>
              </div>
            `
                : ''
            }
          `
              : `
            <div class="sfx-empty">
              <h3>Kanal Bulunamadı</h3>
              <p>Arama kriterlerinize uygun kanal yok veya henüz favori/IPTV kanalı eklemediniz.</p>
            </div>
          `
          }
        </div>
      </div>
    `;
  }

  if (state.dashTab === 'movies' || state.dashTab === 'series') {
    const items = state.dashTab === 'movies' ? SAMPLE_VOD_MOVIES : SAMPLE_VOD_SERIES;
    return `
      <div>
        <div class="sfx-sec-head">
          <div class="sfx-sec-title">${state.dashTab === 'movies' ? '🎬 VOD Sinema & Filmler' : '🍿 VOD Diziler'}</div>
          <a href="/dashboard/sources" data-nav="/dashboard/sources" class="sfx-btn sfx-btn-primary" style="padding:6px 12px; font-size:0.76rem;">
            ➕ Xtream VOD Kaynağı Ekle
          </a>
        </div>
        <div class="sfx-dgrid">
          ${items
            .map(
              item => `
            <a href="/watch/${encodeURIComponent(item.id)}" data-nav="/watch/${escapeHtml(item.id)}" class="sfx-dcard">
              <div class="sfx-dcard-glyph">${escapeHtml(item.name.slice(0, 2).toUpperCase())}</div>
              <img class="sfx-dcard-logo" src="/api/logo?name=${encodeURIComponent(item.name)}&cat=${encodeURIComponent(item.category)}" alt="${escapeHtml(item.name)}" />
              <div class="sfx-dcard-badge"><span class="d"></span><span>★ ${escapeHtml(item.rating)} · ${escapeHtml(item.year)}</span></div>
              <div class="sfx-dcard-info">
                <h3>${escapeHtml(item.name)}</h3>
                <div class="cat-lbl">${escapeHtml(item.category)}</div>
              </div>
            </a>
          `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  if (state.dashTab === 'youtube') {
    return renderYoutubeHubSection();
  }

  if (state.dashTab === 'twitch') {
    const parentHost = window.location.hostname || 'localhost';
    return `
      <div class="sfx-sources-grid">
        <div class="sfx-scard">
          <h3>🟣 Twitch Canlı Yayın (${escapeHtml(state.selectedTwitchChannel)})</h3>
          <div style="aspect-ratio:16/9; border-radius:12px; overflow:hidden; background:#000; margin-bottom:14px;">
            <iframe
              src="https://player.twitch.tv/?channel=${encodeURIComponent(state.selectedTwitchChannel)}&parent=${encodeURIComponent(parentHost)}"
              style="width:100%; height:100%; border:none;"
              allowfullscreen
            ></iframe>
          </div>
          <form id="twitch-custom-form" style="display:flex; gap:8px;">
            <input type="text" name="channel" class="sfx-input" placeholder="Twitch yayıncı adı girin (Örn: elraenn, wtcn)" value="${escapeHtml(state.selectedTwitchChannel)}" />
            <button type="submit" class="sfx-btn sfx-btn-primary">Kanalı Aç</button>
          </form>
        </div>

        <div class="sfx-scard">
          <h3>Popüler Twitch Kanalları</h3>
          ${TWITCH_FEATURED.map(
            t => `
            <div class="sfx-source-item" style="cursor:pointer;" data-twitch-ch="${escapeHtml(t.channel)}">
              <div>
                <div style="font-weight:700;">${escapeHtml(t.channel)}</div>
                <div style="font-size:0.76rem; color:var(--sfx-muted);">${escapeHtml(t.title)} · ${escapeHtml(t.game)}</div>
              </div>
              <span class="sfx-tag">${escapeHtml(t.viewers)} İZLEYİCİ</span>
            </div>
          `
          ).join('')}
        </div>
      </div>
    `;
  }

  if (state.dashTab === 'kick') {
    return `
      <div class="sfx-sources-grid">
        <div class="sfx-scard">
          <h3>🟢 Kick Canlı Yayın (${escapeHtml(state.selectedKickChannel)})</h3>
          <div style="aspect-ratio:16/9; border-radius:12px; overflow:hidden; background:#000; margin-bottom:14px;">
            <iframe
              src="https://player.kick.com/${encodeURIComponent(state.selectedKickChannel)}"
              style="width:100%; height:100%; border:none;"
              allowfullscreen
            ></iframe>
          </div>
          <form id="kick-custom-form" style="display:flex; gap:8px;">
            <input type="text" name="channel" class="sfx-input" placeholder="Kick yayıncı adı girin (Örn: elraenn, xqc)" value="${escapeHtml(state.selectedKickChannel)}" />
            <button type="submit" class="sfx-btn sfx-btn-primary">Kanalı Aç</button>
          </form>
        </div>

        <div class="sfx-scard">
          <h3>Popüler Kick Kanalları</h3>
          ${KICK_FEATURED.map(
            k => `
            <div class="sfx-source-item" style="cursor:pointer;" data-kick-ch="${escapeHtml(k.channel)}">
              <div>
                <div style="font-weight:700;">${escapeHtml(k.channel)}</div>
                <div style="font-size:0.76rem; color:var(--sfx-muted);">${escapeHtml(k.title)} · ${escapeHtml(k.category)}</div>
              </div>
              <span class="sfx-tag" style="color:#3fca82; border-color:rgba(63,202,130,0.4);">${escapeHtml(k.viewers)}</span>
            </div>
          `
          ).join('')}
        </div>
      </div>
    `;
  }

  // Navigation Tab
  return `
    <div class="sfx-scard">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
        <h3>🗺️ Tam Ekran Kokpit Navigasyon & Canlı Harita</h3>
        <button type="button" id="activate-pip-from-tab" class="sfx-btn sfx-btn-primary">
          📌 TV İzlerken Küçük Pencerede (PiP) Açık Tut
        </button>
      </div>
      <div style="height:68vh; border-radius:14px; overflow:hidden; border:1px solid var(--sfx-line-strong);">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=28.80%2C40.90%2C29.25%2C41.15&layer=mapnik"
          style="width:100%; height:100%; border:none;"
        ></iframe>
      </div>
    </div>
  `;
}

// ============================================================================
// VIEW 3: SOURCES & SETTINGS (`/dashboard/sources`) — 2-COLUMN SIDE-BY-SIDE
// ============================================================================
function renderSourcesPage() {
  const allChannels = getAllChannels();
  const categories = getCategories(allChannels).filter(c => c !== 'TÜMÜ');

  return `
    <div class="sfx-root">
      <div class="sfx-beam"></div>
      <div class="sfx-grid-bg"></div>

      <header class="sfx-topbar">
        <div class="sfx-wrap sfx-topbar-in">
          <a href="/" data-nav="/" class="sfx-brand">
            <div class="sfx-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="#ff60a8" stroke-width="2.4">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <div class="sfx-wordmark">
              <span>TESFLIX</span>
              <span class="sfx-tag">KAYNAKLAR & AYARLAR</span>
            </div>
          </a>

          <div class="sfx-nav-act">
            <a href="/" data-nav="/" class="sfx-btn">← Ana Sayfa</a>
            <a href="/dashboard" data-nav="/dashboard" class="sfx-btn sfx-btn-primary">🚀 Multimedya Paneli</a>
            <button type="button" id="logout-btn" class="sfx-btn" style="border-color:rgba(255,53,104,0.55); color:#ff6088; background:rgba(255,53,104,0.12);">
              🚪 Oturumu Kapat
            </button>
          </div>
        </div>
      </header>

      <main class="sfx-sources-wrap">
        <div style="margin-bottom:24px;">
          <h1 class="sfx-h1" style="font-size:2rem; margin-bottom:6px;">IPTV Kaynakları (<span class="accent">M3U Link & Xtream</span>) ve Kokpit Ayarları</h1>
          <p style="color:var(--sfx-muted); font-size:0.92rem;">
            Kendi M3U playlist linkinizi (<code>https://.../playlist.m3u8</code>), yerel <code>.m3u</code> dosyanızı veya Xtream Codes API bilgilerinizi aşağıdan ekleyebilirsiniz.
          </p>
        </div>

        <!-- EXACT SEFIROX 2-COLUMN SIDE-BY-SIDE IPTV FORMS (.sfx-addforms) -->
        <section class="sfx-addforms">
          <!-- CARD 1: M3U PLAYLIST URL LINK & FILE UPLOAD -->
          <div class="sfx-scard" style="border-color:rgba(63,202,130,0.45);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
              <h2 style="margin:0;">🔗 IPTV M3U Linki / Playlist Ekle</h2>
              <div style="display:flex; gap:6px;">
                <button type="button" class="sfx-btn ${state.m3uSubTab === 'url' ? 'sfx-btn-primary' : ''}" data-m3u-subtab="url" style="padding:5px 11px; font-size:0.74rem;">
                  🌐 M3U URL Linki
                </button>
                <button type="button" class="sfx-btn ${state.m3uSubTab === 'file' ? 'sfx-btn-primary' : ''}" data-m3u-subtab="file" style="padding:5px 11px; font-size:0.74rem;">
                  📂 Dosya Yükle (.m3u)
                </button>
              </div>
            </div>

            ${
              state.m3uSubTab === 'url'
                ? `
              <form id="sources-m3u-url-form">
                <div class="sfx-field">
                  <label>PLAYLIST / KAYNAK ADI</label>
                  <input type="text" name="name" class="sfx-input" placeholder="Örn: Kişisel IPTV Listem" value="IPTV M3U Listem" required />
                </div>
                <div class="sfx-field">
                  <label>IPTV M3U LİNKİ VEYA CANLI YAYIN (.M3U8) URL</label>
                  <input
                    type="url"
                    name="url"
                    id="sources-m3u-url-input"
                    class="sfx-input"
                    placeholder="https://example.com/playlist.m3u8 veya http://...:8080/get.php?..."
                    required
                  />
                </div>
                <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:16px;">
                  <button type="submit" class="sfx-btn sfx-btn-primary" style="flex:1; justify-content:center; padding:12px;">
                    📥 M3U Linkini Ekle & Kanalları Çek
                  </button>
                  <button type="button" id="sources-play-direct-btn" class="sfx-btn sfx-btn-iptv" style="padding:12px 16px;">
                    ⚡ Doğrudan Oynat
                  </button>
                </div>
              </form>
            `
                : `
              <form id="sources-m3u-file-form">
                <div class="sfx-field">
                  <label>PLAYLIST ADI</label>
                  <input type="text" name="name" class="sfx-input" placeholder="Örn: İndirilen M3U" value="Yerel M3U Dosyası" required />
                </div>
                <div class="sfx-field">
                  <label>.M3U VEYA .M3U8 DOSYASI SEÇİN</label>
                  <input type="file" name="file" accept=".m3u,.m3u8,.txt" class="sfx-input" required />
                </div>
                <button type="submit" class="sfx-btn sfx-btn-primary" style="width:100%; justify-content:center; padding:12px; margin-top:8px;">
                  📂 M3U Dosyasını Yükle & Ayrıştır
                </button>
              </form>
            `
            }
          </div>

          <!-- CARD 2: XTREAM CODES API -->
          <div class="sfx-scard">
            <h2>🔐 Xtream Codes API Ekle</h2>
            <form id="sources-xtream-form">
              <div class="sfx-field">
                <label>KAYNAK ADI</label>
                <input type="text" name="name" class="sfx-input" placeholder="Örn: Ev IPTV Paketi" required />
              </div>
              <div class="sfx-field">
                <label>SUNUCU URL (HOST:PORT)</label>
                <input type="url" name="server" class="sfx-input" placeholder="http://line.iptvsunucu.com:8080" required />
              </div>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                <div class="sfx-field">
                  <label>KULLANICI ADI</label>
                  <input type="text" name="username" class="sfx-input" placeholder="Kullanıcı adı" required />
                </div>
                <div class="sfx-field">
                  <label>ŞİFRE</label>
                  <input type="password" name="password" class="sfx-input" placeholder="••••••" required />
                </div>
              </div>
              <button type="submit" class="sfx-btn sfx-btn-primary" style="width:100%; justify-content:center; padding:12px; margin-top:6px;">
                🔌 Xtream Kaynağını Ekle & Senkronize Et
              </button>
            </form>
          </div>
        </section>

        <!-- SAVED SOURCES & SYSTEM SETTINGS -->
        <div class="sfx-sources-grid">
          <!-- LEFT: ACTIVE IPTV SOURCES & STREAM SETTINGS -->
          <div style="display:flex; flex-direction:column; gap:20px;">
            <div class="sfx-scard">
              <h3>📡 Kayıtlı IPTV Kaynaklarım (${state.sources.length})</h3>
              ${
                state.sources.length > 0
                  ? state.sources
                      .map(
                        src => `
                    <div class="sfx-source-item">
                      <div>
                        <div style="font-weight:700; font-size:0.92rem;">${escapeHtml(src.name)}</div>
                        <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--sfx-muted);">
                          ${escapeHtml(src.type?.toUpperCase() || 'M3U')} · ${escapeHtml(src.url || src.server || 'Yerel Dosya')} (${src.channelCount || 1} kanal)
                        </div>
                      </div>
                      <button type="button" class="sfx-btn" data-delete-source="${escapeHtml(src.id)}" style="padding:6px 10px; font-size:0.74rem; color:#ff3568;">
                        Sil ✕
                      </button>
                    </div>
                  `
                      )
                      .join('')
                  : `<p style="color:var(--sfx-muted); font-size:0.86rem;">Henüz kayıtlı harici kaynak yok. Yukarıdaki formlardan M3U linki veya Xtream ekleyebilirsiniz.</p>`
              }
              ${
                state.customChannels.length > 0
                  ? `
                <div style="margin-top:12px; padding-top:12px; border-top:1px solid var(--sfx-line); display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-size:0.8rem; color:var(--sfx-online);">Toplam ${state.customChannels.length} özel IPTV kanalı yüklü</span>
                  <button type="button" id="clear-custom-channels-btn" class="sfx-btn" style="padding:5px 10px; font-size:0.74rem;">Özel Kanalları Temizle</button>
                </div>
              `
                  : ''
              }
            </div>

            <div class="sfx-scard">
              <h3>⚡ Yayın, EPG & Proxy Ayarları</h3>
              <div class="sfx-source-item">
                <div>
                  <div style="font-weight:700; font-size:0.9rem;">Canlı EPG (Yayın Akışı) Gösterimi</div>
                  <div style="font-size:0.76rem; color:var(--sfx-muted);">Kanal kartlarında anlık program adı ve ilerleme çubuğu</div>
                </div>
                <button type="button" id="toggle-epg-btn" class="sfx-btn ${state.epgEnabled ? 'sfx-btn-primary' : ''}">
                  ${state.epgEnabled ? 'AÇIK' : 'KAPALI'}
                </button>
              </div>

              <div class="sfx-source-item">
                <div>
                  <div style="font-weight:700; font-size:0.9rem;">CORS & Yayın Proxy Bölgesi</div>
                  <div style="font-size:0.76rem; color:var(--sfx-muted);">Coğrafi kısıtlamalı yayınlar için tünel sunucusu</div>
                </div>
                <div style="display:flex; gap:6px;">
                  ${['TR', 'EU', 'US']
                    .map(
                      reg => `
                    <button type="button" class="sfx-btn ${state.proxyRegion === reg ? 'sfx-btn-primary' : ''}" data-proxy-reg="${reg}" style="padding:6px 12px; font-size:0.76rem;">
                      ${reg}
                    </button>
                  `
                    )
                    .join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT: THEMES, UI MODES & CATEGORY CUSTOMIZATION -->
          <div style="display:flex; flex-direction:column; gap:20px;">
            <div class="sfx-scard">
              <h3>🎨 Kokpit Renk Teması (6 Tema)</h3>
              <div class="sfx-theme-grid">
                ${THEMES.map(
                  t => `
                  <button type="button" class="sfx-theme-card ${state.theme === t.id ? 'active' : ''}" data-set-theme="${t.id}">
                    <div style="height:28px; border-radius:7px; background:${t.swatch}; margin-bottom:8px; border:1px solid rgba(255,255,255,0.15);"></div>
                    <div style="font-weight:700; font-size:0.84rem;">${escapeHtml(t.name)}</div>
                    <div style="font-size:0.7rem; color:var(--sfx-muted); margin-top:2px;">${escapeHtml(t.desc)}</div>
                  </button>
                `
                ).join('')}
              </div>
            </div>

            <div class="sfx-scard">
              <h3>🎛️ Arayüz Kullanım Stili (4 Mod)</h3>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                ${UI_MODES.map(
                  m => `
                  <button type="button" class="sfx-theme-card ${state.uiMode === m.id ? 'active' : ''}" data-set-uimode="${m.id}">
                    <div style="font-weight:700; font-size:0.86rem;">${escapeHtml(m.name)}</div>
                    <div style="font-size:0.72rem; color:var(--sfx-muted); margin-top:4px;">${escapeHtml(m.desc)}</div>
                  </button>
                `
                ).join('')}
              </div>
            </div>

            <div class="sfx-scard">
              <h3>📂 Kategori Yeniden Adlandırma</h3>
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                ${categories
                  .slice(0, 8)
                  .map(
                    cat => `
                  <div style="display:flex; align-items:center; gap:6px;">
                    <span style="font-family:var(--font-mono); font-size:0.7rem; width:95px; color:var(--sfx-muted); overflow:hidden; text-overflow:ellipsis;">${escapeHtml(cat)}</span>
                    <input
                      type="text"
                      class="sfx-input"
                      style="padding:7px 10px; font-size:0.8rem;"
                      data-cat-rename="${escapeHtml(cat)}"
                      placeholder="${escapeHtml(cat)}"
                      value="${escapeHtml((state.catConfig[cat] && state.catConfig[cat].alias) || '')}"
                    />
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `;
}

// ============================================================================
// VIEW 4: WATCH PLAYER (`/watch/:id`)
// ============================================================================
function renderWatchPage(channelId) {
  const allChannels = [... getAllChannels(), ...SAMPLE_VOD_MOVIES, ...SAMPLE_VOD_SERIES];
  const ch = allChannels.find(c => String(c.id) === String(channelId)) || allChannels[0];

  if (!ch) {
    return `<div class="sfx-root" style="padding:40px;">Kanal bulunamadı. <a href="/" data-nav="/">Ana sayfaya dön</a></div>`;
  }

  const epg = getChannelEpg(ch);
  const { primary, fallback } = getChannelLogoUrls(ch);

  return `
    <div class="sfx-watch">
      <div class="sfx-watch-top">
        <div style="display:flex; align-items:center; gap:14px;">
          <a href="/" data-nav="/" class="sfx-btn">← Geri</a>
          <img
            src="${escapeHtml(primary)}"
            alt="${escapeHtml(ch.name)}"
            referrerpolicy="no-referrer"
            onerror="this.onerror=null; this.src='${escapeHtml(fallback)}';"
            style="width:42px; height:42px; object-fit:contain; border-radius:8px; background:rgba(255,255,255,0.06); padding:4px;"
          />
          <div>
            <div style="font-family:var(--font-display); font-weight:700; font-size:1.15rem; display:flex; align-items:center; gap:8px;">
              <span>${escapeHtml(ch.name)}</span>
              <span class="sfx-tag" style="color:#3fca82; border-color:rgba(63,202,130,0.4);">CANLI HLS</span>
            </div>
            <div style="font-size:0.78rem; color:var(--sfx-muted);">
              ${epg ? `▶ ${escapeHtml(epg.title)} (${escapeHtml(epg.timeRange)})` : escapeHtml(ch.category || 'ULUSAL')}
            </div>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
          <button type="button" id="watch-toggle-canvas" class="sfx-btn ${state.watchCanvasMode ? 'sfx-btn-primary' : ''}" title="Tesla sürüş (D) modunda video engeline takılmamak için görüntüyü Canvas üzerinden çizer">
            🚗 ${state.watchCanvasMode ? 'Sürüş (Canvas) Modu: AÇIK' : 'Sürüş (Canvas) Moduna Geç'}
          </button>
          <button type="button" id="watch-mute-btn" class="sfx-btn">
            🔊 Ses Aç/Kapat
          </button>
          <button type="button" id="watch-toggle-drawer" class="sfx-btn">
            📋 Kanal Listesi ${state.watchDrawerOpen ? 'Gizle' : 'Göster'}
          </button>
          <button type="button" id="watch-fullscreen-btn" class="sfx-btn sfx-btn-primary">
            ⛶ Tam Ekran
          </button>
        </div>
      </div>

      <div class="sfx-watch-stage" id="watch-stage-container">
        <video
          id="sfx-main-video"
          controls
          autoplay
          playsinline
          style="${
            state.watchCanvasMode
              ? 'position:fixed; bottom:0; right:0; width:2px; height:2px; opacity:0.01; pointer-events:none; z-index:-1;'
              : 'display:block; width:100%; height:100%; object-fit:contain;'
          }"
        ></video>
        <canvas
          id="sfx-main-canvas"
          width="1280"
          height="720"
          style="display:${state.watchCanvasMode ? 'block' : 'none'}; width:100%; height:100%; object-fit:contain; cursor:pointer;"
        ></canvas>
      </div>

      ${
        state.watchDrawerOpen
          ? `
        <aside class="sfx-watch-drawer">
          <div style="padding:14px 16px; border-bottom:1px solid var(--sfx-line); display:flex; justify-content:space-between; align-items:center;">
            <strong style="font-family:var(--font-display); font-size:0.95rem;">Hızlı Kanal Geçişi (${getAllChannels().length})</strong>
            <button type="button" id="close-drawer-btn" style="background:none; border:none; color:var(--sfx-muted); cursor:pointer;">✕</button>
          </div>
          <div style="flex:1; overflow-y:auto; padding:10px; display:flex; flex-direction:column; gap:6px;">
            ${getAllChannels()
              .map(item => {
                const logos = getChannelLogoUrls(item);
                const active = String(item.id) === String(ch.id);
                return `
                  <a
                    href="/watch/${encodeURIComponent(item.id)}"
                    data-nav="/watch/${escapeHtml(item.id)}"
                    style="display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:10px; background:${active ? 'rgba(217,70,239,0.2)' : 'rgba(255,255,255,0.03)'}; border:1px solid ${active ? 'var(--sfx-violet)' : 'transparent'};"
                  >
                    <img
                      src="${escapeHtml(logos.primary)}"
                      alt="${escapeHtml(item.name)}"
                      referrerpolicy="no-referrer"
                      onerror="this.onerror=null; this.src='${escapeHtml(logos.fallback)}';"
                      style="width:32px; height:32px; object-fit:contain; border-radius:6px; background:rgba(0,0,0,0.35); padding:3px; flex-shrink:0;"
                    />
                    <div style="min-width:0; flex:1;">
                      <div style="font-weight:600; font-size:0.84rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(item.name)}</div>
                      <div style="font-size:0.68rem; color:var(--sfx-muted);">${escapeHtml(item.category || 'ULUSAL')}</div>
                    </div>
                  </a>
                `;
              })
              .join('')}
          </div>
        </aside>
      `
          : ''
      }
    </div>
  `;
}

// ============================================================================
// VIEW 5: AUTHENTICATION (MANDATORY LOGIN GATE & PUBLIC REGISTRATION)
// ============================================================================
function renderAuthPage(isRegister = false) {
  return `
    <div class="sfx-root" style="display:flex; align-items:center; justify-content:center; min-height:100vh; padding:24px;">
      <div class="sfx-scard" style="width:100%; max-width:420px; padding:28px;">
        <div style="display:flex; align-items:center; justify-content:center; gap:10px; margin-bottom:22px;">
          <div class="sfx-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="#ff3568" stroke-width="2.4">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
          <div class="sfx-wordmark" style="font-size:1.25rem;">
            <span>SEFIROX</span>
          </div>
        </div>

        <div class="sfx-tabs" style="width:100%; display:grid; grid-template-columns:1fr 1fr; margin-bottom:20px;">
          <button type="button" class="sfx-tab ${!isRegister ? 'active' : ''}" data-auth-switch="login" style="justify-content:center;">
            Giriş Yap
          </button>
          <button type="button" class="sfx-tab ${isRegister ? 'active' : ''}" data-auth-switch="register" style="justify-content:center;">
            Kayıt Ol
          </button>
        </div>

        <form id="auth-form" data-mode="${isRegister ? 'register' : 'login'}">
          ${
            isRegister
              ? `
            <div class="sfx-field">
              <label>AD SOYAD</label>
              <input type="text" name="name" class="sfx-input" placeholder="Adınız" required />
            </div>
          `
              : ''
          }
          <div class="sfx-field">
            <label>E-POSTA</label>
            <input type="email" name="email" id="auth-email-input" class="sfx-input" placeholder="ornek@domain.com" required />
          </div>
          <div class="sfx-field">
            <label>ŞİFRE</label>
            <input type="password" name="password" id="auth-pass-input" class="sfx-input" placeholder="••••••••" required />
          </div>
          <button type="submit" class="sfx-btn sfx-btn-primary" style="width:100%; justify-content:center; padding:12px; font-size:0.92rem; margin-top:8px;">
            ${isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  `;
}

// ============================================================================
// VIEW 6: ADMIN CONTROL PANEL (`/admin`)
// ============================================================================
function renderAdminPage() {
  if (!state.user || state.user.role !== 'admin') {
    return `
      <div class="sfx-root" style="padding:60px; text-align:center;">
        <h2>⚠️ Yetkisiz Erişim</h2>
        <p style="color:var(--sfx-muted); margin:12px 0 20px;">Bu sayfayı görüntülemek için Yönetici (Admin) hesabıyla giriş yapmalısınız.</p>
        <a href="/" data-nav="/" class="sfx-btn sfx-btn-primary">← Ana Sayfaya Dön</a>
      </div>
    `;
  }

  const ov = state.adminOverview || {
    stats: {
      totalUsers: 1,
      activeUsers: 1,
      publicChannelsCount: state.channels.length,
      totalSources: state.sources.length,
      announcementsCount: state.announcements.length
    },
    settings: { allowRegistration: true },
    users: [state.user],
    announcements: state.announcements
  };

  const assignUser = ov.users.find(u => u.id === state.adminAssignUserId);
  const filteredAdminChannels = state.adminChannelSearch.trim()
    ? state.channels.filter(
        c =>
          (c.name && c.name.toLowerCase().includes(state.adminChannelSearch.trim().toLowerCase())) ||
          (c.category && c.category.toLowerCase().includes(state.adminChannelSearch.trim().toLowerCase()))
      )
    : state.channels;

  return `
    <div class="sfx-root">
      <div class="sfx-beam"></div>
      <div class="sfx-grid-bg"></div>

      <header class="sfx-topbar">
        <div class="sfx-wrap sfx-topbar-in">
          <a href="/" data-nav="/" class="sfx-brand">
            <div class="sfx-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="#f5c451" stroke-width="2.4">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <div class="sfx-wordmark">
              <span>TESFLIX</span>
              <span class="sfx-tag" style="color:var(--sfx-gold); border-color:var(--sfx-gold);">ADMIN CONTROL</span>
            </div>
          </a>

          <div class="sfx-tabs">
            <button type="button" class="sfx-tab ${state.adminTab === 'users' ? 'active' : ''}" data-admin-tab="users">
              👥 Kullanıcılar & IPTV (${ov.users.length})
            </button>
            <button type="button" class="sfx-tab ${state.adminTab === 'channels' ? 'active' : ''}" data-admin-tab="channels">
              📺 Genel Kanallar (${state.channels.length})
            </button>
            <button type="button" class="sfx-tab ${state.adminTab === 'announcements' ? 'active' : ''}" data-admin-tab="announcements">
              📢 Duyurular & Sistem (${(ov.announcements || []).length})
            </button>
          </div>

          <div class="sfx-nav-act">
            <a href="/" data-nav="/" class="sfx-btn">← TV Ekranı</a>
            <a href="/dashboard" data-nav="/dashboard" class="sfx-btn sfx-btn-primary">🚀 Kokpit Paneli</a>
            <button type="button" id="logout-btn" class="sfx-btn" style="border-color:rgba(255,53,104,0.55); color:#ff6088; background:rgba(255,53,104,0.12);">
              🚪 Oturumu Kapat
            </button>
          </div>
        </div>
      </header>

      <main class="sfx-sources-wrap">
        <!-- STATS CARDS -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:14px; margin-bottom:24px;">
          <div class="sfx-scard" style="padding:16px 20px;">
            <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--sfx-muted);">TOPLAM KULLANICI</div>
            <div style="font-family:var(--font-display); font-size:1.9rem; font-weight:700; color:var(--sfx-pink);">${ov.stats.totalUsers}</div>
          </div>
          <div class="sfx-scard" style="padding:16px 20px;">
            <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--sfx-muted);">VARSAYILAN GENEL KANAL</div>
            <div style="font-family:var(--font-display); font-size:1.9rem; font-weight:700; color:var(--sfx-online);">${state.channels.length}</div>
          </div>
          <div class="sfx-scard" style="padding:16px 20px;">
            <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--sfx-muted);">DIŞARIDAN ÜYE KAYDI</div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-top:6px;">
              <strong style="color:${ov.settings?.allowRegistration !== false ? '#3fca82' : '#ff3568'};">
                ${ov.settings?.allowRegistration !== false ? 'AÇIK (HERKES)' : 'KAPALI'}
              </strong>
              <button type="button" id="admin-toggle-reg-btn" class="sfx-btn" style="padding:5px 10px; font-size:0.72rem;">
                Değiştir
              </button>
            </div>
          </div>
          <div class="sfx-scard" style="padding:16px 20px;">
            <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--sfx-muted);">AKTİF DUYURULAR</div>
            <div style="font-family:var(--font-display); font-size:1.9rem; font-weight:700; color:var(--sfx-gold);">${(ov.announcements || []).length}</div>
          </div>
        </div>

        ${
          state.adminTab === 'users'
            ? `
          <div class="sfx-sources-grid">
            <!-- LEFT: CREATE USER OR ASSIGN IPTV -->
            <div style="display:flex; flex-direction:column; gap:20px;">
              ${
                assignUser
                  ? `
                <div class="sfx-scard" style="border-color:var(--sfx-online);">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                    <h3 style="margin:0; color:var(--sfx-online);">📡 ${escapeHtml(assignUser.name)} Hesabına Uzaktan IPTV Tanımla</h3>
                    <button type="button" id="admin-cancel-assign-btn" class="sfx-btn" style="padding:4px 8px; font-size:0.72rem;">Kapat ✕</button>
                  </div>
                  <p style="font-size:0.8rem; color:var(--sfx-muted); margin-bottom:12px;">
                    Buradan tanımladığınız M3U linki veya Xtream paketi doğrudan <strong>${escapeHtml(assignUser.email)}</strong> kullanıcısının "Kanallarım & IPTV" sekmesine yüklenir.
                  </p>
                  <form id="admin-assign-iptv-form" data-user-id="${escapeHtml(assignUser.id)}">
                    <div class="sfx-field">
                      <label>PAKET / LİSTE ADI</label>
                      <input type="text" name="name" class="sfx-input" value="Özel IPTV Paketim" required />
                    </div>
                    <div class="sfx-field">
                      <label>M3U PLAYLIST URL VEYA .M3U8 LİNKİ</label>
                      <input type="url" name="url" class="sfx-input" placeholder="http://.../get.php?username=...&password=...&type=m3u_plus" required />
                    </div>
                    <button type="submit" class="sfx-btn sfx-btn-primary" style="width:100%; justify-content:center; padding:11px;">
                      📥 Kanalları Çek ve Kullanıcının Hesabına Yükle
                    </button>
                  </form>
                </div>
              `
                  : ''
              }

              <div class="sfx-scard">
                <h3>➕ Yeni Kullanıcı Oluştur</h3>
                <form id="admin-create-user-form">
                  <div class="sfx-field">
                    <label>AD SOYAD</label>
                    <input type="text" name="name" class="sfx-input" placeholder="Örn: Ahmet Yılmaz" required />
                  </div>
                  <div class="sfx-field">
                    <label>E-POSTA ADRESİ</label>
                    <input type="email" name="email" class="sfx-input" placeholder="ahmet@tesla.com" required />
                  </div>
                  <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                    <div class="sfx-field">
                      <label>ŞİFRE</label>
                      <input type="text" name="password" class="sfx-input" placeholder="En az 4 karakter" required />
                    </div>
                    <div class="sfx-field">
                      <label>YETKİ ROLÜ</label>
                      <select name="role" class="sfx-input">
                        <option value="user">Standart Kullanıcı</option>
                        <option value="admin">Yönetici (Admin)</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" class="sfx-btn sfx-btn-primary" style="width:100%; justify-content:center; padding:11px; margin-top:6px;">
                    👤 Kullanıcıyı Kaydet
                  </button>
                </form>
              </div>
            </div>

            <!-- RIGHT: REGISTERED USERS LIST -->
            <div class="sfx-scard">
              <h3>👥 Kayıtlı Kullanıcılar (${ov.users.length})</h3>
              <div style="display:flex; flex-direction:column; gap:10px;">
                ${ov.users
                  .map(
                    u => `
                  <div class="sfx-source-item" style="flex-wrap:wrap;">
                    <div>
                      <div style="display:flex; align-items:center; gap:8px;">
                        <strong style="font-size:0.95rem;">${escapeHtml(u.name)}</strong>
                        <span class="sfx-tag" style="${u.role === 'admin' ? 'color:var(--sfx-gold); border-color:var(--sfx-gold);' : ''}">
                          ${u.role === 'admin' ? 'ADMIN' : 'USER'}
                        </span>
                        <span class="sfx-tag" style="color:${u.isActive ? '#3fca82' : '#ff3568'}; border-color:${u.isActive ? 'rgba(63,202,130,0.4)' : 'rgba(255,53,104,0.4)'};">
                          ${u.isActive ? 'AKTİF' : 'PASİF'}
                        </span>
                      </div>
                      <div style="font-family:var(--font-mono); font-size:0.74rem; color:var(--sfx-muted); margin-top:4px;">
                        ${escapeHtml(u.email)} · Özel IPTV: <strong style="color:var(--sfx-online);">${u.iptvChannelCount || 0} kanal</strong>
                      </div>
                    </div>

                    <div style="display:flex; gap:6px; flex-wrap:wrap;">
                      <button type="button" class="sfx-btn sfx-btn-iptv" data-admin-assign="${escapeHtml(u.id)}" style="padding:6px 10px; font-size:0.73rem;">
                        📡 IPTV Tanımla
                      </button>
                      ${
                        (u.iptvChannelCount || 0) > 0
                          ? `<button type="button" class="sfx-btn" data-admin-clear-iptv="${escapeHtml(u.id)}" style="padding:6px 10px; font-size:0.73rem;">IPTV Sıfırla</button>`
                          : ''
                      }
                      <button type="button" class="sfx-btn" data-admin-toggle-role="${escapeHtml(u.id)}" data-current-role="${escapeHtml(u.role)}" style="padding:6px 10px; font-size:0.73rem;">
                        ${u.role === 'admin' ? 'User Yap' : 'Admin Yap'}
                      </button>
                      <button type="button" class="sfx-btn" data-admin-toggle-active="${escapeHtml(u.id)}" data-current-active="${u.isActive ? '1' : '0'}" style="padding:6px 10px; font-size:0.73rem;">
                        ${u.isActive ? 'Engelle' : 'Aktifleştir'}
                      </button>
                      ${
                        u.email !== 'admin@tesflix.com.tr'
                          ? `<button type="button" class="sfx-btn" data-admin-del-user="${escapeHtml(u.id)}" style="padding:6px 10px; font-size:0.73rem; color:#ff3568;">Sil ✕</button>`
                          : ''
                      }
                    </div>
                  </div>
                `
                  )
                  .join('')}
              </div>
            </div>
          </div>
        `
            : state.adminTab === 'channels'
            ? `
          <div class="sfx-sources-grid">
            <!-- LEFT: ADD OR EDIT PUBLIC CHANNEL -->
            <div class="sfx-scard">
              <h3>${state.adminEditingChannel ? `✏️ Kanalı Düzenle: ${escapeHtml(state.adminEditingChannel.name)}` : '➕ Yeni Genel Kanal Ekle'}</h3>
              <form id="admin-channel-form" data-edit-id="${escapeHtml(state.adminEditingChannel?.id || '')}">
                <div class="sfx-field">
                  <label>KANAL ADI</label>
                  <input type="text" name="name" class="sfx-input" placeholder="Örn: TRT 1 HD" value="${escapeHtml(state.adminEditingChannel?.name || '')}" required />
                </div>
                <div class="sfx-field">
                  <label>KATEGORİ</label>
                  <input type="text" name="category" class="sfx-input" placeholder="ULUSAL, HABER, SPOR, BELGESEL..." value="${escapeHtml(state.adminEditingChannel?.category || 'ULUSAL')}" required />
                </div>
                <div class="sfx-field">
                  <label>HLS (.M3U8) VEYA MPEG-TS (.TS) YAYIN LİNKİ</label>
                  <input type="url" name="stream_url" class="sfx-input" placeholder="https://.../master.m3u8" value="${escapeHtml(state.adminEditingChannel?.stream_url || '')}" required />
                </div>
                <div class="sfx-field">
                  <label>LOGO URL (OPSİYONEL — BOŞSA OTOMATİK SVG ÜRETİLİR)</label>
                  <input type="url" name="logo_url" class="sfx-input" placeholder="https://.../logo.png" value="${escapeHtml(state.adminEditingChannel?.logo_url || '')}" />
                </div>
                <div class="sfx-field">
                  <label>EPG KANAL ID (OPSİYONEL)</label>
                  <input type="text" name="epg_id" class="sfx-input" placeholder="Örn: trt1.tr" value="${escapeHtml(state.adminEditingChannel?.epg_id || '')}" />
                </div>
                <div style="display:flex; gap:8px; margin-top:12px;">
                  <button type="submit" class="sfx-btn sfx-btn-primary" style="flex:1; justify-content:center; padding:11px;">
                    ${state.adminEditingChannel ? '💾 Değişiklikleri Kaydet' : '➕ Genel Kanallara Ekle'}
                  </button>
                  ${
                    state.adminEditingChannel
                      ? `<button type="button" id="admin-cancel-edit-ch" class="sfx-btn">İptal</button>`
                      : ''
                  }
                </div>
              </form>
            </div>

            <!-- RIGHT: PUBLIC CHANNELS LIST -->
            <div class="sfx-scard">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; margin-bottom:14px; flex-wrap:wrap;">
                <h3 style="margin:0;">📺 Varsayılan Genel Kanallar (${filteredAdminChannels.length})</h3>
                <input
                  type="search"
                  id="admin-ch-search-input"
                  class="sfx-input"
                  style="max-width:240px; padding:7px 12px;"
                  placeholder="Kanal ara..."
                  value="${escapeHtml(state.adminChannelSearch)}"
                />
              </div>

              <div style="max-height:540px; overflow-y:auto; display:flex; flex-direction:column; gap:8px; padding-right:4px;">
                ${filteredAdminChannels
                  .map(ch => {
                    const logos = getChannelLogoUrls(ch);
                    return `
                      <div class="sfx-source-item" style="padding:10px 12px;">
                        <div style="display:flex; align-items:center; gap:10px; min-width:0; flex:1;">
                          <img
                            src="${escapeHtml(logos.primary)}"
                            onerror="this.onerror=null; this.src='${escapeHtml(logos.fallback)}';"
                            style="width:36px; height:36px; object-fit:contain; border-radius:6px; background:rgba(0,0,0,0.4); padding:3px; flex-shrink:0;"
                          />
                          <div style="min-width:0; flex:1;">
                            <div style="font-weight:700; font-size:0.88rem;">${escapeHtml(ch.name)}</div>
                            <div style="font-family:var(--font-mono); font-size:0.68rem; color:var(--sfx-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                              ${escapeHtml(ch.category)} · ${escapeHtml(ch.stream_url)}
                            </div>
                          </div>
                        </div>
                        <div style="display:flex; gap:6px; flex-shrink:0;">
                          <button type="button" class="sfx-btn" data-admin-edit-ch="${escapeHtml(ch.id)}" style="padding:5px 10px; font-size:0.72rem;">
                            ✏️ Düzenle
                          </button>
                          <button type="button" class="sfx-btn" data-admin-del-ch="${escapeHtml(ch.id)}" style="padding:5px 10px; font-size:0.72rem; color:#ff3568;">
                            Sil ✕
                          </button>
                        </div>
                      </div>
                    `;
                  })
                  .join('')}
              </div>
            </div>
          </div>
        `
            : `
          <div class="sfx-sources-grid">
            <div class="sfx-scard">
              <h3>📢 Yeni Üst Bant Duyurusu Yayınla</h3>
              <form id="admin-announcement-form">
                <div class="sfx-field">
                  <label>DUYURU BAŞLIĞI</label>
                  <input type="text" name="title" class="sfx-input" value="SİSTEM DUYURUSU" required />
                </div>
                <div class="sfx-field">
                  <label>DUYURU METNİ</label>
                  <input type="text" name="message" class="sfx-input" placeholder="Örn: Yeni spor ve belgesel kanalları eklendi!" required />
                </div>
                <button type="submit" class="sfx-btn sfx-btn-primary" style="width:100%; justify-content:center; padding:11px;">
                  📢 Duyuruyu Yayınla
                </button>
              </form>
            </div>

            <div class="sfx-scard">
              <h3>Aktif Duyurular (${(ov.announcements || []).length})</h3>
              ${
                (ov.announcements || []).length > 0
                  ? (ov.announcements || [])
                      .map(
                        a => `
                    <div class="sfx-source-item">
                      <div>
                        <strong style="color:var(--sfx-pink);">${escapeHtml(a.title)}</strong>
                        <div style="font-size:0.84rem; margin-top:2px;">${escapeHtml(a.message || a.content || '')}</div>
                      </div>
                      <button type="button" class="sfx-btn" data-admin-del-ann="${escapeHtml(a.id)}" style="padding:5px 10px; font-size:0.72rem; color:#ff3568;">
                        Kaldır ✕
                      </button>
                    </div>
                  `
                      )
                      .join('')
                  : `<p style="color:var(--sfx-muted); font-size:0.86rem;">Şu anda aktif duyuru bulunmuyor.</p>`
              }
            </div>
          </div>
        `
        }
      </main>
    </div>
  `;
}

// ============================================================================
// HLS VIDEO & CANVAS INITIALIZATION
// ============================================================================
function attachHlsStream(videoEl, streamUrl, channelObj = null) {
  if (!videoEl || !streamUrl) return;

  // Start Tesla silent audio keep-alive loop on playback
  const keepAlive = document.getElementById('tesla-keepalive');
  if (keepAlive && keepAlive.paused) {
    keepAlive.play().catch(() => {});
  }

  cleanupMediaPlayers();

  const isTsStream =
    (channelObj && channelObj.is_ts) ||
    /\.ts(\?.*)?$/i.test(streamUrl) ||
    (!/\.m3u8(\?.*)?$/i.test(streamUrl) && /\/live\/|\/\d+$/.test(streamUrl));

  // If stream is raw MPEG-TS (.ts, e.g., output=ts from Xtream Codes), play via mpegts.js + /api/stream proxy
  if (isTsStream && window.mpegts && window.mpegts.isSupported()) {
    const proxiedTsUrl = `/api/stream?url=${encodeURIComponent(streamUrl)}`;
    const player = window.mpegts.createPlayer(
      {
        type: 'mpegts',
        isLive: true,
        url: proxiedTsUrl
      },
      {
        enableWorker: true,
        lazyLoadMaxDuration: 3 * 60,
        seekType: 'range'
      }
    );
    state.activeMpegts = player;
    player.attachMediaElement(videoEl);
    player.load();
    player.play().catch(() => {});

    player.on(window.mpegts.Events.ERROR, () => {
      // If .ts fails and alt_stream_url (.m3u8) exists, fallback to HLS
      if (channelObj && channelObj.alt_stream_url) {
        attachHlsStream(videoEl, channelObj.alt_stream_url, { ...channelObj, is_ts: false, alt_stream_url: null });
      }
    });
    return;
  }

  // Standard HLS (.m3u8) playback via hls.js
  if (window.Hls && window.Hls.isSupported()) {
    const hls = new window.Hls({
      enableWorker: true,
      lowLatencyMode: state.watchLowLatency,
      backBufferLength: 60
    });
    state.activeHls = hls;
    const isHttpRemote = /^http:\/\//i.test(streamUrl);
    const initialSource = isHttpRemote ? `/api/stream?url=${encodeURIComponent(streamUrl)}` : streamUrl;

    hls.loadSource(initialSource);
    hls.attachMedia(videoEl);
    hls.on(window.Hls.Events.MANIFEST_PARSED, () => {
      videoEl.play().catch(() => {});
    });
    let triedProxy = isHttpRemote;
    hls.on(window.Hls.Events.ERROR, (_ev, data) => {
      if (data.fatal) {
        if (!triedProxy) {
          triedProxy = true;
          hls.loadSource(`/api/stream?url=${encodeURIComponent(streamUrl)}`);
          hls.startLoad();
          return;
        }
        const fallbackMux = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
        if (streamUrl !== fallbackMux) {
          hls.loadSource(fallbackMux);
          hls.startLoad();
        }
      }
    });
  } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
    videoEl.src = streamUrl;
    videoEl.play().catch(() => {});
  }
}

function initWatchPlayer(channelId) {
  const allChannels = [...getAllChannels(), ...SAMPLE_VOD_MOVIES, ...SAMPLE_VOD_SERIES];
  const ch = allChannels.find(c => String(c.id) === String(channelId)) || allChannels[0];
  if (!ch) return;

  const videoEl = document.getElementById('sfx-main-video');
  const canvasEl = document.getElementById('sfx-main-canvas');
  if (!videoEl) return;

  // Request Screen WakeLock for Tesla in-cabin continuous display
  if ('wakeLock' in navigator) {
    navigator.wakeLock.request('screen').catch(() => {});
  }

  attachHlsStream(videoEl, ch.stream_url, ch);

  // Auto-resume if Tesla OS triggers a media pause during P -> D gear shift in Canvas Mode
  videoEl.addEventListener('pause', () => {
    if (state.watchCanvasMode && !videoEl.ended && !videoEl._userPaused) {
      setTimeout(() => {
        videoEl.play().catch(() => {});
      }, 150);
    }
  });

  if (state.watchCanvasMode && canvasEl) {
    const ctx = canvasEl.getContext('2d');
    const drawLoop = () => {
      if (!state.watchCanvasMode) return;
      if (videoEl.readyState >= 2) {
        if (videoEl.videoWidth && canvasEl.width !== videoEl.videoWidth) {
          canvasEl.width = videoEl.videoWidth;
          canvasEl.height = videoEl.videoHeight || 720;
        }
        ctx.drawImage(videoEl, 0, 0, canvasEl.width, canvasEl.height);
      }
      state.canvasAnimFrame = requestAnimationFrame(drawLoop);
    };
    drawLoop();

    canvasEl.addEventListener('click', () => {
      if (videoEl.paused) {
        videoEl._userPaused = false;
        videoEl.play().catch(() => {});
      } else {
        videoEl.muted = !videoEl.muted;
        showToast(videoEl.muted ? '🔇 Ses Kapatıldı' : '🔊 Ses Açıldı');
      }
    });
  }
}

// ============================================================================
// IPTV IMPORT & DIRECT PLAY HANDLERS
// ============================================================================
async function handleM3uUrlSubmit(name, url, playImmediately = false) {
  const cleanUrl = String(url || '').trim();
  const cleanName = String(name || 'IPTV Paketi').trim();
  if (!cleanUrl) {
    showToast('⚠️ Lütfen geçerli bir IPTV M3U veya .m3u8 linki girin');
    return;
  }

  state.iptvLoading = true;
  showToast('⏳ IPTV sunucusuna bağlanılıyor, kanallar çekiliyor (lütfen bekleyin)...');

  try {
    const res = await fetch('/api/parse-m3u', {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ name: cleanName, url: cleanUrl })
    });

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      state.iptvLoading = false;
      showToast('⚠️ Sunucu (server.mjs) yeniden başlatılmalı! Lütfen terminalde sunucuyu yeniden başlatın.');
      return;
    }

    const data = await res.json();
    state.iptvLoading = false;

    if (!data.ok || !data.channels || data.channels.length === 0) {
      showToast('⚠️ ' + (data.error || 'Linkten kanal okunamadı.'));
      return;
    }

    // Prepend imported channels
    state.customChannels = [...data.channels, ...state.customChannels];
    saveJson(STORAGE_KEYS.CUSTOM_CHANNELS, state.customChannels.slice(0, 400));

    // Save source record
    const newSource = {
      id: 'src-' + Date.now(),
      type: data.sourceType || 'm3u',
      name: cleanName,
      url: cleanUrl,
      channelCount: data.channels.length,
      createdAt: new Date().toISOString()
    };
    state.sources.unshift(newSource);
    saveJson(STORAGE_KEYS.SOURCES, state.sources);
    fetch('/api/user/sources', {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(newSource)
    }).catch(() => {});

    if (playImmediately && data.channels[0]) {
      showToast(`⚡ ${data.channels[0].name} oynatılıyor...`);
      navigate(`/watch/${encodeURIComponent(data.channels[0].id)}`);
      return;
    }

    state.landingTab = 'mine';
    state.dashTab = 'iptv';
    state.landingCategory = 'TÜMÜ';
    state.dashCategory = 'TÜMÜ';
    state.visibleLimit = 120;
    showToast(`✅ ${data.channels.length} IPTV kanalı "Kanallarım & IPTV" sekmesine eklendi!`);
    render();
  } catch (err) {
    state.iptvLoading = false;
    showToast('⚠️ IPTV bağlantı hatası: ' + (err.message || 'Sunucuya ulaşılamadı'));
  }
}

async function handleXtreamSubmit(name, server, username, password) {
  const cleanServer = String(server || '').trim().replace(/\/+$/, '');
  const cleanName = String(name || 'Xtream IPTV').trim();
  showToast('⏳ Xtream Codes sunucusuna bağlanılıyor ve kanallar çekiliyor...');

  try {
    const res = await fetch('/api/parse-m3u', {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({
        name: cleanName,
        server: cleanServer,
        username: String(username || '').trim(),
        password: String(password || '').trim()
      })
    });
    const data = await res.json();
    if (!data.ok || !data.channels || data.channels.length === 0) {
      showToast('⚠️ ' + (data.error || 'Xtream sunucusundan kanal alınamadı'));
      return;
    }

    state.customChannels = [...data.channels, ...state.customChannels];
    saveJson(STORAGE_KEYS.CUSTOM_CHANNELS, state.customChannels.slice(0, 400));

    const src = {
      id: 'xt-' + Date.now(),
      type: 'xtream',
      name: cleanName,
      server: cleanServer,
      username,
      channelCount: data.channels.length
    };
    state.sources.unshift(src);
    saveJson(STORAGE_KEYS.SOURCES, state.sources);
    fetch('/api/user/sources', {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(src)
    }).catch(() => {});

    state.landingTab = 'mine';
    state.dashTab = 'iptv';
    state.landingCategory = 'TÜMÜ';
    state.dashCategory = 'TÜMÜ';
    showToast(`✅ ${cleanName} bağlandı (${data.channels.length} kanal yüklendi!)`);
    render();
  } catch (err) {
    showToast('⚠️ Xtream bağlantı hatası: ' + err.message);
  }
}

async function handleM3uFileSubmit(name, file) {
  if (!file) return;
  const text = await file.text();
  const res = await fetch('/api/parse-m3u', {
    method: 'POST',
    headers: authHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ name: name || file.name, content: text })
  });
  const data = await res.json();
  if (data.ok && data.channels && data.channels.length > 0) {
    state.customChannels = [...data.channels, ...state.customChannels];
    saveJson(STORAGE_KEYS.CUSTOM_CHANNELS, state.customChannels);
    state.sources.unshift({
      id: 'file-' + Date.now(),
      type: 'm3u_file',
      name: name || file.name,
      channelCount: data.channels.length
    });
    saveJson(STORAGE_KEYS.SOURCES, state.sources);
    state.landingTab = 'mine';
    state.dashTab = 'iptv';
    state.landingCategory = 'TÜMÜ';
    state.dashCategory = 'TÜMÜ';
    showToast(`✅ Dosyadan ${data.channels.length} kanal içe aktarıldı!`);
    render();
  } else {
    showToast('⚠️ Dosya içinde geçerli #EXTINF / M3U satırı bulunamadı.');
  }
}

// ============================================================================
// MAIN RENDER & EVENT BINDING
// ============================================================================
function render() {
  const app = document.getElementById('app');
  if (!app) return;

  const path = state.route;

  // MANDATORY LOGIN GATE: If user is not authenticated, show Login/Register screen on entry
  if (!state.user || path === '/auth/login' || path === '/auth/register') {
    const isReg = path === '/auth/register' || state.authMode === 'register';
    app.innerHTML = renderAuthPage(isReg);
    bindEvents();
    return;
  }

  if (path === '/admin') {
    app.innerHTML = renderAdminPage();
    bindEvents();
    if (!state.adminOverview) {
      fetchAdminOverview();
    }
    return;
  }

  if (path.startsWith('/watch/')) {
    const channelId = decodeURIComponent(path.replace('/watch/', ''));
    app.innerHTML = renderWatchPage(channelId);
    bindEvents();
    initWatchPlayer(channelId);
    return;
  }

  if (path === '/dashboard/sources') {
    app.innerHTML = renderSourcesPage();
    bindEvents();
    return;
  }

  if (path === '/dashboard') {
    app.innerHTML = renderDashboardPage();
    bindEvents();
    if (state.uiMode === 'kull2') {
      const splitVideo = document.getElementById('split-preview-video');
      const all = getAllChannels();
      const ch = all.find(c => c.id === state.splitPreviewChannelId) || all[0];
      if (splitVideo && ch) attachHlsStream(splitVideo, ch.stream_url);
    }
    return;
  }

  // Default: Landing Page `/`
  app.innerHTML = renderLandingPage();
  bindEvents();
}

function bindEvents() {
  // SPA Navigation Links
  document.querySelectorAll('[data-nav]').forEach(el => {
    el.addEventListener('click', ev => {
      const target = el.getAttribute('data-nav');
      if (!target) return;
      // If in kull2 split mode on /dashboard and clicking a channel card, preview it first on single click if desired
      ev.preventDefault();
      navigate(target);
    });
  });

  // Favorite buttons
  document.querySelectorAll('[data-fav-btn]').forEach(btn => {
    btn.addEventListener('click', ev => {
      const id = btn.getAttribute('data-fav-btn');
      toggleFav(id, ev);
    });
  });

  // Toggle Quick IPTV Bar
  const toggleIptvBtn = document.getElementById('toggle-iptv-bar-btn');
  if (toggleIptvBtn) {
    toggleIptvBtn.addEventListener('click', () => {
      state.iptvQuickBarOpen = !state.iptvQuickBarOpen;
      localStorage.setItem(STORAGE_KEYS.IPTV_BAR_OPEN, state.iptvQuickBarOpen ? '1' : '0');
      render();
      if (state.iptvQuickBarOpen) {
        const input = document.getElementById('quick-iptv-url-input');
        if (input) input.focus();
      }
    });
  }

  const heroOpenIptvBtn = document.getElementById('hero-open-iptv-btn');
  if (heroOpenIptvBtn) {
    heroOpenIptvBtn.addEventListener('click', () => {
      state.iptvQuickBarOpen = true;
      state.iptvQuickMode = 'm3u_url';
      localStorage.setItem(STORAGE_KEYS.IPTV_BAR_OPEN, '1');
      render();
      const input = document.getElementById('quick-iptv-url-input');
      if (input) {
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        input.focus();
      }
    });
  }

  const emptyOpenIptvBtn = document.getElementById('empty-open-iptv-btn');
  if (emptyOpenIptvBtn) {
    emptyOpenIptvBtn.addEventListener('click', () => {
      state.iptvQuickBarOpen = true;
      state.iptvQuickMode = 'm3u_url';
      render();
      const input = document.getElementById('quick-iptv-url-input');
      if (input) input.focus();
    });
  }

  // Quick IPTV mode switcher
  document.querySelectorAll('[data-iptv-mode]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.iptvQuickMode = btn.getAttribute('data-iptv-mode');
      render();
    });
  });

  // Fill Demo M3U URL button
  const fillDemoBtn = document.getElementById('fill-demo-m3u-btn');
  if (fillDemoBtn) {
    fillDemoBtn.addEventListener('click', () => {
      const input = document.getElementById('quick-iptv-url-input');
      if (input) {
        input.value = 'https://iptv-org.github.io/iptv/countries/tr.m3u';
        input.focus();
        showToast('✨ Örnek çoklu kanal M3U listesi (Türkiye M3U) dolduruldu! "Kanalları İçe Aktar"a tıklayın.');
      }
    });
  }

  // Quick M3U URL Form Submit
  const quickM3uForm = document.getElementById('quick-m3u-url-form');
  if (quickM3uForm) {
    quickM3uForm.addEventListener('submit', ev => {
      ev.preventDefault();
      const fd = new FormData(quickM3uForm);
      handleM3uUrlSubmit(fd.get('name'), fd.get('url'), false);
    });
  }

  const quickPlayDirectBtn = document.getElementById('quick-play-direct-btn');
  if (quickPlayDirectBtn && quickM3uForm) {
    quickPlayDirectBtn.addEventListener('click', () => {
      const fd = new FormData(quickM3uForm);
      handleM3uUrlSubmit(fd.get('name') || 'Canlı IPTV', fd.get('url'), true);
    });
  }

  // Quick Xtream Form
  const quickXtreamForm = document.getElementById('quick-xtream-form');
  if (quickXtreamForm) {
    quickXtreamForm.addEventListener('submit', ev => {
      ev.preventDefault();
      const fd = new FormData(quickXtreamForm);
      handleXtreamSubmit(fd.get('name'), fd.get('server'), fd.get('username'), fd.get('password'));
    });
  }

  // Quick M3U File Form
  const quickM3uFileForm = document.getElementById('quick-m3u-file-form');
  if (quickM3uFileForm) {
    quickM3uFileForm.addEventListener('submit', ev => {
      ev.preventDefault();
      const fd = new FormData(quickM3uFileForm);
      handleM3uFileSubmit(fd.get('name'), fd.get('file'));
    });
  }

  // Cycle Theme Button
  const cycleThemeBtn = document.getElementById('cycle-theme-btn');
  if (cycleThemeBtn) {
    cycleThemeBtn.addEventListener('click', () => {
      const idx = THEMES.findIndex(t => t.id === state.theme);
      const next = THEMES[(idx + 1) % THEMES.length];
      applyThemeAndUi(next.id, state.uiMode);
      showToast(`🎨 Tema: ${next.name}`);
      render();
    });
  }

  // Cycle UI Mode Button
  const cycleUiBtn = document.getElementById('cycle-ui-btn');
  if (cycleUiBtn) {
    cycleUiBtn.addEventListener('click', () => {
      const idx = UI_MODES.findIndex(m => m.id === state.uiMode);
      const next = UI_MODES[(idx + 1) % UI_MODES.length];
      applyThemeAndUi(state.theme, next.id);
      showToast(`🎛️ Görünüm: ${next.name}`);
      render();
    });
  }

  // Tesla Fullscreen Trick
  const teslaFsBtn = document.getElementById('tesla-fullscreen-btn');
  if (teslaFsBtn) {
    teslaFsBtn.addEventListener('click', () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      showToast('📺 Tam ekran modu tetiklendi (Tesla Park Modu uyumlu)');
    });
  }

  // Dismiss Announcement
  const dismissAnnBtn = document.getElementById('dismiss-ann-btn');
  if (dismissAnnBtn) {
    dismissAnnBtn.addEventListener('click', () => {
      state.announcementDismissed = true;
      sessionStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT_DISMISSED, '1');
      render();
    });
  }

  // Landing Tabs & Categories & Search
  document.querySelectorAll('[data-landing-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.landingTab = btn.getAttribute('data-landing-tab');
      state.landingCategory = 'TÜMÜ';
      state.visibleLimit = 120;
      if (state.landingTab === 'mine') {
        state.iptvQuickBarOpen = true;
      }
      render();
    });
  });

  document.querySelectorAll('[data-landing-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.landingCategory = btn.getAttribute('data-landing-cat');
      state.visibleLimit = 120;
      render();
    });
  });

  const landingSearch = document.getElementById('landing-search-input');
  if (landingSearch) {
    landingSearch.addEventListener('input', ev => {
      state.landingSearch = ev.target.value;
      const pos = ev.target.selectionStart;
      render();
      const nextInput = document.getElementById('landing-search-input');
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(pos, pos);
      }
    });
  }

  // Dashboard Tabs & Categories & Search
  document.querySelectorAll('[data-dash-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.dashTab = btn.getAttribute('data-dash-tab');
      state.dashCategory = 'TÜMÜ';
      state.visibleLimit = 120;
      render();
    });
  });

  document.querySelectorAll('[data-dash-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.dashCategory = btn.getAttribute('data-dash-cat');
      state.visibleLimit = 120;
      render();
    });
  });

  const dashSearch = document.getElementById('dash-search-input');
  if (dashSearch) {
    dashSearch.addEventListener('input', ev => {
      state.dashSearch = ev.target.value;
      const pos = ev.target.selectionStart;
      render();
      const nextInput = document.getElementById('dash-search-input');
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(pos, pos);
      }
    });
  }

  // PiP Navigation Map toggles
  const pipBtn = document.getElementById('toggle-pip-nav-btn');
  if (pipBtn) {
    pipBtn.addEventListener('click', () => {
      state.pipNavOpen = !state.pipNavOpen;
      render();
    });
  }
  const closePipBtn = document.getElementById('close-pip-nav-btn');
  if (closePipBtn) {
    closePipBtn.addEventListener('click', () => {
      state.pipNavOpen = false;
      render();
    });
  }
  const activatePipFromTab = document.getElementById('activate-pip-from-tab');
  if (activatePipFromTab) {
    activatePipFromTab.addEventListener('click', () => {
      state.pipNavOpen = true;
      state.dashTab = 'live';
      showToast('🗺️ PiP Harita açıldı, Canlı TV sekmesine geçildi');
      render();
    });
  }

  // YouTube / Twitch / Kick selectors
  document.querySelectorAll('[data-yt-id]').forEach(el => {
    el.addEventListener('click', ev => {
      if (ev.target.closest('[data-yt-save]') || ev.target.closest('[data-yt-remove]')) return;
      const vid = el.getAttribute('data-yt-id');
      state.selectedYoutubeId = vid;
      const titleAttr = el.getAttribute('data-yt-title');
      const channelAttr = el.getAttribute('data-yt-channel') || 'YouTube';
      if (titleAttr) state.selectedYoutubeTitle = titleAttr;
      render();
      setTimeout(() => startDriveKeepAlive(), 300);

      // Record in personal YouTube watch history
      if (state.user && vid) {
        fetch('/api/youtube/account', {
          method: 'POST',
          headers: authHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({
            action: 'add_history',
            video: {
              videoId: vid,
              title: titleAttr || state.selectedYoutubeTitle || 'YouTube Video',
              channel: channelAttr,
              duration: 'VİDEO',
            },
          }),
        })
          .then(r => r.json())
          .then(d => {
            if (d && d.ok && d.youtubeAccount && state.user) {
              state.user.youtubeAccount = d.youtubeAccount;
              localStorage.setItem('sfx_auth_user', JSON.stringify(state.user));
            }
          })
          .catch(() => {});
      }
    });
  });

  const ytCustomForm = document.getElementById('yt-custom-form');
  if (ytCustomForm) {
    ytCustomForm.addEventListener('submit', ev => {
      ev.preventDefault();
      const raw = String(new FormData(ytCustomForm).get('ytUrl') || '').trim();
      if (!raw) return;
      const match = raw.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
      state.selectedYoutubeId = match ? match[1] : raw;
      state.selectedYoutubeTitle = `YouTube Video (${state.selectedYoutubeId})`;
      render();
      setTimeout(() => startDriveKeepAlive(), 300);
    });
  }

  const ytSearchForm = document.getElementById('yt-search-form');
  if (ytSearchForm) {
    ytSearchForm.addEventListener('submit', async ev => {
      ev.preventDefault();
      const q = String(new FormData(ytSearchForm).get('q') || '').trim();
      if (!q) return;
      state.ytSearchQuery = q;
      state.ytSearching = true;
      state.ytListTab = 'search';
      render();
      try {
        const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(q)}`);
        const data = await res.json();
        const videos = data.videos || data.results || [];
        if (data.ok && Array.isArray(videos)) {
          state.ytSearchResults = videos;
          if (videos.length === 0) {
            showToast('Aramanızla eşleşen YouTube videosu bulunamadı', 'error');
          } else {
            showToast(`🔎 "${q}" için ${videos.length} YouTube videosu bulundu`);
          }
        }
      } catch (err) {
        showToast('YouTube arama hatası: ' + err.message, 'error');
      } finally {
        state.ytSearching = false;
        render();
      }
    });
  }

  document.querySelectorAll('[data-yt-list-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.ytListTab = btn.getAttribute('data-yt-list-tab');
      render();
    });
  });

  // Personal Home Feed Topic Chips
  document.querySelectorAll('[data-yt-topic-id]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const topicLabel = btn.getAttribute('data-yt-topic-id');
      const topicQuery = btn.getAttribute('data-yt-topic-query');
      try {
        showToast(`⏳ "${topicLabel}" videoları yükleniyor...`);
        const res = await fetch('/api/youtube/account', {
          method: 'POST',
          headers: authHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({
            action: 'refresh_feed',
            topic: topicQuery,
            topicLabel,
          }),
        });
        const data = await res.json();
        if (data.ok && state.user) {
          state.user.youtubeAccount = data.youtubeAccount;
          localStorage.setItem('sfx_auth_user', JSON.stringify(state.user));
          state.ytListTab = 'home';
          render();
        }
      } catch (err) {
        showToast('Akış yenilenemedi: ' + err.message, 'error');
      }
    });
  });

  // Refresh Personal YouTube Page button
  const ytRefreshPersonalBtn = document.getElementById('yt-refresh-personal-btn');
  if (ytRefreshPersonalBtn) {
    ytRefreshPersonalBtn.addEventListener('click', async () => {
      const ytAcc = state.user && state.user.youtubeAccount ? state.user.youtubeAccount : null;
      try {
        showToast('🔄 Kişisel YouTube sayfanız, videolarınız ve abonelikleriniz güncelleniyor...');
        const res = await fetch('/api/youtube/account', {
          method: 'POST',
          headers: authHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({
            action: 'connect',
            email: ytAcc ? ytAcc.email : state.user ? state.user.email : '',
            handleOrUrl: ytAcc ? ytAcc.handleOrUrl : '',
            displayName: ytAcc ? ytAcc.displayName : '',
          }),
        });
        const data = await res.json();
        if (data.ok && state.user) {
          state.user.youtubeAccount = data.youtubeAccount;
          localStorage.setItem('sfx_auth_user', JSON.stringify(state.user));
          showToast('✅ Kişisel YouTube sayfanız güncellendi');
          render();
        }
      } catch (err) {
        showToast('Yenileme hatası: ' + err.message, 'error');
      }
    });
  }

  // Subscriptions Management
  const ytAddSubForm = document.getElementById('yt-add-sub-form');
  if (ytAddSubForm) {
    ytAddSubForm.addEventListener('submit', async ev => {
      ev.preventDefault();
      const channel = String(new FormData(ytAddSubForm).get('channel') || '').trim();
      if (!channel) return;
      try {
        showToast(`🔔 "${channel}" kanalı aboneliklerinize ekleniyor...`);
        const res = await fetch('/api/youtube/account', {
          method: 'POST',
          headers: authHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({ action: 'add_subscription', channel }),
        });
        const data = await res.json();
        if (data.ok && state.user) {
          state.user.youtubeAccount = data.youtubeAccount;
          localStorage.setItem('sfx_auth_user', JSON.stringify(state.user));
          showToast(`✅ "${channel}" aboneliklerinize eklendi ve son videoları yüklendi`);
          render();
        }
      } catch (err) {
        showToast('Hata: ' + err.message, 'error');
      }
    });
  }

  document.querySelectorAll('[data-yt-unsub]').forEach(btn => {
    btn.addEventListener('click', async ev => {
      ev.stopPropagation();
      const handle = btn.getAttribute('data-yt-unsub');
      try {
        const res = await fetch('/api/youtube/account', {
          method: 'POST',
          headers: authHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({ action: 'remove_subscription', handle }),
        });
        const data = await res.json();
        if (data.ok && state.user) {
          state.user.youtubeAccount = data.youtubeAccount;
          localStorage.setItem('sfx_auth_user', JSON.stringify(state.user));
          showToast('Kanal abonelikten çıkarıldı');
          render();
        }
      } catch {}
    });
  });

  document.querySelectorAll('[data-yt-sub-filter]').forEach(el => {
    el.addEventListener('click', async () => {
      const chName = el.getAttribute('data-yt-sub-filter');
      if (!chName) return;
      try {
        showToast(`📺 ${chName} kanalının videoları getiriliyor...`);
        const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(chName + ' son videolar')}`);
        const data = await res.json();
        if (data.ok && state.user && state.user.youtubeAccount) {
          state.user.youtubeAccount.subscriptionVideos = data.videos || data.results || [];
          render();
        }
      } catch {}
    });
  });

  // Playlists Management
  document.querySelectorAll('[data-yt-pl-idx]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.ytSelectedPlaylistIdx = Number(btn.getAttribute('data-yt-pl-idx') || 0);
      render();
    });
  });

  const ytAddPlaylistForm = document.getElementById('yt-add-playlist-form');
  if (ytAddPlaylistForm) {
    ytAddPlaylistForm.addEventListener('submit', async ev => {
      ev.preventDefault();
      const fd = new FormData(ytAddPlaylistForm);
      const title = String(fd.get('title') || '').trim();
      const playlistUrl = String(fd.get('playlistUrl') || '').trim();
      if (!playlistUrl) return;
      try {
        showToast(`📂 "${title}" oynatma listesi içe aktarılıyor...`);
        const res = await fetch('/api/youtube/account', {
          method: 'POST',
          headers: authHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({ action: 'add_playlist', title, playlistUrl }),
        });
        const data = await res.json();
        if (data.ok && state.user) {
          state.user.youtubeAccount = data.youtubeAccount;
          localStorage.setItem('sfx_auth_user', JSON.stringify(state.user));
          state.ytSelectedPlaylistIdx = 0;
          showToast(`✅ "${title}" oynatma listenize eklendi`);
          render();
        }
      } catch (err) {
        showToast('Hata: ' + err.message, 'error');
      }
    });
  }

  const ytToggleConnectBtn = document.getElementById('yt-toggle-connect-btn');
  if (ytToggleConnectBtn) {
    ytToggleConnectBtn.addEventListener('click', () => {
      state.ytConnectOpen = !state.ytConnectOpen;
      if (state.ytConnectOpen) state.ytGoogleModalOpen = false;
      render();
    });
  }

  async function connectAndOpenPersonalYoutube({ email, handleOrUrl, displayName }) {
    try {
      showToast('⏳ Kişisel YouTube sayfanız, videolarınız ve abonelikleriniz yükleniyor...');
      const res = await fetch('/api/youtube/account', {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          action: 'connect',
          email: email || '',
          handleOrUrl: handleOrUrl || email || '',
          displayName: displayName || '',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showToast(data.error || 'Google / YouTube hesabı bağlanamadı', 'error');
        return;
      }
      if (state.user) {
        state.user.youtubeAccount = data.youtubeAccount;
        localStorage.setItem('sfx_auth_user', JSON.stringify(state.user));
      }
      state.ytGoogleModalOpen = false;
      state.ytConnectOpen = false;
      state.ytListTab = 'home';
      showToast(
        `✅ Kişisel YouTube sayfanız açıldı: ${data.youtubeAccount.displayName} (${(data.youtubeAccount.myVideos || []).length} kanal videosu, ${(data.youtubeAccount.homeFeed || []).length} kişisel akış videosu)`
      );
      render();
    } catch (err) {
      showToast('Bağlantı hatası: ' + err.message, 'error');
    }
  }

  const ytConnectForm = document.getElementById('yt-connect-account-form');
  if (ytConnectForm) {
    ytConnectForm.addEventListener('submit', async ev => {
      ev.preventDefault();
      const fd = new FormData(ytConnectForm);
      const handleOrUrl = String(fd.get('handleOrUrl') || '').trim();
      const displayName = String(fd.get('displayName') || '').trim();
      if (!handleOrUrl) {
        showToast('Lütfen YouTube @kullanıcıadı, Kanal URL veya Oynatma Listesi URL girin', 'error');
        return;
      }
      await connectAndOpenPersonalYoutube({
        email: state.user ? state.user.email : '',
        handleOrUrl,
        displayName,
      });
    });
  }

  const ytDisconnectBtn = document.getElementById('yt-disconnect-btn');
  if (ytDisconnectBtn) {
    ytDisconnectBtn.addEventListener('click', async () => {
      try {
        const res = await fetch('/api/youtube/account', {
          method: 'POST',
          headers: authHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({ action: 'disconnect' }),
        });
        const data = await res.json();
        if (data.ok && state.user) {
          state.user.youtubeAccount = null;
          localStorage.setItem('sfx_auth_user', JSON.stringify(state.user));
          state.ytListTab = 'curated';
          showToast('YouTube oturumu kapatıldı');
          render();
        }
      } catch (err) {
        showToast('Hata: ' + err.message, 'error');
      }
    });
  }

  const ytGoogleLoginBtn = document.getElementById('yt-google-login-btn');
  if (ytGoogleLoginBtn) {
    ytGoogleLoginBtn.addEventListener('click', () => {
      state.ytGoogleModalOpen = !state.ytGoogleModalOpen;
      if (state.ytGoogleModalOpen) state.ytConnectOpen = false;
      render();
    });
  }

  const ytCloseGoogleModalBtn = document.getElementById('yt-close-google-modal-btn');
  if (ytCloseGoogleModalBtn) {
    ytCloseGoogleModalBtn.addEventListener('click', () => {
      state.ytGoogleModalOpen = false;
      render();
    });
  }

  const ytGoogleEmailInput = document.getElementById('yt-google-email-input');
  if (ytGoogleEmailInput) {
    ytGoogleEmailInput.addEventListener('input', () => {
      state.ytLoginEmailDraft = ytGoogleEmailInput.value;
    });
  }

  const ytGoogleDirectForm = document.getElementById('yt-google-direct-form');
  if (ytGoogleDirectForm) {
    ytGoogleDirectForm.addEventListener('submit', async ev => {
      ev.preventDefault();
      const fd = new FormData(ytGoogleDirectForm);
      const email = String(fd.get('email') || '').trim();
      const handleOrUrl = String(fd.get('handleOrUrl') || email).trim();
      const displayName = String(fd.get('displayName') || '').trim();
      if (!email && !handleOrUrl) {
        showToast('Lütfen Google e-posta adresinizi veya YouTube @kullanıcıadınızı girin', 'error');
        return;
      }
      state.ytLoginEmailDraft = '';
      await connectAndOpenPersonalYoutube({ email, handleOrUrl, displayName });
    });
  }

  function finalizeGoogleAuthAndOpenPersonal() {
    if (window.__sfxGooglePopupTimer) {
      clearInterval(window.__sfxGooglePopupTimer);
      window.__sfxGooglePopupTimer = null;
    }
    const emailEl = document.getElementById('yt-google-email-input');
    const handleEl = document.getElementById('yt-google-handle-input');
    const nameEl = document.getElementById('yt-google-name-input');
    const email = ((emailEl && emailEl.value.trim()) || state.ytLoginEmailDraft || '').trim();
    const handleOrUrl = ((handleEl && handleEl.value.trim()) || email || '').trim();
    const displayName = ((nameEl && nameEl.value.trim()) || (email ? email.split('@')[0] : 'Kişisel YouTube')).trim();

    state.ytGoogleWaitingPopup = false;
    state.ytGoogleModalOpen = false;
    state.ytLoginEmailDraft = '';
    try {
      if (window.__sfxGooglePopupRef && !window.__sfxGooglePopupRef.closed) {
        window.__sfxGooglePopupRef.close();
      }
    } catch {}
    window.__sfxGooglePopupRef = null;
    connectAndOpenPersonalYoutube({ email, handleOrUrl, displayName });
  }

  function openGoogleAuthPopupAndSync(url, windowName) {
    if (window.__sfxGooglePopupTimer) {
      clearInterval(window.__sfxGooglePopupTimer);
      window.__sfxGooglePopupTimer = null;
    }
    const popup = window.open(
      url,
      windowName,
      'width=520,height=680,menubar=no,toolbar=no,location=yes,status=no'
    );
    window.__sfxGooglePopupRef = popup;
    state.ytGoogleWaitingPopup = true;
    render();
    showToast('🔐 Açılan pencerede Google hesabınıza giriş yapın, ardından pencereyi kapatın veya "✅ Girişi Tamamladım" butonuna basın.');

    if (popup) {
      window.__sfxGooglePopupTimer = setInterval(() => {
        try {
          if (popup.closed) {
            clearInterval(window.__sfxGooglePopupTimer);
            window.__sfxGooglePopupTimer = null;
            if (state.ytGoogleWaitingPopup) {
              finalizeGoogleAuthAndOpenPersonal();
            }
          }
        } catch {}
      }, 500);
    }
  }

  const ytConfirmGoogleDoneBtn = document.getElementById('yt-confirm-google-done-btn');
  if (ytConfirmGoogleDoneBtn) {
    ytConfirmGoogleDoneBtn.addEventListener('click', () => {
      finalizeGoogleAuthAndOpenPersonal();
    });
  }

  const ytClosePlayerBtn = document.getElementById('yt-close-player-btn');
  if (ytClosePlayerBtn) {
    ytClosePlayerBtn.addEventListener('click', () => {
      state.selectedYoutubeId = null;
      state.selectedYoutubeTitle = '';
      render();
    });
  }

  const ytOpenGoogleAddSession = document.getElementById('yt-open-google-addsession');
  if (ytOpenGoogleAddSession) {
    ytOpenGoogleAddSession.addEventListener('click', () => {
      openGoogleAuthPopupAndSync(
        'https://accounts.google.com/AddSession?hl=tr&service=youtube&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Dtr',
        'sfx_yt_google_addsession'
      );
    });
  }

  const ytOpenGoogleChooser = document.getElementById('yt-open-google-chooser');
  if (ytOpenGoogleChooser) {
    ytOpenGoogleChooser.addEventListener('click', () => {
      openGoogleAuthPopupAndSync(
        'https://accounts.google.com/AccountChooser?hl=tr&service=youtube&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Dtr',
        'sfx_yt_google_chooser'
      );
    });
  }

  document.querySelectorAll('[data-yt-save]').forEach(btn => {
    btn.addEventListener('click', async ev => {
      ev.stopPropagation();
      const videoId = btn.getAttribute('data-yt-save');
      const title = btn.getAttribute('data-yt-title') || `YouTube (${videoId})`;
      const channel = btn.getAttribute('data-yt-channel') || 'YouTube';
      const duration = btn.getAttribute('data-yt-duration') || 'Video';
      try {
        const res = await fetch('/api/youtube/account', {
          method: 'POST',
          headers: authHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({
            action: 'save_video',
            video: { videoId, title, channel, duration },
          }),
        });
        const data = await res.json();
        if (data.ok && state.user) {
          state.user.youtubeAccount = data.youtubeAccount;
          localStorage.setItem('sfx_auth_user', JSON.stringify(state.user));
          showToast(`⭐ "${title}" YouTube Kitaplığınıza eklendi`);
          render();
        }
      } catch (err) {
        showToast('Video kaydedilemedi: ' + err.message, 'error');
      }
    });
  });

  document.querySelectorAll('[data-yt-remove]').forEach(btn => {
    btn.addEventListener('click', async ev => {
      ev.stopPropagation();
      const videoId = btn.getAttribute('data-yt-remove');
      try {
        const res = await fetch('/api/youtube/account', {
          method: 'POST',
          headers: authHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({
            action: 'remove_video',
            videoId,
          }),
        });
        const data = await res.json();
        if (data.ok && state.user) {
          state.user.youtubeAccount = data.youtubeAccount;
          localStorage.setItem('sfx_auth_user', JSON.stringify(state.user));
          showToast('🗑️ Video kitaplığınızdan kaldırıldı');
          render();
        }
      } catch (err) {
        showToast('Hata: ' + err.message, 'error');
      }
    });
  });

  const ytDriveProtectBtn = document.getElementById('yt-drive-protect-btn');
  if (ytDriveProtectBtn) {
    ytDriveProtectBtn.addEventListener('click', () => {
      state.ytDriveProtect = !state.ytDriveProtect;
      startDriveKeepAlive();
      const iframe = document.getElementById('sfx-yt-iframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
      showToast(
        state.ytDriveProtect
          ? '🚗 Sürüş (Drive) Kesintisiz YouTube Modu Aktif: WakeLock + Silent Audio Keep-Alive devrede'
          : 'Sürüş koruma modu kapatıldı'
      );
      render();
    });
  }

  const ytForcePlayBtn = document.getElementById('yt-force-play-btn');
  if (ytForcePlayBtn) {
    ytForcePlayBtn.addEventListener('click', () => {
      startDriveKeepAlive();
      const iframe = document.getElementById('sfx-yt-iframe');
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
      showToast('▶️ Sürüşte Oynat komutu gönderildi + Ses Kilidi tazelendi');
    });
  }

  document.querySelectorAll('[data-twitch-ch]').forEach(el => {
    el.addEventListener('click', () => {
      state.selectedTwitchChannel = el.getAttribute('data-twitch-ch');
      render();
    });
  });

  const twitchForm = document.getElementById('twitch-custom-form');
  if (twitchForm) {
    twitchForm.addEventListener('submit', ev => {
      ev.preventDefault();
      const ch = String(new FormData(twitchForm).get('channel') || '').trim();
      if (ch) {
        state.selectedTwitchChannel = ch;
        render();
      }
    });
  }

  document.querySelectorAll('[data-kick-ch]').forEach(el => {
    el.addEventListener('click', () => {
      state.selectedKickChannel = el.getAttribute('data-kick-ch');
      render();
    });
  });

  const kickForm = document.getElementById('kick-custom-form');
  if (kickForm) {
    kickForm.addEventListener('submit', ev => {
      ev.preventDefault();
      const ch = String(new FormData(kickForm).get('channel') || '').trim();
      if (ch) {
        state.selectedKickChannel = ch;
        render();
      }
    });
  }

  // Sources Page Forms & Controls
  document.querySelectorAll('[data-m3u-subtab]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.m3uSubTab = btn.getAttribute('data-m3u-subtab');
      render();
    });
  });

  const sourcesM3uUrlForm = document.getElementById('sources-m3u-url-form');
  if (sourcesM3uUrlForm) {
    sourcesM3uUrlForm.addEventListener('submit', ev => {
      ev.preventDefault();
      const fd = new FormData(sourcesM3uUrlForm);
      handleM3uUrlSubmit(fd.get('name'), fd.get('url'), false);
    });
  }

  const sourcesPlayDirectBtn = document.getElementById('sources-play-direct-btn');
  if (sourcesPlayDirectBtn && sourcesM3uUrlForm) {
    sourcesPlayDirectBtn.addEventListener('click', () => {
      const fd = new FormData(sourcesM3uUrlForm);
      handleM3uUrlSubmit(fd.get('name') || 'Canlı IPTV', fd.get('url'), true);
    });
  }

  const sourcesM3uFileForm = document.getElementById('sources-m3u-file-form');
  if (sourcesM3uFileForm) {
    sourcesM3uFileForm.addEventListener('submit', ev => {
      ev.preventDefault();
      const fd = new FormData(sourcesM3uFileForm);
      handleM3uFileSubmit(fd.get('name'), fd.get('file'));
    });
  }

  const sourcesXtreamForm = document.getElementById('sources-xtream-form');
  if (sourcesXtreamForm) {
    sourcesXtreamForm.addEventListener('submit', ev => {
      ev.preventDefault();
      const fd = new FormData(sourcesXtreamForm);
      handleXtreamSubmit(fd.get('name'), fd.get('server'), fd.get('username'), fd.get('password'));
    });
  }

  document.querySelectorAll('[data-delete-source]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-delete-source');
      state.sources = state.sources.filter(s => s.id !== id);
      saveJson(STORAGE_KEYS.SOURCES, state.sources);
      fetch(`/api/user/sources?id=${encodeURIComponent(id)}`, { method: 'DELETE', headers: authHeaders() }).catch(() => {});
      showToast('Kaynak silindi');
      render();
    });
  });

  const clearCustomBtn = document.getElementById('clear-custom-channels-btn');
  if (clearCustomBtn) {
    clearCustomBtn.addEventListener('click', () => {
      state.customChannels = [];
      saveJson(STORAGE_KEYS.CUSTOM_CHANNELS, []);
      fetch('/api/iptv/channels', { method: 'DELETE', headers: authHeaders() }).catch(() => {});
      showToast('Özel IPTV kanalları temizlendi');
      render();
    });
  }

  const loadMoreBtn = document.getElementById('load-more-channels-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      const scrollY = window.scrollY;
      state.visibleLimit += 180;
      render();
      window.scrollTo({ top: scrollY });
    });
  }

  const toggleEpgBtn = document.getElementById('toggle-epg-btn');
  if (toggleEpgBtn) {
    toggleEpgBtn.addEventListener('click', () => {
      state.epgEnabled = !state.epgEnabled;
      localStorage.setItem(STORAGE_KEYS.EPG_ENABLED, state.epgEnabled ? '1' : '0');
      render();
    });
  }

  document.querySelectorAll('[data-proxy-reg]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.proxyRegion = btn.getAttribute('data-proxy-reg');
      localStorage.setItem(STORAGE_KEYS.PROXY_REGION, state.proxyRegion);
      showToast(`🌐 Proxy Bölgesi: ${state.proxyRegion}`);
      render();
    });
  });

  document.querySelectorAll('[data-set-theme]').forEach(btn => {
    btn.addEventListener('click', () => {
      const th = btn.getAttribute('data-set-theme');
      applyThemeAndUi(th, state.uiMode);
      render();
    });
  });

  document.querySelectorAll('[data-set-uimode]').forEach(btn => {
    btn.addEventListener('click', () => {
      const um = btn.getAttribute('data-set-uimode');
      applyThemeAndUi(state.theme, um);
      render();
    });
  });

  document.querySelectorAll('[data-cat-rename]').forEach(inp => {
    inp.addEventListener('change', ev => {
      const cat = inp.getAttribute('data-cat-rename');
      state.catConfig[cat] = { ...(state.catConfig[cat] || {}), alias: ev.target.value.trim() };
      saveJson(STORAGE_KEYS.CAT_CONFIG, state.catConfig);
      showToast(`✅ ${cat} kategorisi güncellendi`);
    });
  });

  // Watch Page Controls
  const toggleCanvasBtn = document.getElementById('watch-toggle-canvas');
  if (toggleCanvasBtn) {
    toggleCanvasBtn.addEventListener('click', () => {
      state.watchCanvasMode = !state.watchCanvasMode;
      showToast(
        state.watchCanvasMode
          ? '🚗 Sürüş (Canvas) Modu Aktif: Görüntü HTML5 Canvas üzerinden çiziliyor'
          : '📺 Standart Video Modu Aktif'
      );
      render();
    });
  }

  const watchMuteBtn = document.getElementById('watch-mute-btn');
  if (watchMuteBtn) {
    watchMuteBtn.addEventListener('click', () => {
      const videoEl = document.getElementById('sfx-main-video');
      if (videoEl) {
        videoEl.muted = !videoEl.muted;
        if (!videoEl.muted && videoEl.paused) {
          videoEl.play().catch(() => {});
        }
        showToast(videoEl.muted ? '🔇 Ses Kapatıldı' : '🔊 Ses Açıldı');
      }
    });
  }

  const toggleDrawerBtn = document.getElementById('watch-toggle-drawer');
  if (toggleDrawerBtn) {
    toggleDrawerBtn.addEventListener('click', () => {
      state.watchDrawerOpen = !state.watchDrawerOpen;
      render();
    });
  }

  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', () => {
      state.watchDrawerOpen = false;
      render();
    });
  }

  const watchFsBtn = document.getElementById('watch-fullscreen-btn');
  if (watchFsBtn) {
    watchFsBtn.addEventListener('click', () => {
      const stage = document.getElementById('watch-stage-container') || document.documentElement;
      if (stage.requestFullscreen) {
        stage.requestFullscreen().catch(() => {});
      }
    });
  }

  // Auth Switch Tabs (Login / Register)
  document.querySelectorAll('[data-auth-switch]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.authMode = btn.getAttribute('data-auth-switch');
      if (state.route === '/auth/login' || state.route === '/auth/register') {
        state.route = '/';
      }
      render();
    });
  });

  // Fill Demo Admin Credentials Button
  const fillAdminBtn = document.getElementById('fill-admin-creds-btn');
  if (fillAdminBtn) {
    fillAdminBtn.addEventListener('click', () => {
      const emailEl = document.getElementById('auth-email-input');
      const passEl = document.getElementById('auth-pass-input');
      if (emailEl && passEl) {
        emailEl.value = 'admin@tesflix.com.tr';
        passEl.value = 'admin123';
        showToast('🛡️ Yönetici (Admin) bilgileri dolduruldu. Giriş Yap butonuna tıklayın!');
      }
    });
  }

  // Logout Button
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      state.user = null;
      state.token = '';
      state.customChannels = [];
      state.sources = [];
      state.adminOverview = null;
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_CHANNELS);
      localStorage.removeItem(STORAGE_KEYS.SOURCES);
      showToast('🚪 Oturum kapatıldı');
      navigate('/');
    });
  }

  // Auth Form Submit (Login & Register)
  const authForm = document.getElementById('auth-form');
  if (authForm) {
    authForm.addEventListener('submit', async ev => {
      ev.preventDefault();
      const fd = new FormData(authForm);
      const email = String(fd.get('email') || '').trim();
      const password = String(fd.get('password') || '').trim();
      const name = String(fd.get('name') || '').trim();
      const mode = authForm.getAttribute('data-mode');

      try {
        const res = await fetch(`/api/auth/${mode === 'register' ? 'register' : 'login'}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name })
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          showToast('⚠️ ' + (data.error || 'Giriş/Kayıt başarısız oldu.'));
          return;
        }

        state.user = data.user;
        state.token = data.token || '';
        saveJson(STORAGE_KEYS.USER, state.user);
        localStorage.setItem(STORAGE_KEYS.TOKEN, state.token);

        await loadUserSessionData();
        if (state.user.role === 'admin') {
          fetchAdminOverview();
        }

        showToast(`✅ Hoş geldiniz, ${state.user.name}! Kanallar açıldı.`);
        navigate('/');
      } catch (err) {
        showToast('⚠️ Sunucu bağlantı hatası: ' + err.message);
      }
    });
  }

  // ==========================================================================
  // ADMIN PANEL EVENT HANDLERS
  // ==========================================================================
  document.querySelectorAll('[data-admin-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.adminTab = btn.getAttribute('data-admin-tab');
      render();
    });
  });

  const toggleRegBtn = document.getElementById('admin-toggle-reg-btn');
  if (toggleRegBtn) {
    toggleRegBtn.addEventListener('click', async () => {
      const current = state.adminOverview?.settings?.allowRegistration !== false;
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ allowRegistration: !current })
      });
      if (res.ok) {
        showToast(!current ? '✅ Dışarıdan yeni üye kaydı AÇILDI' : '🔒 Dışarıdan yeni üye kaydı KAPATILDI');
        fetchAdminOverview();
      }
    });
  }

  const adminCreateUserForm = document.getElementById('admin-create-user-form');
  if (adminCreateUserForm) {
    adminCreateUserForm.addEventListener('submit', async ev => {
      ev.preventDefault();
      const fd = new FormData(adminCreateUserForm);
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email'),
          password: fd.get('password'),
          role: fd.get('role')
        })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showToast('⚠️ ' + (data.error || 'Kullanıcı oluşturulamadı'));
        return;
      }
      showToast(`✅ ${data.user.name} (${data.user.email}) oluşturuldu!`);
      adminCreateUserForm.reset();
      fetchAdminOverview();
    });
  }

  document.querySelectorAll('[data-admin-assign]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.adminAssignUserId = btn.getAttribute('data-admin-assign');
      render();
    });
  });

  const cancelAssignBtn = document.getElementById('admin-cancel-assign-btn');
  if (cancelAssignBtn) {
    cancelAssignBtn.addEventListener('click', () => {
      state.adminAssignUserId = null;
      render();
    });
  }

  const adminAssignForm = document.getElementById('admin-assign-iptv-form');
  if (adminAssignForm) {
    adminAssignForm.addEventListener('submit', async ev => {
      ev.preventDefault();
      const targetUserId = adminAssignForm.getAttribute('data-user-id');
      const fd = new FormData(adminAssignForm);
      showToast('⏳ Kullanıcının hesabına IPTV kanalları çekiliyor ve tanımlanıyor...');
      const res = await fetch(`/api/admin/users/${encodeURIComponent(targetUserId)}/assign-iptv`, {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          name: fd.get('name'),
          url: fd.get('url')
        })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showToast('⚠️ ' + (data.error || 'IPTV tanımlanamadı'));
        return;
      }
      showToast(`✅ ${data.count} IPTV kanalı kullanıcının hesabına başarıyla tanımlandı!`);
      state.adminAssignUserId = null;
      if (state.user && state.user.id === targetUserId) {
        await loadUserSessionData();
      }
      fetchAdminOverview();
    });
  }

  document.querySelectorAll('[data-admin-clear-iptv]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const uid = btn.getAttribute('data-admin-clear-iptv');
      await fetch(`/api/admin/users/${encodeURIComponent(uid)}/clear-iptv`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (state.user && state.user.id === uid) {
        state.customChannels = [];
      }
      showToast('Kullanıcının IPTV kanalları temizlendi');
      fetchAdminOverview();
    });
  });

  document.querySelectorAll('[data-admin-toggle-role]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const uid = btn.getAttribute('data-admin-toggle-role');
      const curRole = btn.getAttribute('data-current-role');
      const nextRole = curRole === 'admin' ? 'user' : 'admin';
      const res = await fetch(`/api/admin/users/${encodeURIComponent(uid)}`, {
        method: 'PUT',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ role: nextRole })
      });
      if (res.ok) {
        showToast(`✅ Kullanıcı rolü ${nextRole.toUpperCase()} olarak güncellendi`);
        fetchAdminOverview();
      }
    });
  });

  document.querySelectorAll('[data-admin-toggle-active]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const uid = btn.getAttribute('data-admin-toggle-active');
      const curActive = btn.getAttribute('data-current-active') === '1';
      const res = await fetch(`/api/admin/users/${encodeURIComponent(uid)}`, {
        method: 'PUT',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ isActive: !curActive })
      });
      if (res.ok) {
        showToast(!curActive ? '✅ Kullanıcı aktifleştirildi' : '🔒 Kullanıcı pasife alındı');
        fetchAdminOverview();
      }
    });
  });

  document.querySelectorAll('[data-admin-del-user]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const uid = btn.getAttribute('data-admin-del-user');
      const res = await fetch(`/api/admin/users/${encodeURIComponent(uid)}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showToast('⚠️ ' + (data.error || 'Silinemedi'));
        return;
      }
      showToast('🗑️ Kullanıcı silindi');
      fetchAdminOverview();
    });
  });

  // Admin Public Channels Management
  const adminChForm = document.getElementById('admin-channel-form');
  if (adminChForm) {
    adminChForm.addEventListener('submit', async ev => {
      ev.preventDefault();
      const editId = adminChForm.getAttribute('data-edit-id');
      const fd = new FormData(adminChForm);
      const payload = {
        name: fd.get('name'),
        category: fd.get('category'),
        stream_url: fd.get('stream_url'),
        logo_url: fd.get('logo_url'),
        epg_id: fd.get('epg_id')
      };

      const url = editId ? `/api/admin/channels/${encodeURIComponent(editId)}` : '/api/admin/channels';
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        showToast('⚠️ ' + (data.error || 'Kanal kaydedilemedi'));
        return;
      }

      const chRes = await fetch('/api/channels');
      if (chRes.ok) state.channels = await chRes.json();
      state.adminEditingChannel = null;
      showToast(editId ? '✅ Kanal güncellendi!' : '✅ Yeni genel kanal eklendi!');
      render();
    });
  }

  const cancelEditChBtn = document.getElementById('admin-cancel-edit-ch');
  if (cancelEditChBtn) {
    cancelEditChBtn.addEventListener('click', () => {
      state.adminEditingChannel = null;
      render();
    });
  }

  document.querySelectorAll('[data-admin-edit-ch]').forEach(btn => {
    btn.addEventListener('click', () => {
      const chId = btn.getAttribute('data-admin-edit-ch');
      state.adminEditingChannel = state.channels.find(c => String(c.id) === String(chId)) || null;
      render();
    });
  });

  document.querySelectorAll('[data-admin-del-ch]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const chId = btn.getAttribute('data-admin-del-ch');
      const res = await fetch(`/api/admin/channels/${encodeURIComponent(chId)}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (res.ok) {
        state.channels = state.channels.filter(c => String(c.id) !== String(chId));
        showToast('🗑️ Genel kanal silindi');
        render();
      }
    });
  } );

  const adminChSearch = document.getElementById('admin-ch-search-input');
  if (adminChSearch) {
    adminChSearch.addEventListener('input', ev => {
      state.adminChannelSearch = ev.target.value;
      const pos = ev.target.selectionStart;
      render();
      const next = document.getElementById('admin-ch-search-input');
      if (next) {
        next.focus();
        next.setSelectionRange(pos, pos);
      }
    });
  }

  const adminAnnForm = document.getElementById('admin-announcement-form');
  if (adminAnnForm) {
    adminAnnForm.addEventListener('submit', async ev => {
      ev.preventDefault();
      const fd = new FormData(adminAnnForm);
      const res = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: authHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          title: fd.get('title'),
          message: fd.get('message')
        })
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        state.announcements = data.announcements || [];
        showToast('📢 Duyuru yayınlandı!');
        fetchAdminOverview();
      }
    });
  }

  document.querySelectorAll('[data-admin-del-ann]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const annId = btn.getAttribute('data-admin-del-ann');
      const res = await fetch(`/api/admin/announcements/${encodeURIComponent(annId)}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        state.announcements = data.announcements || [];
        showToast('🗑️ Duyuru kaldırıldı');
        fetchAdminOverview();
      }
    });
  });
}

// ============================================================================
// BOOTSTRAP APPLICATION
// ============================================================================
async function bootstrap() {
  applyThemeAndUi(state.theme, state.uiMode);

  // Live telemetry clock updater
  setInterval(() => {
    state.clockStr = formatClock();
    const clockEl = document.getElementById('sfx-live-clock');
    if (clockEl) clockEl.textContent = state.clockStr;
  }, 1000);

  try {
    // Verify existing token if present
    if (state.token) {
      const meRes = await fetch('/api/auth/me', { headers: authHeaders() }).catch(() => null);
      if (meRes && meRes.ok) {
        const meData = await meRes.json();
        if (meData.ok && meData.user) {
          state.user = meData.user;
          saveJson(STORAGE_KEYS.USER, state.user);
        }
      } else {
        state.user = null;
        state.token = '';
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
      }
    } else {
      state.user = null;
      localStorage.removeItem(STORAGE_KEYS.USER);
    }

    const [chRes, epgRes, annRes] = await Promise.all([
      fetch('/api/channels'),
      fetch('/api/user/epg'),
      fetch('/api/announcements/active')
    ]);
    if (chRes.ok) state.channels = await chRes.json();
    if (epgRes.ok) {
      const epgData = await epgRes.json();
      state.epg = epgData.epg || {};
    }
    if (annRes.ok) {
      const annData = await annRes.json();
      state.announcements = annData.announcements || [];
    }

    if (state.user) {
      await loadUserSessionData();
    }
  } catch (err) {
    console.error('Veri yükleme hatası:', err);
  }

  render();
}

bootstrap();
