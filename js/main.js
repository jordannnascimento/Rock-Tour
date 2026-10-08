// Menu mobile
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// Ano no rodapé
document.querySelectorAll('.year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Player de música
// 1) Arquivos mp3 na pasta audio/. Se a lista tiver arquivos, o site usa eles.
//    Exemplo: const AUDIO_FILES = ['audio/musica-1.mp3', 'audio/musica-2.mp3'];
// 2) Se a lista de mp3 estiver vazia (ou nenhum arquivo abrir), o site usa os vídeos do YouTube.
//    O código do vídeo é o que vem depois de "watch?v=" ou "youtu.be/" no link.
const AUDIO_FILES = [];
const YOUTUBE_IDS = ['nSQzXOgIQjM', 'CD-E-LDc384'];

const card = document.getElementById('ytPlayer');
const musicBtn = document.querySelector('.music-btn');
const closeBtn = document.querySelector('.yt-close');
let wantPlay = false;
// Comandos do player que estiver ativo (mp3 ou YouTube)
const ctrl = { play() { wantPlay = true; }, pause() {}, save() {} };

const isOpen = () => !card.hidden;
const setOpen = (open) => {
  card.hidden = !open;
  musicBtn.setAttribute('aria-expanded', open);
  musicBtn.setAttribute('aria-label', open ? 'Fechar player de música' : 'Abrir player de música');
};

function startYouTube() {
  if (!YOUTUBE_IDS.length) { setOpen(false); musicBtn.hidden = true; return; }
  card.querySelector('.yt-frame').hidden = false;
  card.querySelector('.mp3-ui').hidden = true;
  let player = null;
  let ready = false;
  let current = 0;
  let failures = 0;
  const savedIndex = parseInt(sessionStorage.getItem('ytIndex'), 10);
  if (Number.isInteger(savedIndex) && savedIndex >= 0 && savedIndex < YOUTUBE_IDS.length) current = savedIndex;

  ctrl.play = () => { if (ready && player) player.playVideo(); else wantPlay = true; };
  ctrl.pause = () => { if (ready && player) player.pauseVideo(); };
  ctrl.save = () => {
    if (player && ready && player.getCurrentTime) {
      const t = player.getCurrentTime();
      if (Number.isFinite(t)) sessionStorage.setItem('ytTime', String(t));
      sessionStorage.setItem('ytIndex', String(current));
    }
  };

  const next = () => {
    current = (current + 1) % YOUTUBE_IDS.length;
    sessionStorage.setItem('ytIndex', String(current));
    sessionStorage.removeItem('ytTime');
  };

  window.onYouTubeIframeAPIReady = () => {
    const saved = parseFloat(sessionStorage.getItem('ytTime'));
    const start = Number.isFinite(saved) && saved > 0 ? Math.floor(saved) : 0;
    player = new YT.Player('ytFrame', {
      videoId: YOUTUBE_IDS[current],
      playerVars: { rel: 0, playsinline: 1, start },
      events: {
        onReady: () => {
          ready = true;
          player.setVolume(50);
          if (wantPlay && isOpen()) player.playVideo();
        },
        onStateChange: (e) => {
          if (e.data === YT.PlayerState.PLAYING) failures = 0;
          // Quando a música termina, toca a próxima da lista
          if (e.data === YT.PlayerState.ENDED) {
            if (YOUTUBE_IDS.length === 1) { player.seekTo(0); player.playVideo(); return; }
            next();
            player.loadVideoById(YOUTUBE_IDS[current]);
          }
        },
        onError: () => {
          // Vídeo bloqueado ou removido: pula para o próximo
          failures += 1;
          if (failures >= YOUTUBE_IDS.length) {
            sessionStorage.removeItem('ytIndex');
            setOpen(false);
            musicBtn.hidden = true;
            return;
          }
          next();
          if (isOpen()) player.loadVideoById(YOUTUBE_IDS[current]);
          else player.cueVideoById(YOUTUBE_IDS[current]);
        }
      }
    });
  };

  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
}

function startMp3() {
  const ui = card.querySelector('.mp3-ui');
  const title = ui.querySelector('.mp3-title');
  const playBtn = ui.querySelector('.mp3-play');
  card.querySelector('.yt-frame').hidden = true;
  ui.hidden = false;

  const audio = new Audio();
  audio.preload = 'auto';
  audio.volume = 0.5;
  let current = 0;
  let failures = 0;
  const savedIndex = parseInt(sessionStorage.getItem('mp3Index'), 10);
  if (Number.isInteger(savedIndex) && savedIndex >= 0 && savedIndex < AUDIO_FILES.length) current = savedIndex;
  let resumeAt = parseFloat(sessionStorage.getItem('mp3Time'));

  // Nome da música a partir do nome do arquivo
  const nameOf = (src) => decodeURIComponent(src.split('/').pop().replace(/\.[^.]+$/, '')).replace(/[_-]+/g, ' ').trim();

  const load = (index, autoplay) => {
    current = (index + AUDIO_FILES.length) % AUDIO_FILES.length;
    audio.src = AUDIO_FILES[current];
    title.textContent = nameOf(AUDIO_FILES[current]);
    sessionStorage.setItem('mp3Index', String(current));
    if (autoplay) audio.play().catch(() => {});
  };

  audio.addEventListener('loadedmetadata', () => {
    // Continua do mesmo ponto ao trocar de página
    if (Number.isFinite(resumeAt) && resumeAt > 0 && resumeAt < audio.duration) audio.currentTime = resumeAt;
    resumeAt = NaN;
  });
  audio.addEventListener('playing', () => {
    failures = 0;
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    playBtn.setAttribute('aria-label', 'Pausar');
  });
  audio.addEventListener('pause', () => {
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    playBtn.setAttribute('aria-label', 'Tocar');
  });
  // Quando a música termina, toca a próxima (e volta para a primeira no fim)
  audio.addEventListener('ended', () => { sessionStorage.removeItem('mp3Time'); load(current + 1, true); });
  audio.addEventListener('error', () => {
    // Arquivo não encontrado: tenta o próximo; se nenhum abrir, usa o YouTube
    failures += 1;
    sessionStorage.removeItem('mp3Time');
    if (failures >= AUDIO_FILES.length) { audio.removeAttribute('src'); startYouTube(); return; }
    load(current + 1, !audio.paused || wantPlay);
  });

  ctrl.play = () => { wantPlay = true; audio.play().catch(() => {}); };
  ctrl.pause = () => audio.pause();
  ctrl.save = () => {
    sessionStorage.setItem('mp3Index', String(current));
    if (Number.isFinite(audio.currentTime)) sessionStorage.setItem('mp3Time', String(audio.currentTime));
  };

  playBtn.addEventListener('click', () => (audio.paused ? ctrl.play() : ctrl.pause()));
  ui.querySelector('.mp3-prev').addEventListener('click', () => { sessionStorage.removeItem('mp3Time'); load(current - 1, true); });
  ui.querySelector('.mp3-next').addEventListener('click', () => { sessionStorage.removeItem('mp3Time'); load(current + 1, true); });

  load(current, false);
}

if (card && musicBtn && (AUDIO_FILES.length || YOUTUBE_IDS.length)) {
  const closedBefore = sessionStorage.getItem('ytClosed') === '1';
  // No computador o player já aparece aberto; no celular abre pelo botão
  if (!closedBefore && window.innerWidth > 700) setOpen(true);

  if (AUDIO_FILES.length) startMp3(); else startYouTube();

  // O navegador só libera som depois do primeiro clique, toque ou tecla
  const events = ['click', 'touchstart', 'keydown'];
  const unlock = (e) => {
    if (e.target.closest && e.target.closest('.music-btn, .yt-player')) return;
    events.forEach((ev) => document.removeEventListener(ev, unlock));
    if (isOpen()) ctrl.play();
  };
  events.forEach((ev) => document.addEventListener(ev, unlock));

  musicBtn.addEventListener('click', () => {
    if (isOpen()) {
      ctrl.pause();
      setOpen(false);
      sessionStorage.setItem('ytClosed', '1');
    } else {
      setOpen(true);
      sessionStorage.setItem('ytClosed', '0');
      ctrl.play();
    }
  });

  closeBtn.addEventListener('click', () => {
    ctrl.pause();
    setOpen(false);
    sessionStorage.setItem('ytClosed', '1');
  });

  window.addEventListener('pagehide', () => ctrl.save());
} else if (musicBtn) {
  musicBtn.hidden = true;
}

// Idiomas do site
const LANGS = ['pt', 'en', 'es', 'fr', 'ja', 'de', 'it', 'he', 'zh', 'sv', 'no', 'fi', 'da', 'el'];
// Código usado no atributo lang da página
const HTML_LANG = { pt: 'pt-BR', zh: 'zh-CN', no: 'nb' };
// Idiomas escritos da direita para a esquerda
const RTL = ['he'];
const norm = (html) => html.replace(/<br\s*\/?>/gi, '<br>').replace(/\s+/g, ' ').trim();
const i18nEls = [];

if (typeof I18N !== 'undefined') {
  // Marca os elementos que têm tradução e guarda o texto original
  document.querySelectorAll('title, h1, h2, h3, h4, p, a, li, figcaption, cite, span, button').forEach((el) => {
    if (el.closest('.lang')) return;
    const original = el.tagName === 'TITLE' ? el.textContent.trim() : norm(el.innerHTML);
    if (I18N[original]) {
      el.dataset.i18nKey = original;
      el.dataset.i18nPt = el.tagName === 'TITLE' ? el.textContent : el.innerHTML;
      i18nEls.push(el);
    }
  });
}

const langBtn = document.querySelector('.lang-btn');
const langMenu = document.querySelector('.lang-menu');
const langCurrent = document.querySelector('.lang-current');

function setLang(lang) {
  if (!LANGS.includes(lang)) lang = 'pt';
  i18nEls.forEach((el) => {
    const t = I18N[el.dataset.i18nKey];
    const value = lang === 'pt' ? el.dataset.i18nPt : (t && t[lang]) || el.dataset.i18nPt;
    if (el.tagName === 'TITLE') document.title = value;
    else el.innerHTML = value;
  });
  document.documentElement.lang = HTML_LANG[lang] || lang;
  document.documentElement.dir = RTL.includes(lang) ? 'rtl' : 'ltr';
  if (langCurrent) langCurrent.textContent = lang.toUpperCase();
  // Mostra a bandeira do idioma escolhido no botão
  const flagSlot = document.querySelector('.lang-flag');
  const flag = document.querySelector(`.lang-menu [data-lang="${lang}"] .flag`);
  if (flagSlot && flag) flagSlot.innerHTML = flag.outerHTML;
  document.querySelectorAll('.lang-menu [data-lang]').forEach((b) => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  try { localStorage.setItem('lang', lang); } catch (e) {}
}

if (langBtn && langMenu) {
  const closeMenu = () => {
    langMenu.hidden = true;
    langBtn.setAttribute('aria-expanded', 'false');
  };
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langMenu.hidden = !langMenu.hidden;
    langBtn.setAttribute('aria-expanded', String(!langMenu.hidden));
  });
  langMenu.querySelectorAll('[data-lang]').forEach((b) => {
    b.addEventListener('click', () => { setLang(b.dataset.lang); closeMenu(); });
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.lang')) closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
}

// Aplica o idioma escolhido antes (vale para todas as páginas)
let savedLang = 'pt';
try { savedLang = localStorage.getItem('lang') || 'pt'; } catch (e) {}
if (savedLang !== 'pt') setLang(savedLang);

// Formulário da página inicial: abre o e-mail já preenchido para a Rock Tour
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = form.elements.nome.value.trim();
    const email = form.elements.email.value.trim();
    const msg = form.elements.mensagem.value.trim();
    const subject = `Contato pelo site: ${nome}`;
    const body = `Nome: ${nome}\nE-mail: ${email}\n\n${msg}`;
    window.location.href = `mailto:agenciarocktour@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
