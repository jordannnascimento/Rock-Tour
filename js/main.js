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
// 1) Músicas em mp3 na pasta audio/ chamadas musica-1.mp3, musica-2.mp3, musica-3.mp3...
//    O site encontra esses arquivos sozinho (até 20) e toca todos em sequência, em loop.
// 2) Outros arquivos podem ser listados aqui, com qualquer nome. Eles tocam depois dos musica-N.
// 3) Se não houver nenhum mp3, o site usa os vídeos do YouTube.
const AUDIO_FILES = [];
const YOUTUBE_IDS = ['nSQzXOgIQjM', 'CD-E-LDc384'];

const card = document.getElementById('ytPlayer');
const musicBtn = document.querySelector('.music-btn');
let wantPlay = false;
const RESUME = (() => {
  try {
    const nav = performance.getEntriesByType('navigation')[0];
    if (nav && nav.type === 'reload') return false;
    return !!document.referrer && new URL(document.referrer).origin === location.origin;
  } catch (e) { return false; }
})();
const wasClosed = () => RESUME && sessionStorage.getItem('ytClosed') === '1';
// Comandos do player que estiver ativo (mp3 ou YouTube)
const ctrl = { play() { wantPlay = true; }, pause() {}, save() {} };

const isOpen = () => !card.hidden;
function welcomeOpen() {
  const w = document.getElementById('welcome');
  return !!w && !w.hidden;
}
const setOpen = (open) => {
  card.hidden = !open;
  musicBtn.setAttribute('aria-expanded', open);
  musicBtn.setAttribute('aria-label', open ? 'Fechar player de música' : 'Abrir player de música');
};

function startYouTube() {
  if (!YOUTUBE_IDS.length) { setOpen(false); musicBtn.hidden = true; return; }
  if (!wasClosed() && window.innerWidth > 700) setOpen(true);
  card.classList.remove('mini');
  card.querySelector('.yt-frame').hidden = false;
  card.querySelector('.mp3-ui').hidden = true;
  let player = null;
  let ready = false;
  let current = 0;
  let failures = 0;
  const savedIndex = RESUME ? parseInt(sessionStorage.getItem('ytIndex'), 10) : NaN;
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
    const saved = RESUME ? parseFloat(sessionStorage.getItem('ytTime')) : NaN;
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

// Procura audio/musica-1.mp3, musica-2.mp3... até não achar o próximo
async function findAudioFiles() {
  const found = [];
  for (let n = 1; n <= 20; n++) {
    const src = `audio/musica-${n}.mp3`;
    try {
      const r = await fetch(src, { method: 'HEAD', cache: 'no-store' });
      if (!r.ok) break;
      found.push(src);
    } catch (e) { break; }
  }
  return found;
}

function startMp3(PLAYLIST) {
  const ui = card.querySelector('.mp3-ui');
  const title = ui.querySelector('.mp3-title');
  const playBtn = ui.querySelector('.mp3-play');
  card.querySelector('.yt-frame').hidden = true;
  card.classList.add('mini');
  ui.hidden = false;

  const audio = new Audio();
  audio.preload = 'auto';

  // Volume: botão de silenciar e barra deslizante (a escolha fica salva entre as páginas)
  const volBtn = ui.querySelector('.mp3-mute');
  const volRange = ui.querySelector('.mp3-vol');
  const store = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const read = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const savedVol = parseFloat(read('volume'));
  audio.volume = Number.isFinite(savedVol) ? Math.min(Math.max(savedVol, 0), 1) : 0.5;
  audio.muted = read('muted') === '1';
  volRange.value = Math.round(audio.volume * 100);
  const updateVolume = () => {
    const v = audio.muted ? 0 : audio.volume;
    const icon = v === 0 ? 'fa-volume-xmark' : v < 0.5 ? 'fa-volume-low' : 'fa-volume-high';
    volBtn.innerHTML = `<i class="fa-solid ${icon}"></i>`;
    volBtn.setAttribute('aria-label', audio.muted ? 'Ativar som' : 'Silenciar');
    volRange.style.setProperty('--fill', `${Math.round(v * 100)}%`);
    store('volume', String(audio.volume));
    store('muted', audio.muted ? '1' : '0');
  };
  volRange.addEventListener('input', () => {
    audio.volume = volRange.value / 100;
    audio.muted = audio.volume === 0;
    updateVolume();
  });
  volBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    if (!audio.muted && audio.volume === 0) { audio.volume = 0.5; volRange.value = 50; }
    updateVolume();
  });
  updateVolume();
  let current = 0;
  let failures = 0;
  let resumeAt = NaN;
  if (RESUME) {
    const savedSrc = sessionStorage.getItem('mp3Src');
    const i = PLAYLIST.indexOf(savedSrc);
    if (i >= 0) { current = i; resumeAt = parseFloat(sessionStorage.getItem('mp3Time')); }
  }

  // Nome da música a partir do nome do arquivo
  const nameOf = (src) => {
    const base = decodeURIComponent(src.split('/').pop().replace(/\.[^.]+$/, ''));
    const n = base.match(/^musica[-_ ]?(\d+)$/i);
    return n ? `RockTour Rádio · ${n[1]}` : base.replace(/[_-]+/g, ' ').trim();
  };

  const load = (index, autoplay) => {
    current = (index + PLAYLIST.length) % PLAYLIST.length;
    audio.src = PLAYLIST[current];
    title.textContent = nameOf(PLAYLIST[current]);
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
    if (failures >= PLAYLIST.length) { audio.removeAttribute('src'); startYouTube(); return; }
    load(current + 1, !audio.paused || wantPlay);
  });

  ctrl.play = () => { wantPlay = true; audio.play().catch(() => {}); };
  ctrl.pause = () => audio.pause();
  ctrl.save = () => {
    sessionStorage.setItem('mp3Src', PLAYLIST[current]);
    if (Number.isFinite(audio.currentTime)) sessionStorage.setItem('mp3Time', String(audio.currentTime));
  };

  playBtn.addEventListener('click', () => (audio.paused ? ctrl.play() : ctrl.pause()));
  ui.querySelector('.mp3-prev').addEventListener('click', () => { sessionStorage.removeItem('mp3Time'); load(current - 1, true); });
  ui.querySelector('.mp3-next').addEventListener('click', () => { sessionStorage.removeItem('mp3Time'); load(current + 1, true); });

  load(current, false);
  // Abre o player e tenta tocar assim que a página abre
  if (!wasClosed()) setOpen(true);
  audio.addEventListener('playing', () => playBtn.classList.remove('waiting'));
  if ((isOpen() || wantPlay) && !welcomeOpen()) {
    audio.play().then(() => { wantPlay = true; }).catch(() => playBtn.classList.add('waiting'));
  } else if (wantPlay) {
    audio.play().catch(() => playBtn.classList.add('waiting'));
  }
}

