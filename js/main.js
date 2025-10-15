// main.js - gera dinamicamente os cards do cardápio e os destaques na página inicial
const pratos = [
  { id: 1, nome: "Risoto de Cogumelos", preco: "R$ 48,00", img: "images/dish1.jpg", descricao: "Risoto cremoso com cogumelos frescos e parmesão." },
  { id: 2, nome: "Peito de Frango Grelhado", preco: "R$ 36,00", img: "images/dish2.jpg", descricao: "Peito de frango grelhado servido com legumes da estação." },
  { id: 3, nome: "Lasanha à Bolonhesa", preco: "R$ 42,00", img: "images/dish3.jpg", descricao: "Camadas de massa, molho sugo e queijo gratinado." },
  { id: 4, nome: "Salmão ao Molho de Maracujá", preco: "R$ 59,00", img: "images/dish4.jpg", descricao: "Salmão grelhado com redução de maracujá." },
  { id: 5, nome: "Salada Mediterrânea", preco: "R$ 28,00", img: "images/dish5.jpg", descricao: "Mix de folhas, queijo feta, azeitonas e vinagrete." },
  { id: 6, nome: "Bolo de Chocolate", preco: "R$ 18,00", img: "images/dish6.jpg", descricao: "Bolo de chocolate com ganache e sorvete." }
];

function preencherSelectPratos() {
  const select = document.getElementById('prato');
  if (!select) return;

  // Limpa opções antigas (caso o JS rode mais de uma vez)
  select.innerHTML = '';

  // Cria uma opção padrão
  const opcaoPadrao = document.createElement('option');
  opcaoPadrao.textContent = 'Selecione um prato';
  opcaoPadrao.value = '';
  opcaoPadrao.disabled = true;
  opcaoPadrao.selected = true;
  select.appendChild(opcaoPadrao);

  // Gera as opções dinamicamente com base no array 'pratos'
  pratos.forEach(prato => {
    const option = document.createElement('option');
    option.value = prato.nome;
    option.textContent = prato.nome;
    select.appendChild(option);
  });
}

// Seletores
const abrir = document.getElementById('abrirPopup');
const fechar = document.getElementById('fecharPopup');
const popup = document.getElementById('popupLateral');
const formReserva = document.getElementById('formReserva');

// Abre popup (botão principal, se existir)
if (abrir && popup) {
  abrir.addEventListener('click', () => {
    popup.classList.add('ativo');
  });
}

// Fecha popup
if (fechar && popup) {
  fechar.addEventListener('click', () => {
    popup.classList.remove('ativo');
  });
}

// Fecha clicando fora do popup
// document.addEventListener('click', (e) => {
//   if (popup && abrir && !popup.contains(e.target) && e.target !== abrir) {
//     popup.classList.remove('ativo');
//   }
// });

// Captura dados do formulário
if (formReserva) {
  formReserva.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const prato = document.getElementById('prato').value;
    const data = document.getElementById('data').value;

    alert(`Reserva confirmada!\nNome: ${nome}\nPrato: ${prato}\nData: ${data}`);

    formReserva.reset();
    if (popup) popup.classList.remove('ativo');
  });
}

//Função para criar cards dinamicamente
function createCard(prato) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${prato.img}" alt="${prato.nome}" />
    <h4>${prato.nome}</h4>
    <p class="desc">${prato.descricao}</p>
    <p class="price"><strong>${prato.preco}</strong></p>
    <button class="btn-reservar" id="btn-reservar" data-prato="${prato.nome}">Reservar Prato</button>
  `;
  return card;
}

//Preencher o cardapio com os pratos
function populateMenu() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;
  pratos.forEach(p => grid.appendChild(createCard(p)));

  // Adiciona evento aos botões "Reservar Prato"
  document.querySelectorAll('.btn-reservar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const nomePrato = e.target.getAttribute('data-prato');
      abrirPopupComPrato(nomePrato);
    });
  });

}

//Preencher destaques
function populateHighlights() {
  const highlights = document.getElementById('highlights');
  if (!highlights) return;
  // mostrar 4 primeiros como destaque
  pratos.slice(0, 4).forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.nome}" />
      <h4>${p.nome}</h4>
      <p class="desc">${p.descricao}</p>
      <p class="price"><strong>${p.preco}</strong></p>
    `;
    highlights.appendChild(card);
  });
}

// Abre popup pré-selecionando o prato escolhido
function abrirPopupComPrato(nomePrato) {
  if (!popup) return;

  preencherSelectPratos(); // garante que o select está atualizado
  const select = document.getElementById('prato');
  if (select && nomePrato) select.value = nomePrato; // pré-seleciona prato
  popup.classList.add('ativo');
}

// Execute on load
document.addEventListener('DOMContentLoaded', () => {
  preencherSelectPratos();

  const currentPage = window.location.pathname;

  // Se estiver na página inicial (index.html)
  if (currentPage.includes("index.html") || currentPage.endsWith("/")) {
    populateHighlights(); // mostra apenas 4 pratos
  }

  // Se estiver na página de cardápio
  else if (currentPage.includes("cardapio.html")) {
    populateMenu(); // mostra todos os pratos com botão de reserva
  }
});


