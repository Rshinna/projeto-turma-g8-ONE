let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibireTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  if ("speechSynthesis" in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "pt-BR";
    utterance.rate = 1.2;
    window.speechSynthesis.speak(utterance);
  } else {
    console.log("Web Speech API não suportada neste navegador.");
  }
}

function exibirMsgInicial() {
  exibireTextoNaTela("h1", "Jogo do número secreto");
  exibireTextoNaTela("p", "Escolha um número entre 1 e 10");
}
exibirMsgInicial();

function verificarChute() {
  let chute = document.querySelector("input").value;
  if (chute == numeroSecreto) {
    exibireTextoNaTela("h1", "Acertou!!!");
    let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
    let numeroDeTentativas = `Você descobriu o número secreto! com ${tentativas} ${palavraTentativa}.`;
    exibireTextoNaTela("p", numeroDeTentativas);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute > numeroSecreto) {
      exibireTextoNaTela("p", "O número secreto é menor.");
    } else {
      exibireTextoNaTela("p", "O número secreto é maior.");
    }
    tentativas++;
    limparCampo();
  }
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
  if (quantidadeDeElementosNaLista === numeroLimite) {
    listaDeNumerosSorteados = [];
  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido;
  }
}

function limparCampo() {
  chute = document.querySelector("input");
  chute.value = "";
}

function restart() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibirMsgInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