if (card && musicBtn) {
  findAudioFiles().then((detected) => {
    const playlist = [...detected, ...AUDIO_FILES.filter((f) => !detected.includes(f))];
    if (playlist.length) startMp3(playlist); else startYouTube();
  });

  // Se o navegador bloquear o som ao abrir, a música começa no primeiro clique, toque ou tecla
  const events = ['pointerdown', 'touchstart', 'keydown'];
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

  card.querySelectorAll('.yt-close, .mp3-close').forEach((b) => b.addEventListener('click', () => {
    ctrl.pause();
    setOpen(false);
    sessionStorage.setItem('ytClosed', '1');
  }));

  window.addEventListener('pagehide', () => ctrl.save());
} else if (musicBtn) {
  musicBtn.hidden = true;
}

// Tela de boas-vindas: o clique em "Ver site" fecha a tela e começa a música.
// A música só para se a pessoa pausar; trocar de página não interrompe.
const welcome = document.getElementById('welcome');
function enterSite() {
  if (!welcome || welcome.hidden) return;
  document.documentElement.classList.remove('welcome-open');
  welcome.classList.add('closing');
  setTimeout(() => { welcome.hidden = true; welcome.classList.remove('closing'); }, 300);
  if (card && musicBtn && !musicBtn.hidden) {
    setOpen(true);
    sessionStorage.setItem('ytClosed', '0');
    ctrl.play();
  }
}
if (welcome) {
  document.documentElement.classList.add('welcome-open');
  const enterBtn = welcome.querySelector('.btn-welcome');
  enterBtn.addEventListener('click', enterSite);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') enterSite(); });
  enterBtn.focus();
}

