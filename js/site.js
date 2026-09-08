/* =========================================================
   Rock Tour — dados e comportamentos compartilhados
   Para trocar uma foto, altere o campo "img" do item.
   ========================================================= */

const WPP = "https://wa.me/5541998622142";

/* Fotos temporárias do Wikimedia Commons (uso livre, com crédito).
   Substituir pelas fotos próprias da Rock Tour quando disponíveis. */
const wiki = n => `https://commons.wikimedia.org/wiki/Special:FilePath/${n}?width=1600`;

/* Fotos que já estão no site atual da Rock Tour (Webnode) */
const CDN = "https://97afcb185d.cbaul-cdnwnd.com/6f993fae9f1f40d95bb15cda1f112e9f";
const FOTOS_SITE = {
  arch:          `${CDN}/200000016-383e9393c0/arch.jpeg?ph=97afcb185d`,
  grupo:         `${CDN}/200000020-6f543704d8/20161029_153117.jpg?ph=97afcb185d`,
  internacional: `${CDN}/200000034-e510de60a2/image-crop-200000033.jpeg?ph=97afcb185d`,
  nacional:      `${CDN}/200000045-7d64b7efac/tumblr_mdrjs3m8M11ql734to1_1280.jpg?ph=97afcb185d`,
  yellowstone:   `${CDN}/200000032-320b83305a/yellowstone-header.jpg?ph=97afcb185d`,
  topo:          "https://duyn491kcolsw.cloudfront.net/files/14/143/143j8m.jpg?ph=97afcb185d",
  juba:          "https://duyn491kcolsw.cloudfront.net/files/26/26j/26jabi.jpg?ph=97afcb185d"
};

