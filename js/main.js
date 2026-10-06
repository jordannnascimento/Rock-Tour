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

// Player do YouTube
// Coloque aqui um ou mais vídeos (o código que vem depois de "watch?v=" no link).
// Se um estiver bloqueado para tocar em sites, o player passa sozinho para o próximo.
const YOUTUBE_IDS = ['CD-E-LDc384'];

const card = document.getElementById('ytPlayer');
const musicBtn = document.querySelector('.music-btn');
const closeBtn = document.querySelector('.yt-close');
let player = null;
let ready = false;
let wantPlay = false;
let current = 0;

const isOpen = () => !card.hidden;
const setOpen = (open) => {
  card.hidden = !open;
  musicBtn.setAttribute('aria-expanded', open);
  musicBtn.setAttribute('aria-label', open ? 'Fechar player de música' : 'Abrir player de música');
};
const play = () => { if (ready && player) player.playVideo(); else wantPlay = true; };

if (card && musicBtn && YOUTUBE_IDS.length) {
  // Retoma o vídeo e o ponto em que a pessoa estava na página anterior
  const savedIndex = parseInt(sessionStorage.getItem('ytIndex'), 10);
  if (Number.isInteger(savedIndex) && savedIndex >= 0 && savedIndex < YOUTUBE_IDS.length) current = savedIndex;

  const closedBefore = sessionStorage.getItem('ytClosed') === '1';
  // No computador o player já aparece aberto; no celular abre pelo botão
  if (!closedBefore && window.innerWidth > 700) setOpen(true);

  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);

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
          // Repete a música quando termina
          if (e.data === YT.PlayerState.ENDED) { player.seekTo(0); player.playVideo(); }
        },
        onError: () => {
          // Vídeo bloqueado ou removido: tenta o próximo da lista
          sessionStorage.removeItem('ytTime');
          current += 1;
          if (current < YOUTUBE_IDS.length) {
            sessionStorage.setItem('ytIndex', String(current));
            if (isOpen()) player.loadVideoById(YOUTUBE_IDS[current]);
            else player.cueVideoById(YOUTUBE_IDS[current]);
          } else {
            // Nenhum vídeo da lista toca em sites: esconde o player
            sessionStorage.removeItem('ytIndex');
            setOpen(false);
            musicBtn.hidden = true;
          }
        }
      }
    });
  };

  // O navegador só libera som depois do primeiro clique, toque ou tecla
  const events = ['click', 'touchstart', 'keydown'];
  const unlock = (e) => {
    if (e.target.closest && e.target.closest('.music-btn, .yt-player')) return;
    events.forEach((ev) => document.removeEventListener(ev, unlock));
    if (isOpen()) play();
  };
  events.forEach((ev) => document.addEventListener(ev, unlock));

  musicBtn.addEventListener('click', () => {
    if (isOpen()) {
      if (player && ready) player.pauseVideo();
      setOpen(false);
      sessionStorage.setItem('ytClosed', '1');
    } else {
      setOpen(true);
      sessionStorage.setItem('ytClosed', '0');
      play();
    }
  });

  closeBtn.addEventListener('click', () => {
    if (player && ready) player.pauseVideo();
    setOpen(false);
    sessionStorage.setItem('ytClosed', '1');
  });

  // Continua do mesmo ponto ao trocar de página
  window.addEventListener('pagehide', () => {
    if (player && ready && player.getCurrentTime) {
      const t = player.getCurrentTime();
      if (Number.isFinite(t)) sessionStorage.setItem('ytTime', String(t));
      sessionStorage.setItem('ytIndex', String(current));
    }
  });
} else if (musicBtn) {
  musicBtn.hidden = true;
}

// Idiomas: português, inglês, espanhol, francês e japonês
const LANGS = ['pt', 'en', 'es', 'fr', 'ja'];
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
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
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
