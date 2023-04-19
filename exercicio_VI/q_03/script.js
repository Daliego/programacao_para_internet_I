let botao = document.getElementById("botao");
let limpador = document.getElementById("cleanButton");

botao.addEventListener("click", function () {
  // selecione o parágrafo usando o método getElementById
  let paragrafo = document.getElementById("paragrafo");
  console.log(paragrafo.textContent);
  // altere o texto do parágrafo
  paragrafo.textContent = "O texto deste parágrafo foi alterado!";
});

limpador.addEventListener("click", () => {
  let paragrafo = document.getElementById("paragrafo");

  paragrafo.textContent = "Você excluiu o que estava escrito aqui";
});
