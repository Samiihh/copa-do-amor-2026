import type { EstatisticaPartida } from '../types'

/**
 * ===================================================================
 * CONTEÚDO EDITÁVEL - "Copa do Amor 2026"
 * ===================================================================
 * Este arquivo centraliza todos os textos, nomes e dados que podem
 * ser alterados sem precisar tocar na lógica dos componentes.
 * ===================================================================
 */

// -------------------------------------------------------------
// TELA 1 - ABERTURA
// -------------------------------------------------------------
export const conteudoAbertura = {
  titulo: 'COPA DO AMOR 2026',
  paragrafos: [
    'Achou que o presente era só o açaí?',
    'Depois de um delicioso açaí, agora começa a partida mais importante do dia.',
    'Bem-vindo à Copa do Amor.',
  ],
  textoBotao: 'Entrar em Campo',
}

// -------------------------------------------------------------
// TELA 2 - ESCALAÇÃO OFICIAL
// -------------------------------------------------------------
export const conteudoEscalacao = {
  tituloSecao: 'Escalação Oficial',
  /**
   * Caminho da foto do casal em destaque.
   * Troque pelo caminho da sua imagem em `src/assets/images/`.
   */
  fotoCasal: '/src/assets/images/casal-principal.jpg',
  fotoSamy: '/src/assets/images/samy.png',
  fotoThi: '/src/assets/images/thi.png',
  tecnica: { funcao: 'Camisa 10', nome: 'Samira' },
  camisa10: { funcao: 'Camisa 12', nome: 'Thiago' },
  // 👇 Variável: ajuste o tempo de relacionamento livremente
  tempoRelacionamento: '2 anos e contando',
  titulosConquistados: ['Risadas', 'Companheirismo', 'Aventuras', 'Amor'],
  textoBotao: 'Começar Partida',
}

// -------------------------------------------------------------
// TELA 4 - VAR DO AMOR
// -------------------------------------------------------------
export const conteudoVAR = {
  tituloSecao: 'VAR do Amor',
  /**
   * Foto antiga do casal analisada pelo "VAR".
   * Troque pelo caminho da sua imagem em `src/assets/images/`.
   */
  fotoAnalise: '/src/assets/images/var.png',
  fotoAntiga: '/src/assets/images/IMG_20231014_212201_048.webp',
  pergunta: 'Aguardando confirmação do lance...',
  perguntaRevelada: 'Você lembra desse momento?',
  // 👇 Edite livremente a "resposta" / legenda do momento revisado
  respostaEditavel:
    'Lance confirmado em campo: foi aqui que tudo começou a fazer sentido. ' +
    'Gol validado, sem impedimento só duas pessoas se encontrando no momento certo.',
}

// -------------------------------------------------------------
// TELA 5 - ESTATÍSTICAS DA PARTIDA
// -------------------------------------------------------------
export const estatisticasPartida: EstatisticaPartida[] = [
  {
    id: 'gols',
    icone: 'gols',
    valor: 999,
    valorTexto: '999+',
    rotulo: 'Gols de carinho',
  },
  {
    id: 'risadas',
    icone: 'risadas',
    valor: 100,
    valorTexto: 'Incontáveis',
    rotulo: 'Risadas compartilhadas',
  },
  {
    id: 'abracos',
    icone: 'abracos',
    valor: 100,
    valorTexto: 'Muitos',
    rotulo: 'Abraços recebidos',
  },
  {
    id: 'escolhas',
    icone: 'escolhas',
    valor: 100,
    valorTexto: 'Todas',
    rotulo: 'Escolhas feitas diariamente',
  },
]

export const conteudoEstatisticas = {
  tituloSecao: 'Estatísticas da Partida',
  subtitulo: 'O placar não mente: essa parceria está em outro nível.',
}

// -------------------------------------------------------------
// TELA 6 - FINAL
// -------------------------------------------------------------
export const conteudoFinal = {
  titulo: 'CAMPEÃO DA COPA DO AMOR 2026',
  mensagem: [
    'Thi,',
    'Entre tantas partidas, desafios, dias bons e dias difíceis...',
    'Você continua sendo meu jogador favorito.',
    'Obrigada por dividir esse campo da vida comigo.',
    'Te amo. ❤️',
  ],
  // Seção "Renovação de Contrato"
  contrato: {
    titulo: 'Renovação de Contrato',
    pergunta: 'Deseja renovar seu contrato com a equipe Samira FC?',
    botaoSim: 'SIM',
    botaoComCerteza: 'COM CERTEZA',
    respostaTitulo: 'Contrato renovado com sucesso.',
    respostaValidade: 'Validade: ∞',
  },
}