const ROTEIROS = [
  {slug:"tour-curitiba", nome:"Tour em Curitiba", local:"Curitiba, PR", regiao:"parana", nota:"5,0",
   img: wiki("Estufa_principal_do_Jardim_Bot%C3%A2nico_de_Curitiba_02.jpg"),
   texto:"Descubra uma das cidades mais organizadas e encantadoras do Brasil. Curitiba combina natureza, cultura, arquitetura e gastronomia em um roteiro inesquecível. Conheça o Jardim Botânico, Museu Oscar Niemeyer, Ópera de Arame, Parque Tanguá, Bosque Alemão, Centro Histórico e muito mais. Uma experiência completa para quem deseja conhecer o melhor da capital paranaense."},

  {slug:"curitiba-by-night", nome:"Curitiba By Night", local:"Curitiba, PR", regiao:"parana", nota:"5,0",
   img: wiki("%C3%93pera_de_Arame_-_Curitiba.JPG"),
   texto:"Quando o sol se põe, Curitiba revela um charme ainda mais especial. Viva uma noite inesquecível conhecendo os melhores restaurantes, bares, pontos iluminados e atrações culturais da cidade. Um passeio perfeito para apreciar a gastronomia local, ouvir boa música e descobrir uma Curitiba elegante, acolhedora e cheia de vida."},

  {slug:"trem-serra-do-mar", nome:"Trem da Serra do Mar", local:"Paraná", regiao:"parana", nota:"5,0",
   img: wiki("Serra_do_Mar_-_Serra_Verde_Express.JPG"),
   texto:"Considerado um dos passeios ferroviários mais bonitos do mundo, o Trem da Serra do Mar proporciona uma viagem emocionante através da maior área preservada de Mata Atlântica do Brasil. Durante o percurso, admire pontes centenárias, túneis, cachoeiras, montanhas e paisagens simplesmente deslumbrantes. Uma experiência que encanta todas as idades."},

  {slug:"morretes", nome:"Morretes", local:"Paraná", regiao:"parana", nota:"5,0",
   img: wiki("Morretes,_Brazil.JPG"),
   texto:"Uma charmosa cidade histórica cercada pela exuberante Serra do Mar. Caminhe por suas ruas de pedra, admire a arquitetura colonial, conheça o artesanato local e experimente o famoso Barreado, prato típico do Paraná. Morretes é o destino ideal para quem busca tranquilidade, história, boa gastronomia e belas paisagens naturais."},

  {slug:"ilha-do-mel", nome:"Ilha do Mel", local:"Paraná", regiao:"parana", nota:"5,0",
   img: wiki("Farol_da_Ilha_do_Mel.jpg"),
   texto:"Um verdadeiro paraíso ecológico onde carros não circulam e a natureza é preservada. Praias de águas cristalinas, trilhas, grutas, o Farol das Conchas e a histórica Fortaleza de Nossa Senhora dos Prazeres fazem deste destino um dos lugares mais encantadores do litoral brasileiro. Ideal para relaxar, renovar as energias e viver momentos inesquecíveis."},

  {slug:"ilha-do-superagui", nome:"Ilha do Superagui", local:"Paraná", regiao:"parana", nota:"5,0",
   img: wiki("Ilha_de_Superagui_A%C3%A9rea.jpg"),
   texto:"Patrimônio Natural da Humanidade pela UNESCO, a Ilha do Superagui é um destino perfeito para quem ama ecoturismo e aventura. Com praias praticamente intocadas, rica biodiversidade, observação de aves, golfinhos e o famoso mico-leão-da-cara-preta, oferece uma experiência única de contato com a natureza em sua forma mais pura."},

  {slug:"foz-do-iguacu", nome:"Foz do Iguaçu", local:"Paraná", regiao:"parana", nota:"5,0",
   img: wiki("Cataratas_do_Igua%C3%A7u_-_Vista_de_cima_alt.jpg"),
   texto:"Prepare-se para conhecer uma das Sete Maravilhas Naturais do Mundo. As Cataratas do Iguaçu impressionam pela grandiosidade e beleza incomparável. Além delas, visite o Parque das Aves, a Usina Hidrelétrica de Itaipu, o Marco das Três Fronteiras e desfrute das oportunidades de compras no Paraguai e na Argentina. Um destino que surpreende em todos os sentidos."},

  {slug:"florianopolis", nome:"Florianópolis", local:"Santa Catarina", regiao:"nacional", nota:"5,0",
   img: wiki("Canto_da_Lagoa_(5414008355).jpg"),
   texto:"Conhecida como a Ilha da Magia, Florianópolis encanta por suas mais de 40 praias, natureza exuberante e excelente qualidade de vida. Além das belas paisagens, oferece rica cultura açoriana, ótima gastronomia baseada em frutos do mar, trilhas, dunas, lagoas e uma vida noturna vibrante. Um destino perfeito para descanso e diversão."},

  {slug:"bonito", nome:"Bonito", local:"Mato Grosso do Sul", regiao:"nacional", nota:"5,0",
   img: wiki("Pequenos_peixes_em_remanso_de_rio.jpg"),
   texto:"Um dos principais destinos de ecoturismo do mundo. Bonito impressiona pelas águas incrivelmente cristalinas, ideais para flutuação, mergulho e contemplação da vida aquática. Explore cavernas, grutas, cachoeiras, rios de águas transparentes e uma natureza preservada que proporciona experiências inesquecíveis para toda a família."},

  {slug:"rio-de-janeiro", nome:"Rio de Janeiro", local:"Rio de Janeiro", regiao:"nacional", nota:"5,0",
   img: wiki("P%C3%A3o_de_A%C3%A7ucar_-_Sugarloaf_Mountain_-_Zuckerhut.jpg"),
   texto:"Conhecida como a Cidade Maravilhosa, o Rio de Janeiro reúne algumas das paisagens mais famosas do planeta. Encante-se com o Cristo Redentor, Pão de Açúcar, praias de Copacabana e Ipanema, Escadaria Selarón, Jardim Botânico e a energia contagiante do povo carioca. Um destino que combina natureza, cultura, história e muita alegria em um único lugar."}
];

