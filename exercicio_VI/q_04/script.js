let botao = document.getElementById("botao");
let botao2 = document.getElementById("botao2");

botao.addEventListener("click", function () {
    let paragrafo = document.getElementById("textContent")
  // selecione o parágrafo usando o método getElementById
    let textoPraModificar = document.getElementById("modifique_me")
    textoPraModificar.textContent = paragrafo.textContent
  // altere o texto do parágrafo
});

botao2.addEventListener("click", () => {
    let paragrafo = document.getElementById("textContent")

  let textoPraModificar = document.getElementById("modifique_me")

  textoPraModificar.textContent = paragrafo.innerHTML
});
