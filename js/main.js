// main.js - gera dinamicamente os cards do cardápio e os destaques na página inicial
const pratos = [
  { id: 1, nome: "Risoto de Cogumelos", preco: "R$ 48,00", img: "images/dish1.jpg", descricao: "Risoto cremoso com cogumelos frescos e parmesão." },
  { id: 2, nome: "Peito de Frango Grelhado", preco: "R$ 36,00", img: "images/dish2.jpg", descricao: "Peito de frango grelhado servido com legumes da estação." },
  { id: 3, nome: "Lasanha à Bolonhesa", preco: "R$ 42,00", img: "images/dish3.jpg", descricao: "Camadas de massa, molho sugo e queijo gratinado." },
  { id: 4, nome: "Salmão ao Molho de Maracujá", preco: "R$ 59,00", img: "images/dish4.jpg", descricao: "Salmão grelhado com redução de maracujá." },
  { id: 5, nome: "Salada Mediterrânea", preco: "R$ 28,00", img: "images/dish5.jpg", descricao: "Mix de folhas, queijo feta, azeitonas e vinagrete." },
  { id: 6, nome: "Bolo de Chocolate", preco: "R$ 18,00", img: "images/dish6.jpg", descricao: "Bolo de chocolate com ganache e sorvete." }
];

function createCard(prato) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${prato.img}" alt="${prato.nome}" />
    <h4>${prato.nome}</h4>
    <p class="desc">${prato.descricao}</p>
    <p class="price"><strong>${prato.preco}</strong></p>
  `;
  return card;
}

function populateMenu() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;
  pratos.forEach(p => grid.appendChild(createCard(p)));
}

function populateHighlights() {
  const highlights = document.getElementById('highlights');
  if (!highlights) return;
  // mostrar 3 primeiros como destaque
  pratos.slice(0, 3).forEach(p => highlights.appendChild(createCard(p)));
}

// Execute on load
document.addEventListener('DOMContentLoaded', () => {
  populateMenu();
  populateHighlights();
});
