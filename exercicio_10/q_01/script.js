function exibirConteudo() {
    let conteudo = document.getElementById('caixaDeTexto').value;

    if (conteudo == '') {
        alert("Você deve escrever algo na caixa de texto")
    }

    document.getElementById('conteudo').innerHTML = conteudo;
}

document.addEventListener('DOMContentLoaded', () => {
    let botaoExibir = document.getElementById('botaoExibir');
    botaoExibir.addEventListener("click", exibirConteudo);
});