/* --- Pacotes internacionais (conteúdo de exemplo, aguardando o texto oficial) --- */
const INTERNACIONAIS = [
  {slug:"paris", nome:"Paris", local:"França", regiao:"internacional", nota:"5,0",
   img: wiki("Eiffel_Tour_Paris.jpg"),
   texto:"A cidade luz reúne arte, moda, história e romance em cada esquina. Suba na Torre Eiffel, percorra o Louvre, caminhe pelos Champs-Élysées, conheça a Catedral de Notre-Dame e faça um passeio de barco pelo Sena. Um roteiro que combina os grandes cartões-postais com bistrôs, cafés e bairros charmosos como Montmartre e Le Marais."},

  {slug:"roma", nome:"Roma", local:"Itália", regiao:"internacional", nota:"5,0",
   img: wiki("Colosseum_in_rome.jpg"),
   texto:"Uma cidade onde cada rua conta um capítulo da história ocidental. Visite o Coliseu, o Fórum Romano, a Fontana di Trevi, o Panteão e o Vaticano com a Basílica de São Pedro e a Capela Sistina. Entre uma visita e outra, aproveite a melhor comida italiana em trattorias tradicionais. Ideal para quem quer história, arte e gastronomia no mesmo roteiro."},

  {slug:"buenos-aires", nome:"Buenos Aires", local:"Argentina", regiao:"internacional", nota:"5,0",
   img: wiki("Obelisco_de_Buenos_Aires.jpg"),
   texto:"O destino internacional mais próximo e um dos que mais encantam brasileiros. Conheça o Obelisco, o Caminito em La Boca, o Cemitério da Recoleta, o Teatro Colón e o Puerto Madero. Aproveite as parrillas, o tango, as livrarias e as compras. Um roteiro curto, acessível e cheio de personalidade, perfeito para o primeiro voo internacional."},

  {slug:"parques-eua", nome:"Parques dos Estados Unidos", local:"Estados Unidos", regiao:"internacional", nota:"5,0",
   img: FOTOS_SITE.yellowstone,
   texto:"Um roteiro para quem ama natureza em escala grandiosa. Percorra Yellowstone com seus gêiseres e fontes termais, o Grand Canyon, Yosemite e as paisagens de rocha vermelha do Arizona e de Utah. Um programa de estradas, mirantes e trilhas, com hospedagem planejada e apoio da Rock Tour em cada etapa."}
];

/* --- Mundo Mórmon (conteúdo de exemplo, aguardando o texto oficial) --- */
const MORMON = [
  {slug:"salt-lake-city", nome:"Salt Lake City", local:"Utah, Estados Unidos", regiao:"mormon", nota:"5,0",
   img: wiki("Salt_Lake_Temple,_Utah_-_Sept_2004-2.jpg"),
   texto:"O coração do roteiro. Conheça a Praça do Templo, o Tabernáculo, o Centro de Conferências e os centros de visitantes, com tempo para os jardins e para a história dos pioneiros que chegaram ao Vale do Lago Salgado em 1847. O roteiro inclui ainda passeios pelas montanhas Wasatch e pelo próprio Grande Lago Salgado."},

  {slug:"nauvoo", nome:"Nauvoo", local:"Illinois, Estados Unidos", regiao:"mormon", nota:"5,0",
   img: wiki("New_Nauvoo_Temple.JPG"),
   texto:"A cidade histórica às margens do rio Mississippi, reconstruída e preservada como era no século XIX. Caminhe pela vila antiga, conheça as casas e oficinas restauradas, o templo reconstruído e os locais ligados à história do lugar. Um roteiro tranquilo, com muita caminhada, história e paisagem de rio."},

  {slug:"utah-oeste", nome:"Utah e o Oeste Americano", local:"Estados Unidos", regiao:"mormon", nota:"5,0",
   img: FOTOS_SITE.arch,
   texto:"Extensão do roteiro para quem quer aproveitar a viagem e conhecer o cenário natural do oeste dos Estados Unidos. Arcos de rocha, desfiladeiros, estradas panorâmicas e parques nacionais como Arches, Bryce Canyon e Zion. Um complemento perfeito para os dias em Salt Lake City."}
];

const TODOS = ROTEIROS.concat(INTERNACIONAIS, MORMON);


const PAGINAS = [
  {rotulo:"Início",                arquivo:"index.html"},
  {rotulo:"Nossa história",        arquivo:"historia.html"},
  {rotulo:"Mundo Mórmon",          arquivo:"mundo-mormon.html"},
  {rotulo:"Pacotes Internacionais",arquivo:"internacionais.html"},
  {rotulo:"Pacotes Nacionais",     arquivo:"nacionais.html"},
  {rotulo:"Paraná",                arquivo:"parana.html"},
  {rotulo:"Contato",               arquivo:"contato.html"}
];

/* ---------- helpers ---------- */
const bg = url => ({backgroundImage:`url('${url}')`, backgroundSize:"cover", backgroundPosition:"center"});
const aplicar = (el,url) => Object.assign(el.style, bg(url));
const atual = () => (location.pathname.split("/").pop() || "index.html");

