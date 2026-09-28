/* =========================================================
   Rock Tour: Conferência Geral (site à parte)
   Menu do celular e formulário de cotação.
   Os textos em inglês ficam no conferencia-traducao.js.
   ========================================================= */

const WPP = "https://wa.me/5541998622142";
const t = s => (window.i18n ? window.i18n.t(s) : s);

document.addEventListener("DOMContentLoaded", function(){

  /* ---------- menu do celular ---------- */
  const btn = document.querySelector(".hamburguer");
  const mob = document.querySelector(".menu-mobile");
  if(btn && mob){
    btn.addEventListener("click", function(){
      const aberto = mob.classList.toggle("aberto");
      btn.setAttribute("aria-expanded", aberto ? "true" : "false");
    });
    mob.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        mob.classList.remove("aberto");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- formulário ---------- */
  const form = document.getElementById("form-conferencia");
  if(!form) return;

  /* as páginas das opções chegam com ?opcao=... e já marcam a experiência */
  const opcao = new URLSearchParams(location.search).get("opcao");
  if(opcao){
    form.querySelectorAll('input[name="experiencia"]').forEach(function(r){
      if(r.value === opcao) r.checked = true;
    });
  }

  const valor   = id => document.getElementById(id).value.trim();
  const rotulo  = id => form.querySelector('label[for="' + id + '"]').textContent.trim();
  const marcado = nome => {
    const r = form.querySelector('input[name="' + nome + '"]:checked');
    return r ? r.closest("label").textContent.trim() : "";
  };
  /* nome curto do grupo na mensagem (data-rotulo do fieldset) */
  const grupo = nome => t(form.querySelector('input[name="' + nome + '"]').closest("fieldset").dataset.rotulo);

  /* 2027-03-30 vira 30/03/2027 (PT) ou Mar 30, 2027 (EN) */
  const data = v => {
    if(!v) return "";
    const p = v.split("-").map(Number);
    if(!window.i18n || window.i18n.idioma !== "en") return v.split("-").reverse().join("/");
    return new Date(p[0], p[1]-1, p[2]).toLocaleDateString("en-US", {month:"short", day:"numeric", year:"numeric"});
  };

  document.getElementById("enviar-cotacao").addEventListener("click", function(){
    const aviso = document.getElementById("aviso-form");
    const faltando = ["c-nome", "c-whats"].filter(id => !valor(id));

    if(faltando.length){
      aviso.textContent = form.dataset.falta;   /* o traducao.js traduz o aviso na tela */
      document.getElementById(faltando[0]).focus();
      return;
    }
    aviso.textContent = "";

    const campos = [
      [rotulo("c-nome"),    valor("c-nome")],
      [rotulo("c-email"),   valor("c-email")],
      [rotulo("c-whats"),   valor("c-whats")],
      [rotulo("c-cidade"),  valor("c-cidade")],
      [rotulo("c-pessoas"), valor("c-pessoas")],
      [rotulo("c-chegada"), data(valor("c-chegada"))],
      [rotulo("c-retorno"), data(valor("c-retorno"))],
      [grupo("experiencia"), marcado("experiencia")],
      [grupo("hospedagem"),  marcado("hospedagem")]
    ].filter(c => c[1]);

    const texto = t(form.dataset.ola) + "\n\n" + campos.map(c => c[0] + ": " + c[1]).join("\n");
    window.open(WPP + "?text=" + encodeURIComponent(texto), "_blank");
  });
});