// WhatsApp: abre a conversa já com uma mensagem pronta no idioma do site
const WHATS_NUMBER = '13853437555';
const WHATS_MSG = {
  pt: 'Olá! Vim pelo site da Rock Tour e gostaria de mais informações.',
  en: "Hi! I found Rock Tour's website and would like more information.",
  es: '¡Hola! Vengo del sitio web de Rock Tour y me gustaría recibir más información.',
  fr: "Bonjour ! Je viens du site de Rock Tour et j'aimerais plus d'informations.",
  ja: 'こんにちは！Rock Tourのウェブサイトを見て、詳しい情報を知りたいです。',
  de: 'Hallo! Ich komme von der Rock-Tour-Website und hätte gern mehr Informationen.',
  it: 'Ciao! Vengo dal sito di Rock Tour e vorrei maggiori informazioni.',
  he: 'שלום! הגעתי מהאתר של Rock Tour ואשמח לקבל מידע נוסף.',
  zh: '您好！我是从Rock Tour网站过来的，想了解更多信息。',
  sv: 'Hej! Jag kommer från Rock Tours webbplats och vill gärna ha mer information.',
  no: 'Hei! Jeg kommer fra Rock Tours nettside og vil gjerne ha mer informasjon.',
  fi: 'Hei! Tulin Rock Tourin verkkosivuilta ja haluaisin lisätietoja.',
  da: 'Hej! Jeg kommer fra Rock Tours hjemmeside og vil gerne have mere information.',
  el: 'Γεια σας! Ήρθα από την ιστοσελίδα της Rock Tour και θα ήθελα περισσότερες πληροφορίες.'
};
function updateWhatsLinks(lang) {
  const text = WHATS_MSG[lang] || WHATS_MSG.pt;
  document.querySelectorAll(`a[href^="https://wa.me/${WHATS_NUMBER}"]`).forEach((a) => {
    a.href = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(text)}`;
  });
}

// Idiomas do site
const LANGS = ['pt', 'en', 'es', 'fr', 'ja', 'de', 'it', 'he', 'zh', 'sv', 'no', 'fi', 'da', 'el'];
// Código usado no atributo lang da página
const HTML_LANG = { pt: 'pt-BR', zh: 'zh-CN', no: 'nb' };
// Idiomas escritos da direita para a esquerda
const RTL = ['he'];
const norm = (html) => html.replace(/<br\s*\/?>/gi, '<br>').replace(/\s+/g, ' ').trim();
let i18nEls = [];

// Marca os elementos que têm tradução e guarda o texto original
function tagI18n(root) {
  if (typeof I18N === 'undefined') return;
  const list = root.querySelectorAll('h1, h2, h3, h4, p, a, li, figcaption, cite, span, button');
  [...(root === document ? [document.querySelector('title')] : []), ...list].forEach((el) => {
    if (!el || el.closest('.lang') || el.dataset.i18nKey) return;
    const original = el.tagName === 'TITLE' ? el.textContent.trim() : norm(el.innerHTML);
    if (I18N[original]) {
      el.dataset.i18nKey = original;
      el.dataset.i18nPt = el.tagName === 'TITLE' ? el.textContent : el.innerHTML;
      i18nEls.push(el);
    }
  });
}
tagI18n(document);

const langBtn = document.querySelector('.lang-btn');
const langMenu = document.querySelector('.lang-menu');
const langCurrent = document.querySelector('.lang-current');

function setLang(lang) {
  if (!LANGS.includes(lang)) lang = 'pt';
  i18nEls = i18nEls.filter((el) => el.isConnected);
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
  if (typeof updateWhatsLinks === 'function') updateWhatsLinks(lang);
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

// Formulário da página inicial: envia direto para o e-mail da Rock Tour pelo serviço FormSubmit
// Na primeira vez, o FormSubmit manda um e-mail de ativação para este endereço. É só clicar em "Activate Form".
const FORM_EMAIL = 'agenciarocktour@hotmail.com';
const FORM_MSG = {
  pt: ['Enviando...', 'Mensagem enviada! Responderemos em breve.', 'Não foi possível enviar agora. Escreva para'],
  en: ['Sending...', 'Message sent! We will reply soon.', 'Could not send right now. Please write to'],
  es: ['Enviando...', '¡Mensaje enviado! Responderemos pronto.', 'No fue posible enviar ahora. Escribe a'],
  fr: ['Envoi en cours...', 'Message envoyé ! Nous vous répondrons bientôt.', "Impossible d'envoyer pour le moment. Écrivez à"],
  ja: ['送信中...', 'メッセージを送信しました。折り返しご連絡いたします。', '送信できませんでした。こちらまでご連絡ください：'],
  de: ['Wird gesendet...', 'Nachricht gesendet! Wir antworten bald.', 'Senden derzeit nicht möglich. Schreiben Sie an'],
  it: ['Invio in corso...', 'Messaggio inviato! Ti risponderemo presto.', 'Non è stato possibile inviare. Scrivi a'],
  he: ['שולח...', 'ההודעה נשלחה! נחזור אליכם בקרוב.', 'לא ניתן לשלוח כרגע. כתבו אל'],
  zh: ['发送中...', '消息已发送！我们会尽快回复。', '暂时无法发送，请发邮件至'],
  sv: ['Skickar...', 'Meddelandet har skickats! Vi svarar snart.', 'Det gick inte att skicka just nu. Skriv till'],
  no: ['Sender...', 'Meldingen er sendt! Vi svarer snart.', 'Kunne ikke sende nå. Skriv til'],
  fi: ['Lähetetään...', 'Viesti lähetetty! Vastaamme pian.', 'Lähettäminen ei onnistunut. Kirjoita osoitteeseen'],
  da: ['Sender...', 'Beskeden er sendt! Vi svarer snart.', 'Kunne ikke sende lige nu. Skriv til'],
  el: ['Αποστολή...', 'Το μήνυμα στάλθηκε! Θα απαντήσουμε σύντομα.', 'Δεν ήταν δυνατή η αποστολή. Γράψτε στο']
};

function bindForms(root) {
root.querySelectorAll('.contact-form').forEach((form) => {
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  const msg = () => {
    let lang = 'pt';
    try { lang = localStorage.getItem('lang') || 'pt'; } catch (e) {}
    return FORM_MSG[lang] || FORM_MSG.pt;
  };
  const showError = () => {
    status.className = 'form-status err';
    status.innerHTML = `${msg()[2]} <a href="mailto:${FORM_EMAIL}">${FORM_EMAIL}</a>`;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const nome = form.elements.nome.value.trim();
    const email = form.elements.email.value.trim();
    const mensagem = form.elements.mensagem.value.trim();

    button.disabled = true;
    status.className = 'form-status';
    status.textContent = msg()[0];

    fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        Nome: nome,
        email: email,
        Mensagem: mensagem,
        _subject: `Contato pelo site: ${nome}`,
        _template: 'table',
        _honey: form.elements._honey.value
      })
    })
      .then((r) => r.json())
      .then((data) => {
        if (String(data.success) === 'true') {
          status.className = 'form-status ok';
          status.textContent = msg()[1];
          form.reset();
        } else if (/activat/i.test(data.message || '')) {
          // Só acontece antes de ativar o formulário pela primeira vez
          status.className = 'form-status err';
          status.textContent = `Formulário aguardando ativação: abra o e-mail do FormSubmit enviado para ${FORM_EMAIL} e clique em "Activate Form".`;
        } else {
          showError();
        }
      })
      .catch(showError)
      .finally(() => { button.disabled = false; });
  });
});
}
bindForms(document);
updateWhatsLinks(savedLang);

// Troca de página sem recarregar o site inteiro, para a música não parar.
// Só o conteúdo do meio (<main id="conteudo">) é trocado; menu, rodapé e player continuam.
const pageMain = document.getElementById('conteudo');

function markActive(url) {
  const file = new URL(url, location.href).pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('href') === file);
  });
}

async function goTo(url, push) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
    const next = doc.getElementById('conteudo');
    if (!next) throw new Error('sem conteúdo');

    pageMain.innerHTML = next.innerHTML;
    // título da aba (e tradução dele)
    const titleEl = document.querySelector('title');
    titleEl.textContent = doc.title;
    delete titleEl.dataset.i18nKey;
    delete titleEl.dataset.i18nPt;
    i18nEls = i18nEls.filter((el) => el.isConnected && el !== titleEl);
    tagI18n(document);

    if (push) history.pushState({}, '', url);
    markActive(url);
    if (nav) nav.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');

    // liga o que é da página nova: formulário, traduções e WhatsApp
    bindForms(pageMain);
    let lang = 'pt';
    try { lang = localStorage.getItem('lang') || 'pt'; } catch (e) {}
    setLang(lang);
    window.scrollTo(0, 0);
  } catch (e) {
    // Se algo der errado (ou o site for aberto direto do computador), abre a página do jeito normal
    location.href = url;
  }
}

if (pageMain && location.protocol !== 'file:') {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    const url = new URL(a.getAttribute('href'), location.href);
    if (url.origin !== location.origin || !/\.html$/.test(url.pathname) || /teste-musicas\.html$/.test(url.pathname)) return;
    e.preventDefault();
    if (url.href === location.href) { window.scrollTo(0, 0); return; }
    goTo(url.href, true);
  });
  window.addEventListener('popstate', () => goTo(location.href, false));
}
