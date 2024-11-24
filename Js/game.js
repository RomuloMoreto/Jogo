const grid = document.querySelector('.grid');
const grid2 = document.querySelector('.grid2');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const nomeimgs = [
  'Soldados aliados desembarcando nas praias da Normandia, na França, sob intenso fogo inimigo.',
  'Imagens de soldados soviéticos e alemães em intensa luta urbana na cidade de Stalingrado (atual Volgogrado, na Rússia).',
  'Uma fotografia depois da explosão da bomba atômica em Hiroshima, Japão.',
  'Imagens de prisioneiros em campos de concentração nazistas.',
  'A assinatura da rendição incondicional da Alemanha, após a queda de Berlim.',
  'Em 22 de junho de 1941, Hitler lançou a maior ofensiva militar da história, invadindo a União Soviética.',
  'De julho a outubro de 1940, a Alemanha tentou conquistar a Grã-Bretanha por meio de ataques aéreos massivos.',
  'Em 1º de setembro de 1939, a Alemanha Nazista, sob o comando de Adolf Hitler, invadiu a Polônia, dando início à Segunda Guerra Mundial.',
  'Em 7 de dezembro de 1941, o Japão atacou a base naval americana de Pearl Harbor, no Havai, o que levou os Estados Unidos a entrar na guerra.',
  'Em junho de 1942, a marinha dos Estados Unidos derrotou uma tentativa japonesa de atacar a ilha de Midway no Pacífico.',
];

const texts = [
  "Imagens de soldados soviéticos e alemães em intensa luta urbana na cidade de Stalingrado (atual Volgogrado, na Rússia).",
  "Soldados aliados desembarcando nas praias da Normandia, na França, sob intenso fogo inimigo.",
  "Uma fotografia depois da explosão da bomba atômica em Hiroshima, Japão.",
  "Imagens de prisioneiros em campos de concentração nazistas.",
  "A assinatura da rendição incondicional da Alemanha, após a queda de Berlim.",
  "Em 22 de junho de 1941, Hitler lançou a maior ofensiva militar da história, invadindo a União Soviética.",
  "De julho a outubro de 1940, a Alemanha tentou conquistar a Grã-Bretanha por meio de ataques aéreos massivos.",
  "Em 1º de setembro de 1939, a Alemanha Nazista, sob o comando de Adolf Hitler, invadiu a Polônia, dando início à Segunda Guerra Mundial.",
  "Em 7 de dezembro de 1941, o Japão atacou a base naval americana de Pearl Harbor, no Havai, o que levou os Estados Unidos a entrar na guerra.",
  "Em junho de 1942, a marinha dos Estados Unidos derrotou uma tentativa japonesa de atacar a ilha de Midway no Pacífico.",
];

// Função para criar elementos do DOM
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};

let firstCard = '';
let secondCard = '';
let matchedCards = 0;

const checkEndGame = () => {
  if (matchedCards === 10) {
    setTimeout(() => {
      clearInterval(this.loop);
      alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML}`);
    }, 500); 
  }
};

// Função de comparação das cartas
const checkCards = () => {
  const firstnomeimg = firstCard.getAttribute('data-nomeimg');
  const secondtext = secondCard.getAttribute('data-text');

  // Comparar os valores dos atributos data-nomeimg e data-text
  if (firstnomeimg === secondtext) {
    firstCard.classList.add('disable-card');
    secondCard.classList.add('disable-card');
    matchedCards++; // Incrementar o contador de cartas combinadas

    firstCard = '';
    secondCard = '';

    checkEndGame();
  } else {
    // Caso contrário, remover a classe reveal-card depois de um delay
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
    
      firstCard = '';
      secondCard = '';
    }, 1500);
  }
};

// Função para revelar as cartas
const revealCard = ({target}) => {
  // Verificar se a carta já foi revelada ou desabilitada
  if (target.parentNode.className.includes('reveal-card') || target.parentNode.classList.contains('disable-card')) {
    return;
  }

  if (firstCard == '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard == '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();
  }
};

// Função para criar carta de imagem
const createCardImage = (nomeimg) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../img/${nomeimg}.jpg')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-nomeimg', nomeimg);

  return card;
};

// Função para criar carta de texto
const createCardText = (text) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.textContent = text;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-text', text);

  return card;
};

// Função para embaralhar as cartas (Algoritmo de Fisher-Yates)
const embaralhar = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
  }
};

// Carregar e embaralhar as cartas combinadas de imagem e texto
const loadCards = () => {
  const imageCards = [];
  const textCards = [];

  // Criar as cartas de imagem e texto separadas
  nomeimgs.forEach((nomeimg) => {
    imageCards.push(createCardImage(nomeimg)); // Cartas de imagem
  });

  texts.forEach((text) => {
    textCards.push(createCardText(text)); // Cartas de texto
  });

  // Embaralhar as cartas de imagem e de texto separadamente
  embaralhar(imageCards);
  embaralhar(textCards);

  // Adicionar as cartas embaralhadas ao grid
  imageCards.forEach((card, index) => {
    grid.appendChild(card); // Adiciona cartas de imagem ao grid
    grid2.appendChild(textCards[index]); // Adiciona as cartas de texto ao outro grid
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
};

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadCards();
};