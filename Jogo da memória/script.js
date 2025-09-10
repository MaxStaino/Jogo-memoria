const container = document.querySelector('.container');
const botaoReiniciar = document.getElementById("restart");

let primeiraCarta = null;
let segundaCarta = null;
let trava = false;
let movimentos = 0;
let contagemPareadas = 0;

// Reiniciar o jogo
botaoReiniciar.addEventListener("click", () => location.reload());

// Itens do jogo
let items = [
  { nome: "cachorro", imagem: "img/cachorro.png" },
  { nome: "elefante", imagem: "img/elefante.png" },
  { nome: "gato", imagem: "img/gato.png" },
  { nome: "leao", imagem: "img/leao.png" },
  { nome: "morcego", imagem: "img/morcego.png"},
  { nome: "pintinho", imagem: "img/pintinho.png"},
  { nome: "rato", imagem: "img/rato.png"},
  { nome: "tartaruga", imagem: "img/tartaruga.png"},
  { nome: "tucano", imagem: "img/tucano.png"},
  { nome: "urso", imagem: "img/urso.png"},
  { nome: "vaca", imagem: "img/vaca.png"},
  { nome: "veado", imagem: "img/veado.png"}
];

// Duplicar e embaralhar
let cartas = [...items, ...items].sort(() => Math.random() - 0.5);

// Criar cartas
function criarCartas() {
  cartas.forEach(item => {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.innerHTML = `
      <div class="frente">
        <img src="img/fundo.png">
      </div>
      <div class="verso">
        <img src="${item.imagem}" alt="${item.nome}">
      </div>
    `;
    carta.addEventListener("click", () => virarCarta(carta, item));
    container.appendChild(carta);
  });
}

// Virar carta
function virarCarta(carta, item) {
  if (trava || carta.classList.contains("virada")) return;

  carta.classList.add("virada");

  if (!primeiraCarta) {
    primeiraCarta = { carta, item };
  } else if (!segundaCarta) {
    segundaCarta = { carta, item };
    movimentos++;
    checarPar();
  }
}

// Verificar par
const telaVitoria = document.getElementById('tela-vitoria');
const infoResultado = document.getElementById('info-resultado');
const reiniciarVitoria = document.getElementById('reiniciar-vitoria');

reiniciarVitoria.addEventListener('click', () => location.reload());

function checarPar() {
  if (primeiraCarta.item.nome === segundaCarta.item.nome) {
    contagemPareadas += 2;
    primeiraCarta = null;
    segundaCarta = null;

    if (contagemPareadas === cartas.length) {
      mostrarVitoria();
    }
  } else {
    trava = true;
    setTimeout(() => {
      primeiraCarta.carta.classList.remove("virada");
      segundaCarta.carta.classList.remove("virada");
      primeiraCarta = null;
      segundaCarta = null;
      trava = false;
    }, 1000);
  }
}

// Mostrar tela de vitória
function mostrarVitoria() {
  infoResultado.textContent = `Você encontrou todos os pares em ${movimentos} jogadas!`;
  telaVitoria.classList.add('mostrar');
}

// Iniciar jogo
criarCartas();

