/**
 * ===================================================================
 * FIGURINHAS DO ÁLBUM - "Copa do Amor 2026"
 * ===================================================================
 * Essas são as "figurinhas" que aparecem no fundo da aplicação,
 * simulando uma bolinha que bate na tela e cola uma figurinha
 * (foto + legenda) no álbum.
 *
 * COMO ADICIONAR/EDITAR UMA FIGURINHA:
 * 1. Coloque a foto desejada em `public/images/`
 *    (ex: `public/images/figurinha-praia.jpg`)
 * 2. Adicione um novo item no array abaixo, com:
 *    - imagem: caminho da foto
 *    - legenda: o texto que aparece embaixo da foto
 *
 * Pode adicionar quantas quiser — elas vão se repetir em loop,
 * uma de cada vez, em posições aleatórias da tela.
 *
 * Se a imagem ainda não existir, a figurinha mostra apenas um
 * fundo estilizado com a legenda (não quebra o layout).
 * ===================================================================
 */
export interface Figurinha {
  id: number
  imagem: string
  legenda: string
}

export const figurinhasAlbum: Figurinha[] = [
  {
    id: 1,
    imagem: '/images/20250712_215023.jpg',
    legenda: 'Quando o amor trasnborda 💜',
  },
  {
    id: 2,
    imagem: '/images/20250803_181805.jpg',
    legenda: 'Momentos mega Especiais',
  },
  {
    id: 3,
    imagem: '/images/20250901_204911.jpg',
    legenda: 'Mais momentos incriveis ❤️',
  },
  {
    id: 4,
    imagem: '/images/20251018_195720.jpg',
    legenda: 'Nosso time 🏆',
  },
  {
    id: 5,
    imagem: '/images/20250614_000445.jpg',
    legenda: 'Sempre juntos em todos os Games 🎮',
  },
  {
    id: 6,
    imagem: '/images/IMG_20240120_131203_028.webp',
    legenda: 'Muito amor envolvido ❤️',
  },
  {
    id: 7,
    imagem: '/images/20251115_194924.jpg',
    legenda: 'Time Completo ❤️',
  },
  {
    id: 8,
    imagem: '/images/IMG_20250613_195656_025.webp',
    legenda: 'Figurinha especial',
  },
  {
    id: 9,
    imagem: '/images/IMG_20250615_182535_197.webp',
    legenda: 'Casal bunito de mais 💕',
  },
  {
    id: 10,
    imagem: '/images/Screenshot_20250429_122850_Photos.jpg',
    legenda: 'Memoria favorita',
  },
  {
    id: 11,
    imagem: '/images/Captura de tela 2026-06-12 114524.png',
    legenda: 'Nossa primeira aventura juntos. ❤️✈️',
  },
]
