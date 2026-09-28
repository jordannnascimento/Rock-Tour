/* =========================================================
   Rock Tour: tradução do site (site principal)
   ---------------------------------------------------------
   O site continua sendo escrito em português, direto no HTML
   e no js/site.js. Este arquivo só guarda a versão em inglês.

   Como atualizar:
   1. Mudou ou criou um texto em português no site?
      Adicione ou ajuste a linha dele aqui embaixo:
          "texto em português": "text in English",
   2. O texto em português precisa ser igual ao do site
      (letras, acentos e pontuação). Espaços e quebras de
      linha a mais não fazem diferença.
   3. Textos sem linha aqui continuam em português
      (nomes de lugares, por exemplo, não precisam de linha).
   4. Um trecho com <br>, <em>, <strong> ou <mark> no meio vira
      partes separadas: cada parte tem a sua linha.
   5. Para nunca traduzir um trecho, use translate="no" na tag.
   ========================================================= */

const TRADUCOES = {
  /* ---------- Comum a várias páginas (topo, rodapé, botões) ---------- */
  "Encontre seu destino": "Find your destination",
  "Início": "Home",
  "Nossa história": "Our story",
  "Mundo Mórmon": "Mormon World",
  "Pacotes Internacionais": "International Packages",
  "Pacotes Nacionais": "Brazil Packages",
  "Contato": "Contact",
  "Falar com a Rock Tour": "Talk to Rock Tour",
  "Viaje com quem conhece o caminho": "Travel with people who know the way",
  "Roteiros guiados por quem vive o turismo há mais de uma década. Você escolhe o destino e a Rock Tour cuida do resto.":
    "Tours led by people who have worked in tourism for over a decade. You choose the destination and Rock Tour takes care of the rest.",
  "Fale conosco": "Contact us",
  "Comece sua viagem": "Start your trip",
  "Anterior": "Previous",
  "Próximo": "Next",
  "Siga a Rock Tour": "Follow Rock Tour",
  "Reservar no WhatsApp": "Book on WhatsApp",
  "Fechar": "Close",
  "Falar com a Rock Tour no WhatsApp": "Chat with Rock Tour on WhatsApp",
  "Quero saber mais informações": "I would like more information",
  "Quero saber mais": "I want to know more",
  "Ver detalhes": "See details",
  "★ 5,0": "★ 5.0",
  "Nenhum roteiro encontrado para:": "No tour found for:",
  "Olá, Rock Tour! Meu nome é": "Hello, Rock Tour! My name is",
  "(sem nome)": "(no name)",

  /* ---------- Página inicial (index.html) ---------- */
  "Rock Tour | Agência de Turismo em Curitiba": "Rock Tour | Travel Agency in Curitiba, Brazil",
  "Roteiros pelo Paraná, pacotes nacionais e internacionais. Rock Tour, agência de turismo em Curitiba.":
    "Tours in Paraná, plus packages across Brazil and abroad. Rock Tour, a travel agency in Curitiba, Brazil.",
  "Do Paraná ao outro lado do mundo,": "From Paraná to the other side of the world,",
  "a viagem começa aqui": "your trip starts here",
  "Roteiros montados por quem já rodou esses caminhos. Você escolhe o destino, a Rock Tour cuida do transporte, da hospedagem e de todo o resto.":
    "Itineraries planned by people who have traveled these roads. You choose the destination, and Rock Tour handles transportation, lodging and everything else.",
  "Ver destinos": "See destinations",
  "Catálogo de roteiros": "Tour catalog",
  "Estamos nas redes": "Find us online",
  "Destino anterior": "Previous destination",
  "Próximo destino": "Next destination",
  "Roteiros no Paraná, pelo Brasil e em mais de 5 países.":
    "Tours in Paraná, across Brazil and in more than 5 countries.",
  "A gente conhece esses lugares de perto": "We know these places up close",
  "Já andamos por cada um deles antes de indicar para você.": "We have been to each one before recommending it to you.",
  "Quem somos": "Who we are",
  "Agência de turismo de Curitiba, no ar desde 2014. Roteiros no Paraná, no Brasil e fora dele.":
    "A travel agency from Curitiba, in business since 2014. Tours in Paraná, across Brazil and abroad.",
  "destinos": "destinations",
  "no mapa": "on the map",
  "O que fazemos": "What we do",
  "Transporte, hospedagem, guia acompanhante, ingressos, seguro viagem, passagens aéreas e roteiros fechados para grupos.":
    "Transportation, lodging, tour guides, tickets, travel insurance, airfare and set itineraries for groups.",
  "Pedir uma cotação": "Request a quote",
  "Viagens que ficam na memória": "Trips that stay with you",
  "Não achou seu destino?": "Didn't find your destination?",
  "Monta a viagem com a gente. Manda uma mensagem contando o que você tem em mente.":
    "Plan your trip with us. Send us a message about what you have in mind.",
  "Destaques": "Highlights",
  "os roteiros": "the tours",
  "que mais saem da nossa agenda": "we run most often",
  "Destino procurado": "Popular destination",
  "Todos os dias": "Every day",
  "Um dia, 9h às 18h": "One day, 9am to 6pm",
  "Ver o roteiro completo": "See the full itinerary",
  "Quinta a domingo": "Thursday to Sunday",
  "Um dia, 7h às 19h": "One day, 7am to 7pm",
  "Um dia, 8h às 18h": "One day, 8am to 6pm",
  "Saídas semanais": "Weekly departures",
  "Um dia ou fim de semana": "One day or a weekend",
  "Saídas quinzenais": "Departures every two weeks",
  "Quatro dias": "Four days",

  /* ---------- Nossa história (historia.html) ---------- */
  "Nossa história | Rock Tour": "Our story | Rock Tour",
  "Os mundos colidiram: paixão e coragem. A história da Rock Tour e do seu fundador.":
    "Worlds collided: passion and courage. The story of Rock Tour and its founder.",
  "Os mundos colidiram: paixão e coragem": "Worlds collided: passion and courage",
  "Viajar é nossa paixão": "Travel is our passion",
  "Para nós da Rock Tour viajar está na lista das cinco melhores coisas do mundo. Conhecemos novas culturas, línguas, paisagens, comidas, músicas, pessoas e histórias.":
    "At Rock Tour, travel is on our list of the five best things in the world. We discover new cultures, languages, landscapes, food, music, people and stories.",
  "É por essa razão que juntamos paixão e profissionalismo na Rock Tour para levá-lo a conhecer novos lugares.":
    "That is why Rock Tour brings together passion and professionalism to take you to new places.",
  "Aos 42 anos, depois de muito chão na área comercial, resolvi mudar de profissão e realizar um grande sonho meu. Voltei às famosas carteiras escolares, na qual passei mais 5 anos entre trabalho e estudo. De lá para cá passei por várias conquistas e vitórias, uma delas é ter a Rock Tour funcionando e passando meu conhecimento e alegria para meus clientes.":
    "At 42, after many years in sales, I decided to change careers and follow a big dream of mine. I went back to school, where I spent another 5 years balancing work and study. Since then I have had many achievements, and one of them is running Rock Tour and sharing my knowledge and joy with my clients.",
  "O nome Rock Tour significa A Rocha, aquilo que dá fundamento a tudo; devemos ter uma base e ela deve ser sólida. Parafraseando a expressão inglesa \"let's rock\", que traduzida é \"vai acontecer\".":
    "The name Rock Tour means The Rock, the foundation of everything; we need a base, and it must be solid. It also plays on the English expression \"let's rock\", meaning \"it's going to happen\".",
  "Meu nome é Jefferson, conhecido popularmente por Juba, quem sabe terei o prazer de contar a história do meu apelido para você. Nesse período desenvolvi trabalhos na Copa do Mundo de 2014, tenho trabalhado em eventos como SWU e presto serviços para diversos clientes como National Geographic, Calango e Bluemar.":
    "My name is Jefferson, better known as Juba. Maybe one day I will have the pleasure of telling you the story behind my nickname. In this time I worked on the 2014 World Cup, have worked at events such as SWU, and provide services to clients such as National Geographic, Calango and Bluemar.",
  "Será um prazer em conhecê-lo(a) pessoalmente.": "It will be a pleasure to meet you in person.",
  "Jefferson (Juba), fundador da Rock Tour": "Jefferson (Juba), founder of Rock Tour",

  /* ---------- Mundo Mórmon (mundo-mormon.html) ---------- */
  "Mundo Mórmon | Rock Tour": "Mormon World | Rock Tour",
  "Roteiros do Mundo Mórmon com a Rock Tour.": "Mormon World tours with Rock Tour.",
  "Roteiros temáticos da Rock Tour": "Rock Tour themed tours",
  "Um roteiro temático pelos lugares históricos ligados à Igreja de Jesus Cristo dos Santos dos Últimos Dias, nos Estados Unidos. São dias de história, arquitetura e paisagem, com grupos pequenos, acompanhamento em português e ritmo tranquilo.":
    "A themed tour of historic sites connected to The Church of Jesus Christ of Latter-day Saints in the United States. Days of history, architecture and scenery, with small groups, Portuguese-speaking guides and a relaxed pace.",

  /* ---------- Pacotes Internacionais (internacionais.html) ---------- */
  "Pacotes Internacionais | Rock Tour": "International Packages | Rock Tour",
  "Pacotes internacionais da Rock Tour, agência de turismo em Curitiba.":
    "International packages from Rock Tour, a travel agency in Curitiba, Brazil.",
  "Viaje com quem entende do assunto": "Travel with people who know the subject",
  "Nossos pacotes internacionais": "Our international packages",
  "A Rock Tour monta roteiros internacionais sob medida: passagens, hospedagem, traslados, seguro viagem, guia em português e apoio durante toda a viagem. Você diz para onde quer ir e a gente resolve o resto.":
    "Rock Tour builds custom international itineraries: flights, lodging, transfers, travel insurance, a Portuguese-speaking guide and support throughout the trip. You tell us where you want to go and we take care of the rest.",

  /* ---------- Pacotes Nacionais (nacionais.html) ---------- */
  "Pacotes Nacionais | Rock Tour": "Brazil Packages | Rock Tour",
  "Florianópolis, Bonito, Rio de Janeiro e outros destinos nacionais com a Rock Tour.":
    "Florianópolis, Bonito, Rio de Janeiro and other destinations in Brazil with Rock Tour.",
  "O Brasil inteiro em roteiros da Rock Tour": "All of Brazil in Rock Tour itineraries",
  "Nossos pacotes nacionais": "Our Brazil packages",
  "Destinos brasileiros com roteiro montado, transporte, hospedagem e acompanhamento da Rock Tour do início ao fim.":
    "Brazilian destinations with a planned itinerary, transportation, lodging and Rock Tour support from start to finish.",

  /* ---------- Paraná (parana.html) ---------- */
  "Curitiba, Trem da Serra do Mar, Morretes, Ilha do Mel, Superagui e Foz do Iguaçu.":
    "Curitiba, the Serra do Mar Train, Morretes, Ilha do Mel, Superagui and Foz do Iguaçu.",
  "Do centro de Curitiba ao litoral e às Cataratas": "From downtown Curitiba to the coast and the Iguaçu Falls",
  "Roteiros pelo Paraná": "Tours in Paraná",
  "A Rock Tour é de Curitiba e conhece o estado de perto. São passeios de um dia, fins de semana e roteiros completos pelo litoral e pelo oeste do Paraná.":
    "Rock Tour is based in Curitiba and knows the state up close. We offer day trips, weekend trips and full itineraries along the coast and in western Paraná.",

  /* ---------- Contato (contato.html) ---------- */
  "Contato | Rock Tour": "Contact | Rock Tour",
  "Fale com a Rock Tour: 41 99862-2142, agenciarocktour@hotmail.com, Curitiba, Paraná.":
    "Contact Rock Tour: 41 99862-2142, agenciarocktour@hotmail.com, Curitiba, Paraná, Brazil.",
  "Deixe seu contato e a gente responde rápido": "Leave your details and we will reply quickly",
  "Cidade": "City",
  "Telefone / WhatsApp": "Phone / WhatsApp",
  "E-mail": "Email",
  "Para ficar por dentro das novidades e promoções, deixe seu contato que respondemos com a máxima rapidez.":
    "To stay up to date on news and deals, leave your details and we will reply as quickly as possible.",
  "Nome": "Name",
  "Seu nome": "Your name",
  "seu@email.com": "you@email.com",
  "Mensagem": "Message",
  "Conte pra gente qual roteiro te interessa": "Tell us which tour interests you",
  "Enviar pelo WhatsApp": "Send via WhatsApp",

  /* ---------- Roteiros e destinos (textos que vêm do site.js) ---------- */
  "Tour em Curitiba": "Curitiba City Tour",
  "Descubra uma das cidades mais organizadas e encantadoras do Brasil. Curitiba combina natureza, cultura, arquitetura e gastronomia em um roteiro inesquecível. Conheça o Jardim Botânico, Museu Oscar Niemeyer, Ópera de Arame, Parque Tanguá, Bosque Alemão, Centro Histórico e muito mais. Uma experiência completa para quem deseja conhecer o melhor da capital paranaense.":
    "Discover one of the most organized and charming cities in Brazil. Curitiba combines nature, culture, architecture and food in an unforgettable itinerary. Visit the Botanical Garden, the Oscar Niemeyer Museum, the Wire Opera House, Tanguá Park, the German Woods, the Historic Center and much more. A complete experience for anyone who wants to see the best of Paraná's capital.",
  "Quando o sol se põe, Curitiba revela um charme ainda mais especial. Viva uma noite inesquecível conhecendo os melhores restaurantes, bares, pontos iluminados e atrações culturais da cidade. Um passeio perfeito para apreciar a gastronomia local, ouvir boa música e descobrir uma Curitiba elegante, acolhedora e cheia de vida.":
    "When the sun goes down, Curitiba shows an even more special charm. Enjoy an unforgettable night at the city's best restaurants, bars, illuminated landmarks and cultural attractions. A perfect outing to enjoy local food, listen to good music and discover an elegant, welcoming and lively Curitiba.",
  "Trem da Serra do Mar": "Serra do Mar Train",
  "Considerado um dos passeios ferroviários mais bonitos do mundo, o Trem da Serra do Mar proporciona uma viagem emocionante através da maior área preservada de Mata Atlântica do Brasil. Durante o percurso, admire pontes centenárias, túneis, cachoeiras, montanhas e paisagens simplesmente deslumbrantes. Uma experiência que encanta todas as idades.":
    "Considered one of the most beautiful train rides in the world, the Serra do Mar Train offers an exciting journey through the largest preserved area of Atlantic Forest in Brazil. Along the way, admire century-old bridges, tunnels, waterfalls, mountains and simply stunning scenery. An experience that delights all ages.",
  "Uma charmosa cidade histórica cercada pela exuberante Serra do Mar. Caminhe por suas ruas de pedra, admire a arquitetura colonial, conheça o artesanato local e experimente o famoso Barreado, prato típico do Paraná. Morretes é o destino ideal para quem busca tranquilidade, história, boa gastronomia e belas paisagens naturais.":
    "A charming historic town surrounded by the lush Serra do Mar. Stroll its stone streets, admire the colonial architecture, browse local crafts and try the famous Barreado, a traditional dish from Paraná. Morretes is the ideal destination for those looking for peace, history, good food and beautiful natural scenery.",
  "Um verdadeiro paraíso ecológico onde carros não circulam e a natureza é preservada. Praias de águas cristalinas, trilhas, grutas, o Farol das Conchas e a histórica Fortaleza de Nossa Senhora dos Prazeres fazem deste destino um dos lugares mais encantadores do litoral brasileiro. Ideal para relaxar, renovar as energias e viver momentos inesquecíveis.":
    "A true ecological paradise where cars are not allowed and nature is preserved. Beaches with crystal-clear water, trails, caves, the Conchas Lighthouse and the historic Fortress of Nossa Senhora dos Prazeres make this one of the most charming places on the Brazilian coast. Ideal for relaxing, recharging and enjoying unforgettable moments.",
  "Ilha do Superagui": "Superagui Island",
  "Patrimônio Natural da Humanidade pela UNESCO, a Ilha do Superagui é um destino perfeito para quem ama ecoturismo e aventura. Com praias praticamente intocadas, rica biodiversidade, observação de aves, golfinhos e o famoso mico-leão-da-cara-preta, oferece uma experiência única de contato com a natureza em sua forma mais pura.":
    "A UNESCO World Natural Heritage Site, Superagui Island is a perfect destination for lovers of ecotourism and adventure. With nearly untouched beaches, rich biodiversity, bird and dolphin watching and the famous black-faced lion tamarin, it offers a unique experience of nature in its purest form.",
  "Prepare-se para conhecer uma das Sete Maravilhas Naturais do Mundo. As Cataratas do Iguaçu impressionam pela grandiosidade e beleza incomparável. Além delas, visite o Parque das Aves, a Usina Hidrelétrica de Itaipu, o Marco das Três Fronteiras e desfrute das oportunidades de compras no Paraguai e na Argentina. Um destino que surpreende em todos os sentidos.":
    "Get ready to see one of the Seven Natural Wonders of the World. The Iguaçu Falls impress with their size and unmatched beauty. Also visit Parque das Aves, the Itaipu Hydroelectric Dam and the Triple Frontier Landmark, and enjoy shopping in Paraguay and Argentina. A destination that surprises in every way.",
  "Conhecida como a Ilha da Magia, Florianópolis encanta por suas mais de 40 praias, natureza exuberante e excelente qualidade de vida. Além das belas paisagens, oferece rica cultura açoriana, ótima gastronomia baseada em frutos do mar, trilhas, dunas, lagoas e uma vida noturna vibrante. Um destino perfeito para descanso e diversão.":
    "Known as the Island of Magic, Florianópolis charms visitors with more than 40 beaches, lush nature and an excellent quality of life. Beyond the beautiful scenery, it offers a rich Azorean culture, great seafood, trails, dunes, lagoons and a vibrant nightlife. A perfect destination for rest and fun.",
  "Um dos principais destinos de ecoturismo do mundo. Bonito impressiona pelas águas incrivelmente cristalinas, ideais para flutuação, mergulho e contemplação da vida aquática. Explore cavernas, grutas, cachoeiras, rios de águas transparentes e uma natureza preservada que proporciona experiências inesquecíveis para toda a família.":
    "One of the top ecotourism destinations in the world. Bonito impresses with its incredibly clear waters, ideal for snorkeling, diving and watching aquatic life. Explore caves, grottoes, waterfalls, transparent rivers and preserved nature that creates unforgettable experiences for the whole family.",
  "Conhecida como a Cidade Maravilhosa, o Rio de Janeiro reúne algumas das paisagens mais famosas do planeta. Encante-se com o Cristo Redentor, Pão de Açúcar, praias de Copacabana e Ipanema, Escadaria Selarón, Jardim Botânico e a energia contagiante do povo carioca. Um destino que combina natureza, cultura, história e muita alegria em um único lugar.":
    "Known as the Marvelous City, Rio de Janeiro has some of the most famous landscapes on the planet. Enjoy Christ the Redeemer, Sugarloaf Mountain, the beaches of Copacabana and Ipanema, the Selarón Steps, the Botanical Garden and the contagious energy of the people of Rio. A destination that brings together nature, culture, history and plenty of joy in one place.",
  "França": "France",
  "A cidade luz reúne arte, moda, história e romance em cada esquina. Suba na Torre Eiffel, percorra o Louvre, caminhe pelos Champs-Élysées, conheça a Catedral de Notre-Dame e faça um passeio de barco pelo Sena. Um roteiro que combina os grandes cartões-postais com bistrôs, cafés e bairros charmosos como Montmartre e Le Marais.":
    "The City of Light brings together art, fashion, history and romance on every corner. Go up the Eiffel Tower, walk through the Louvre, stroll the Champs-Élysées, see Notre-Dame Cathedral and take a boat ride on the Seine. An itinerary that combines the great landmarks with bistros, cafés and charming neighborhoods like Montmartre and Le Marais.",
  "Roma": "Rome",
  "Itália": "Italy",
  "Uma cidade onde cada rua conta um capítulo da história ocidental. Visite o Coliseu, o Fórum Romano, a Fontana di Trevi, o Panteão e o Vaticano com a Basílica de São Pedro e a Capela Sistina. Entre uma visita e outra, aproveite a melhor comida italiana em trattorias tradicionais. Ideal para quem quer história, arte e gastronomia no mesmo roteiro.":
    "A city where every street tells a chapter of Western history. Visit the Colosseum, the Roman Forum, the Trevi Fountain, the Pantheon and the Vatican with St. Peter's Basilica and the Sistine Chapel. Between visits, enjoy the best Italian food in traditional trattorias. Ideal for anyone who wants history, art and food in the same trip.",
  "O destino internacional mais próximo e um dos que mais encantam brasileiros. Conheça o Obelisco, o Caminito em La Boca, o Cemitério da Recoleta, o Teatro Colón e o Puerto Madero. Aproveite as parrillas, o tango, as livrarias e as compras. Um roteiro curto, acessível e cheio de personalidade, perfeito para o primeiro voo internacional.":
    "The closest international destination and one that Brazilians love most. See the Obelisk, Caminito in La Boca, Recoleta Cemetery, Teatro Colón and Puerto Madero. Enjoy the parrillas, tango, bookstores and shopping. A short, affordable trip full of personality, perfect for a first international flight.",
  "Parques dos Estados Unidos": "United States National Parks",
  "Estados Unidos": "United States",
  "Um roteiro para quem ama natureza em escala grandiosa. Percorra Yellowstone com seus gêiseres e fontes termais, o Grand Canyon, Yosemite e as paisagens de rocha vermelha do Arizona e de Utah. Um programa de estradas, mirantes e trilhas, com hospedagem planejada e apoio da Rock Tour em cada etapa.":
    "An itinerary for those who love nature on a grand scale. Travel through Yellowstone with its geysers and hot springs, the Grand Canyon, Yosemite and the red rock landscapes of Arizona and Utah. A program of scenic roads, viewpoints and trails, with planned lodging and Rock Tour support at every stage.",
  "Utah, Estados Unidos": "Utah, United States",
  "O coração do roteiro. Conheça a Praça do Templo, o Tabernáculo, o Centro de Conferências e os centros de visitantes, com tempo para os jardins e para a história dos pioneiros que chegaram ao Vale do Lago Salgado em 1847. O roteiro inclui ainda passeios pelas montanhas Wasatch e pelo próprio Grande Lago Salgado.":
    "The heart of the tour. Visit Temple Square, the Tabernacle, the Conference Center and the visitors' centers, with time for the gardens and the history of the pioneers who arrived in the Salt Lake Valley in 1847. The itinerary also includes trips to the Wasatch Mountains and the Great Salt Lake itself.",
  "Illinois, Estados Unidos": "Illinois, United States",
  "A cidade histórica às margens do rio Mississippi, reconstruída e preservada como era no século XIX. Caminhe pela vila antiga, conheça as casas e oficinas restauradas, o templo reconstruído e os locais ligados à história do lugar. Um roteiro tranquilo, com muita caminhada, história e paisagem de rio.":
    "The historic city on the banks of the Mississippi River, rebuilt and preserved as it was in the 19th century. Walk through the old town, see the restored homes and workshops, the rebuilt temple and the sites connected to its history. A relaxed itinerary with plenty of walking, history and river scenery.",
  "Utah e o Oeste Americano": "Utah and the American West",
  "Extensão do roteiro para quem quer aproveitar a viagem e conhecer o cenário natural do oeste dos Estados Unidos. Arcos de rocha, desfiladeiros, estradas panorâmicas e parques nacionais como Arches, Bryce Canyon e Zion. Um complemento perfeito para os dias em Salt Lake City.":
    "An extension for those who want to make the most of the trip and see the natural scenery of the western United States. Rock arches, canyons, scenic roads and national parks such as Arches, Bryce Canyon and Zion. A perfect complement to the days in Salt Lake City.",
  "Tour em Curitiba, Curitiba, PR": "Curitiba City Tour, Curitiba, PR",
  "Trem da Serra do Mar, Paraná": "Serra do Mar Train, Paraná",
};


