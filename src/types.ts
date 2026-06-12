/**
 * Tipos compartilhados da aplicação "Copa do Amor 2026"
 */

// Identificadores das telas / etapas do jogo
export type Etapa =
  | 'abertura'
  | 'escalacao'
  | 'quiz'
  | 'var'
  | 'estatisticas'
  | 'final'

// Estrutura de uma pergunta do quiz
export interface PerguntaQuiz {
  id: number
  pergunta: string
  opcoes: string[]
  respostaCorreta: string
  /** Caminho da imagem opcional exibida no card da pergunta */
  imagem?: string
}

// Estrutura de uma estatística exibida na Tela 5
export interface EstatisticaPartida {
  id: string
  icone: 'gols' | 'risadas' | 'abracos' | 'escolhas'
  valor: number
  /** Texto alternativo mostrado quando o valor é "incontável" (ex: "incontáveis") */
  valorTexto?: string
  rotulo: string
}
