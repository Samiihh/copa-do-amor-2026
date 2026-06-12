import type { PerguntaQuiz } from '../types'

/**
 * ===================================================================
 * PERGUNTAS DO QUIZ - "Copa do Amor 2026"
 * ===================================================================
 * Para editar as perguntas, basta alterar os textos abaixo.
 *
 * Campo "imagem" (opcional):
 * Caso queira exibir uma foto em uma pergunta específica, coloque o
 * arquivo dentro de `src/assets/images/` e referencie o caminho aqui,
 * por exemplo: imagem: '/src/assets/images/foto-quiz-1.jpg'
 * Se não quiser foto em uma pergunta, basta remover ou deixar a
 * propriedade "imagem" de fora.
 * ===================================================================
 */
export const perguntasQuiz: PerguntaQuiz[] = [
  {
    id: 1,
    pergunta: 'O que você recebeu primeiro hoje?',
    opcoes: [
      'Um presente normal',
      'Um açaí inocente',
      'Uma armadilha emocional',
      'Uma missão especial',
    ],
    respostaCorreta: 'Uma missão especial',
    // imagem: '/src/assets/images/foto-quiz-1.jpg',
  },
  {
    id: 2,
    pergunta: 'Qual dessas combina mais com a gente?',
    opcoes: [
      'Paz absoluta',
      'Caos organizado',
      'Amor, risada e implicância',
      'Dois anjos calmos',
    ],
    respostaCorreta: 'Amor, risada e implicância',
    // imagem: '/src/assets/images/foto-quiz-2.jpg',
  },
  {
    id: 3,
    pergunta: 'Se nosso relacionamento fosse um jogo, você seria:',
    opcoes: ['NPC aleatório', 'Boss difícil', 'Meu player 2', 'Tutorial pulável'],
    respostaCorreta: 'Meu player 2',
    // imagem: '/src/assets/images/foto-quiz-3.jpg',
  },
  {
    id: 4,
    pergunta: 'O que eu mais gosto em você?',
    opcoes: ['Seu jeito', 'Seu cuidado', 'Sua parceria', 'Todas as anteriores'],
    respostaCorreta: 'Todas as respostas',
    // imagem: '/src/assets/images/foto-quiz-4.jpg',
  },
  {
    id: 5,
    pergunta: 'Quando penso na gente, eu penso em:',
    opcoes: ['Construção', 'Amor', 'Futuro', 'Tudo isso junto'],
    respostaCorreta: 'Tudo isso junto',
    // imagem: '/src/assets/images/foto-quiz-5.jpg',
  },
  {
    id: 6,
    pergunta: 'Qual dessas coisas eu mais gosto de fazer?',
    opcoes: ['Dormir', 'Limpar a casa', 'Programar', 'Ficar rica na Mega-Sena'],
    respostaCorreta: 'Ficar rica na Mega-Sena',
  },
  {
    id: 7,
    pergunta: 'Qual foi o primeiro jogo que me fez ficar apaixonada?',
    opcoes: ['Free Fire', 'God of War', 'LoL', 'GTA'],
    respostaCorreta: 'God of War',
  },
  {
    id: 8,
    pergunta: 'Quando estou nervosa eu:',
    opcoes: ['Fico quieta', 'Respiro fundo', 'Faço mil perguntas', 'Abro 47 abas diferentes'],
    respostaCorreta: 'Abro 47 abas diferentes',
  },
]