/* ---------- menu ---------- */
function montaMenu(){
  const menu = document.querySelector(".menu");
  const mob  = document.querySelector(".menu-mobile");
  if(!menu) return;
  const marcacao = PAGINAS.map(p =>
    `<a href="${p.arquivo}"${p.arquivo===atual()?' class="ativo"':''}>${p.rotulo}</a>`).join("");
  menu.innerHTML = marcacao;
  if(mob) mob.innerHTML = marcacao;
  const btn = document.querySelector(".hamburguer");
  if(btn && mob) btn.onclick = () => mob.classList.toggle("aberto");
}

/* ---------- busca ---------- */
function montaBusca(){
  const campo = document.getElementById("busca");
  if(!campo) return;
  campo.addEventListener("keydown", e=>{
    if(e.key!=="Enter") return;
    const t = e.target.value.trim().toLowerCase();
    if(!t) return;
    const achou = TODOS.find(r =>
      r.nome.toLowerCase().includes(t) || r.local.toLowerCase().includes(t));
    if(achou) abreModal(achou);
    else alert("Nenhum roteiro encontrado para: " + e.target.value);
  });
}

/* ---------- cards ---------- */
function criaCard(r){
  const el = document.createElement("article");
  el.className = "card";
  aplicar(el, r.img);
  el.innerHTML = `
    <button class="seta-card" aria-label="Ver detalhes">
      <svg viewBox="0 0 24 24"><path d="M7 17L17 7M9 7h8v8"/></svg>
    </button>
    <div class="card-info">
      <div class="tags"><span class="tag">${r.local}</span><span class="tag nota">&#9733; ${r.nota}</span></div>
      <h3>${r.nome}</h3>
      <p>${r.texto}</p>
    </div>`;
  el.onclick = ()=>abreModal(r);
  return el;
}

/* grade completa, sem carrossel (páginas internas) */
function montaGrade(idAlvo, lista){
  const alvo = document.getElementById(idAlvo);
  if(!alvo) return;
  lista.forEach(r => alvo.appendChild(criaCard(r)));
}

/* ---------- carrossel da hero ---------- */
const HERO_SLIDES = [
  "foz-do-iguacu",
  "tour-curitiba",
  "ilha-do-mel",
  "trem-serra-do-mar",
  "rio-de-janeiro",
  "morretes"
];

function montaHero(){
  const hero = document.getElementById("hero");
  if(!hero || !hero.classList.contains("hero-cheia")) return;

  const dots  = document.getElementById("hero-dots");
  const local = document.getElementById("hero-local");
  const palco = document.createElement("div");
  palco.className = "hero-slides";
  hero.prepend(palco);

  const lista = HERO_SLIDES.map(sl => TODOS.find(r => r.slug === sl)).filter(Boolean);
  let i = 0;

  lista.forEach((r,k)=>{
    const slide = document.createElement("div");
    slide.className = "hero-slide" + (k===0 ? " on" : "");
    aplicar(slide, r.img);
    palco.appendChild(slide);

    if(dots){
      const d = document.createElement("button");
      d.className = k===0 ? "on" : "";
      d.setAttribute("aria-label", r.nome);
      d.onclick = ()=>{ mostra(k); reinicia(); };
      dots.appendChild(d);
    }
  });

  function mostra(k){
    i = k;
    palco.querySelectorAll(".hero-slide").forEach((s,n)=>s.classList.toggle("on", n===k));
    if(dots) dots.querySelectorAll("button").forEach((b,n)=>b.classList.toggle("on", n===k));
    if(local) local.textContent = lista[k].nome + ", " + lista[k].local;
  }

  let timer;
  function reinicia(){
    clearInterval(timer);
    timer = setInterval(()=>mostra((i+1)%lista.length), 6000);
  }

  const prev = document.getElementById("hero-prev");
  const next = document.getElementById("hero-next");
  if(prev) prev.onclick = ()=>{ mostra((i-1+lista.length)%lista.length); reinicia(); };
  if(next) next.onclick = ()=>{ mostra((i+1)%lista.length); reinicia(); };

  document.addEventListener("keydown", e=>{
    if(e.key === "ArrowLeft")  { mostra((i-1+lista.length)%lista.length); reinicia(); }
    if(e.key === "ArrowRight") { mostra((i+1)%lista.length); reinicia(); }
  });

  mostra(0);
  reinicia();
}