/* =========================================================
   Daqui para baixo é o funcionamento da tradução.
   Não precisa mexer para atualizar textos.
   ========================================================= */
(function(){
  const CHAVE = "rocktour-idioma";                       // escolha salva no navegador
  const ATRIBUTOS = ["placeholder", "aria-label", "alt", "title"];
  const norm = s => (s || "").replace(/\s+/g, " ").trim();

  const DIC = {};
  Object.keys(TRADUCOES).forEach(pt => { DIC[norm(pt)] = TRADUCOES[pt]; });

  /* idioma: ?lang=en na URL, senão a última escolha do visitante, senão português */
  let idioma = "pt";
  try{
    const pedido = new URLSearchParams(location.search).get("lang");
    if(pedido === "en" || pedido === "pt") localStorage.setItem(CHAVE, pedido);
    if(localStorage.getItem(CHAVE) === "en") idioma = "en";
  }catch(e){}

  /* para textos montados dentro do JS (mensagens, alertas) */
  const t = s => (idioma === "en" && DIC[norm(s)]) || s;

  /* guarda o português original do que foi traduzido, para poder voltar */
  const textos = new Map();   // nó de texto -> {pt, en}
  const attrs  = new Map();   // elemento -> {atributo: {pt, en}}
  let tituloPT = null, descPT = null;

  const pula = el => !el || !!el.closest('script,style,noscript,[translate="no"]');

  function traduzNo(no){
    const v = no.nodeValue, k = norm(v);
    if(!k) return;
    const salvo = textos.get(no);
    if(salvo && v === salvo.en) return;                  // já traduzido
    if(!DIC[k]){ textos.delete(no); return; }
    const en = v.match(/^\s*/)[0] + DIC[k] + v.match(/\s*$/)[0];
    textos.set(no, {pt: v, en: en});
    no.nodeValue = en;
  }

  function traduzAtributo(el, a){
    const v = el.getAttribute(a);
    if(v === null) return;
    const lista = attrs.get(el) || {};
    if(lista[a] && v === lista[a].en) return;
    let en = null;
    if(a === "href"){
      /* mensagem pronta dos links de WhatsApp (wa.me/...?text=) */
      const m = v.match(/^(.*wa\.me\/\d+\?text=)(.*)$/);
      if(m){
        let msg = "";
        try{ msg = decodeURIComponent(m[2]); }catch(e){}
        if(DIC[norm(msg)]) en = m[1] + encodeURIComponent(DIC[norm(msg)]);
      }
    } else if(DIC[norm(v)]){
      en = DIC[norm(v)];
    }
    if(en === null) return;
    lista[a] = {pt: v, en: en};
    attrs.set(el, lista);
    el.setAttribute(a, en);
  }

  function percorre(raiz){
    if(raiz.nodeType === 3){ if(!pula(raiz.parentElement)) traduzNo(raiz); return; }
    if(raiz.nodeType !== 1 || pula(raiz)) return;
    [raiz].concat(Array.from(raiz.querySelectorAll("*"))).forEach(el => {
      if(pula(el)) return;
      ATRIBUTOS.forEach(a => { if(el.hasAttribute(a)) traduzAtributo(el, a); });
      if(el.tagName === "A" && el.hasAttribute("href")) traduzAtributo(el, "href");
    });
    const w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT);
    let n;
    while((n = w.nextNode())) if(!pula(n.parentElement)) traduzNo(n);
  }

  /* textos que o site monta depois (cards, modal, carrossel) também são traduzidos */
  const obs = new MutationObserver(lista => {
    obs.disconnect();
    lista.forEach(m => {
      if(m.type === "characterData"){ if(!pula(m.target.parentElement)) traduzNo(m.target); }
      else if(m.type === "attributes"){ if(!pula(m.target)) traduzAtributo(m.target, m.attributeName); }
      else m.addedNodes.forEach(percorre);
    });
    observa();
  });
  const observa = () => obs.observe(document.body, {
    subtree: true, childList: true, characterData: true,
    attributes: true, attributeFilter: ATRIBUTOS.concat("href")
  });

  function cabecalho(){
    const meta = document.querySelector('meta[name="description"]');
    if(tituloPT === null){ tituloPT = document.title; descPT = meta ? meta.content : ""; }
    document.title = idioma === "en" ? (DIC[norm(tituloPT)] || tituloPT) : tituloPT;
    if(meta) meta.content = idioma === "en" ? (DIC[norm(descPT)] || descPT) : descPT;
    document.documentElement.lang = idioma === "en" ? "en" : "pt-BR";
  }

  function voltaPT(){
    obs.disconnect();
    textos.forEach((v, no) => { if(no.nodeValue === v.en) no.nodeValue = v.pt; });
    attrs.forEach((lista, el) => Object.keys(lista).forEach(a => {
      if(el.getAttribute(a) === lista[a].en) el.setAttribute(a, lista[a].pt);
    }));
    textos.clear();
    attrs.clear();
  }

  function aplica(){
    cabecalho();
    if(idioma === "en"){ percorre(document.body); observa(); }
    else voltaPT();
    document.querySelectorAll(".idioma button").forEach(b =>
      b.setAttribute("aria-pressed", b.dataset.lang === idioma ? "true" : "false"));
    document.dispatchEvent(new CustomEvent("idioma", {detail: idioma}));
  }

  function mudar(novo){
    if(novo === idioma) return;
    idioma = novo;
    try{ localStorage.setItem(CHAVE, novo); }catch(e){}
    aplica();
  }

  /* botões PT / EN na barra do topo */
  function montaBotoes(){
    const topo = document.querySelector(".topo");
    if(!topo || topo.querySelector(".idioma")) return;
    const box = document.createElement("div");
    box.className = "idioma";
    box.setAttribute("translate", "no");
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Idioma / Language");
    box.innerHTML = '<button type="button" data-lang="pt" lang="pt-BR">PT</button>' +
                    '<button type="button" data-lang="en" lang="en">EN</button>';
    box.addEventListener("click", e => {
      const b = e.target.closest("button");
      if(b) mudar(b.dataset.lang);
    });
    const antes = Array.from(topo.children).find(el => el.matches(".fone, .btn-topo, .hamburguer"));
    topo.insertBefore(box, antes || null);
  }

  /* em inglês, esconde a página por um instante para não piscar o português */
  if(idioma === "en"){
    const css = document.createElement("style");
    css.textContent = "html.traduzindo body{visibility:hidden}";
    document.head.appendChild(css);
    document.documentElement.classList.add("traduzindo");
    setTimeout(() => document.documentElement.classList.remove("traduzindo"), 1500);
  }

  document.addEventListener("DOMContentLoaded", () => {
    montaBotoes();
    aplica();
    requestAnimationFrame(() => document.documentElement.classList.remove("traduzindo"));
  });

  window.i18n = { t: t, mudar: mudar, get idioma(){ return idioma; } };
})();
