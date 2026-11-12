/* Rock Tour - submenu do menu principal.
   No desktop o submenu abre ao passar o mouse (CSS).
   Este arquivo cuida do toque no celular e do fechamento por clique fora / Esc. */
(function () {
  'use strict';

  var itens = Array.prototype.slice.call(document.querySelectorAll('.rt-has-sub'));
  if (!itens.length) return;

  function fechar(li) {
    li.classList.remove('rt-open');
    var botao = li.querySelector('.rt-sub-toggle');
    if (botao) botao.setAttribute('aria-expanded', 'false');
  }

  function fecharTodos(menos) {
    itens.forEach(function (li) {
      if (li !== menos) fechar(li);
    });
  }

  itens.forEach(function (li) {
    var botao = li.querySelector('.rt-sub-toggle');
    if (!botao) return;

    botao.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var abrir = !li.classList.contains('rt-open');
      fecharTodos(li);
      li.classList.toggle('rt-open', abrir);
      botao.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    });
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest || !e.target.closest('.rt-has-sub')) fecharTodos();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') fecharTodos();
  });
})();