/* ---------- mosaico da home ---------- */
const MOSAICO = [
  {tipo:"cartao", classe:"m3",
   titulo:"Quem somos", texto:"Agência de turismo de Curitiba, no ar desde 2014. Roteiros no Paraná, no Brasil e fora dele.",
   link:"Nossa história", href:"historia.html"},

  {tipo:"numero", classe:"m3"},

  {tipo:"foto", slug:"foz-do-iguacu", classe:"m6"},

  {tipo:"cartao", classe:"m3 alto", cor:"verde",
   titulo:"O que fazemos", texto:"Transporte, hospedagem, guia acompanhante, ingressos, seguro viagem, passagens aéreas e roteiros fechados para grupos.",
   link:"Pedir uma cotação", href:"contato.html", marca:true},

  {tipo:"foto", slug:"tour-curitiba",     classe:"m3"},
  {tipo:"foto", slug:"ilha-do-mel",       classe:"m3"},
  {tipo:"foto", slug:"trem-serra-do-mar", classe:"m3"},

  {tipo:"frase", classe:"m3", texto:"Viagens que ficam na memória"},

  {tipo:"foto", slug:"morretes",          classe:"m3"},
  {tipo:"foto", slug:"rio-de-janeiro",    classe:"m3"},

  {tipo:"foto", slug:"ilha-do-superagui", classe:"m3"},
  {tipo:"foto", slug:"florianopolis",     classe:"m3"},
  {tipo:"foto", slug:"bonito",            classe:"m3"},
  {tipo:"foto", slug:"curitiba-by-night", classe:"m3"},

  {tipo:"foto", slug:"paris",             classe:"m4"},
  {tipo:"foto", slug:"roma",              classe:"m4"},
  {tipo:"foto", slug:"salt-lake-city",    classe:"m4"},

  {tipo:"foto", slug:"buenos-aires",      classe:"m3"},
  {tipo:"foto", slug:"parques-eua",       classe:"m3"},
  {tipo:"foto", slug:"nauvoo",            classe:"m3"},

  {tipo:"cartao", classe:"m3",
   titulo:"Não achou seu destino?", texto:"Monta a viagem com a gente. Manda uma mensagem contando o que você tem em mente.",
   link:"Falar com a Rock Tour", href:"contato.html", marca:true}
];

const SETA = '<svg viewBox="0 0 24 24"><path d="M7 17L17 7M9 7h8v8"/></svg>';

function montaMosaico(){
  const alvo = document.getElementById("mosaico");
  if(!alvo) return;

  MOSAICO.forEach(item=>{
    let el;

    if(item.tipo === "foto"){
      const r = TODOS.find(x => x.slug === item.slug);
      if(!r) return;
      el = document.createElement("figure");
      el.className = "m-foto " + item.classe;
      aplicar(el, r.img);
      el.innerHTML = `<figcaption><strong>${r.nome}</strong><span>${r.local}</span></figcaption>`;
      el.onclick = ()=>abreModal(r);

    } else if(item.tipo === "numero"){
      el = document.createElement("div");
      el.className = "m-cartao escuro " + item.classe;
      el.innerHTML = `<div class="numero">${TODOS.length}</div>
                      <div class="rotulo">destinos<br>no mapa</div>`;

    } else if(item.tipo === "frase"){
      el = document.createElement("div");
      el.className = "m-frase " + item.classe;
      el.innerHTML = `<h3>${item.texto}</h3>
        <svg viewBox="0 0 24 24"><path d="M12 20s-7-4.6-7-9.3A4 4 0 0 1 12 8a4 4 0 0 1 7 2.7C19 15.4 12 20 12 20z"/></svg>`;

    } else {
      el = document.createElement("div");
      el.className = "m-cartao " + (item.cor ? item.cor + " " : "") + item.classe;
      el.innerHTML = `${item.marca ? `<span class="marca">${SETA}</span>` : ""}
        <h3>${item.titulo}</h3>
        <p>${item.texto}</p>
        <a class="link" href="${item.href}">${item.link}</a>`;
    }

    alvo.appendChild(el);
  });
}


/* ---------- destaques da home ---------- */
/* frequência e duração inventadas, ajustar com os dados reais da Rock Tour */
const DETALHES = {
  "tour-curitiba":     {freq:"Todos os dias",       dur:"Um dia, 9h às 18h"},
  "trem-serra-do-mar": {freq:"Quinta a domingo",    dur:"Um dia, 7h às 19h"},
  "ilha-do-mel":       {freq:"Saídas semanais",     dur:"Um dia ou fim de semana"},
  "morretes":          {freq:"Todos os dias",       dur:"Um dia, 8h às 18h"},
  "foz-do-iguacu":     {freq:"Saídas quinzenais",   dur:"Quatro dias"},
  "curitiba-by-night": {freq:"Sexta e sábado",      dur:"Uma noite, 19h às 23h"},
  "ilha-do-superagui": {freq:"Sob consulta",        dur:"Dois dias"},
  "florianopolis":     {freq:"Saídas mensais",      dur:"Quatro dias"},
  "bonito":            {freq:"Sob consulta",        dur:"Cinco dias"},
  "rio-de-janeiro":    {freq:"Saídas mensais",      dur:"Cinco dias"}
};

const DESTAQUES = ["tour-curitiba","trem-serra-do-mar","morretes","ilha-do-mel","foz-do-iguacu"];

const ICO_CAL = '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>';
const ICO_REL = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const ICO_EST = '<svg viewBox="0 0 24 24"><path d="M12 3l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.4l6.1-.8z"/></svg>';

function montaDestaques(){
  const alvo = document.getElementById("destaques");
  if(!alvo) return;

  DESTAQUES.forEach(slug=>{
    const r = TODOS.find(x=>x.slug===slug);
    if(!r) return;
    const d = DETALHES[slug] || {freq:"Sob consulta", dur:"Consultar"};

    const el = document.createElement("article");
    el.className = "destaque";
    aplicar(el, r.img);
    el.innerHTML = `
      <div class="foto-linha" style="background-image:url('${r.img}')"></div>
      <span class="estrela">${ICO_EST}<b>Destino procurado</b></span>
      <div class="cartao">
        <div class="chips">
          <span>${ICO_CAL} ${d.freq}</span>
          <span>${ICO_REL} ${d.dur}</span>
        </div>
        <h3>${r.nome}</h3>
        <p>${r.texto}</p>
        <a class="mais" href="#">Ver o roteiro completo</a>
      </div>`;
    el.querySelector(".cartao").onclick = e=>{ e.preventDefault(); abreModal(r); };
    alvo.appendChild(el);
  });
}

/* ---------- rodapé ---------- */
function montaRodape(){
  const rodape = document.getElementById("rodape");
  if(!rodape) return;
  const galeria = ROTEIROS.map(r=>r.img);
  let n = 0;
  const pinta = ()=>aplicar(rodape, galeria[n]);
  const prev = document.getElementById("rod-prev");
  const next = document.getElementById("rod-next");
  if(next) next.onclick = ()=>{n=(n+1)%galeria.length;pinta();};
  if(prev) prev.onclick = ()=>{n=(n-1+galeria.length)%galeria.length;pinta();};
  pinta();
}

/* ---------- modal ---------- */
function abreModal(r){
  const modal = document.getElementById("modal");
  if(!modal) return;
  aplicar(document.getElementById("modal-foto"), r.img);
  document.getElementById("modal-titulo").textContent = r.nome;
  document.getElementById("modal-local").textContent  = r.local;
  document.getElementById("modal-texto").textContent  = r.texto;
  modal.classList.add("on");
}
function montaModal(){
  const modal = document.getElementById("modal");
  if(!modal) return;
  document.getElementById("modal-fechar").onclick = ()=>modal.classList.remove("on");
  modal.onclick = e=>{ if(e.target===modal) modal.classList.remove("on"); };
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", ()=>{
  montaMenu();
  montaBusca();
  montaHero();
  montaMosaico();
  montaDestaques();
  montaModal();
  montaRodape();

  document.querySelectorAll("[data-foto]").forEach(el=>{
    const chave = el.dataset.foto;
    aplicar(el, FOTOS_SITE[chave] || chave);
  });

  const form = document.getElementById("form-contato");
  if(form){
    document.getElementById("enviar").onclick = ()=>{
      const nome = document.getElementById("f-nome").value.trim();
      const msg  = document.getElementById("f-msg").value.trim();
      const texto = `Olá, Rock Tour! Meu nome é ${nome || "(sem nome)"}. ${msg}`;
      window.open(`${WPP}?text=${encodeURIComponent(texto)}`, "_blank");
    };
  }
});