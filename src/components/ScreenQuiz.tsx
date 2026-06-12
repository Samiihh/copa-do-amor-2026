import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react'
import ProgressBar from './ProgressBar'
import BotaoCampo from './BotaoCampo'
import { perguntasQuiz } from '../data/quizData'
import type { PerguntaQuiz } from '../types'

interface ScreenQuizProps {
  /** Chamado ao final do quiz, enviando a pontuação obtida */
  onFinalizar: (pontuacao: number) => void
}

function embaralhar<T>(itens: T[]): T[] {
  return [...itens].sort(() => Math.random() - 0.5)
}

function validarPerguntas(perguntas: PerguntaQuiz[]): PerguntaQuiz[] {
  perguntas.forEach((pergunta) => {
    if (!pergunta.opcoes.includes(pergunta.respostaCorreta)) {
      console.warn(
        `Pergunta ${pergunta.id}: resposta correta "${pergunta.respostaCorreta}" nao esta nas opcoes.`,
      )
    }
  })

  return perguntas
}

function criarRodadaAleatoria(): PerguntaQuiz[] {
  return embaralhar(validarPerguntas(perguntasQuiz)).map((pergunta) => ({
    ...pergunta,
    opcoes: embaralhar(pergunta.opcoes),
  }))
}

/**
 * TELA 3 - QUIZ
 * Sistema de perguntas com pontuação, barra de progresso,
 * feedback visual de resposta certa/errada e suporte a
 * imagem opcional por pergunta.
 */
export default function ScreenQuiz({ onFinalizar }: ScreenQuizProps) {
  const [perguntasDaRodada] = useState(() => criarRodadaAleatoria())
  const [indiceAtual, setIndiceAtual] = useState(0)
  const [pontuacao, setPontuacao] = useState(0)
  const [opcaoSelecionada, setOpcaoSelecionada] = useState<string | null>(null)
  const [mostrarResumo, setMostrarResumo] = useState(false)

  const perguntaAtual = perguntasDaRodada[indiceAtual]
  const totalPerguntas = perguntasDaRodada.length
  const ultimaPergunta = indiceAtual === totalPerguntas - 1

  /** Lida com o clique em uma opção de resposta */
  function selecionarOpcao(opcao: string) {
    if (opcaoSelecionada) return // evita clicar mais de uma vez

    setOpcaoSelecionada(opcao)
    if (opcao === perguntaAtual.respostaCorreta) {
      setPontuacao((p) => p + 1)
    }
  }

  /** Avança para a próxima pergunta ou exibe o resumo final */
  function avancarPergunta() {
    if (ultimaPergunta) {
      setMostrarResumo(true)
    } else {
      setIndiceAtual((i) => i + 1)
      setOpcaoSelecionada(null)
    }
  }

  // -----------------------------------------------------------
  // TELA DE RESUMO (após responder a última pergunta)
  // -----------------------------------------------------------
  if (mostrarResumo) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="sticker-card w-full max-w-md p-8 shadow-glow-gold"
        >
          <motion.div
            animate={{ rotate: [0, -8, 8, -8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-campo-gold/15 text-campo-gold"
          >
            <Trophy size={36} />
          </motion.div>
          <h2 className="scoreboard-text text-glow-gold text-2xl sm:text-3xl text-campo-white">
            Fim de 1º Tempo!
          </h2>
          <p className="mt-3 font-body text-campo-white/80">
            Você acertou{' '}
            <span className="font-bold text-campo-gold">
              {pontuacao} de {totalPerguntas}
            </span>{' '}
            perguntas sobre o nosso time.
          </p>
          <p className="mt-2 font-body text-sm text-campo-white/60">
            {pontuacao === totalPerguntas
              ? 'Conhecimento de craque! Você é o nosso camisa 10 de verdade. 💜'
              : 'O placar nem importa — o que vale é o jogo que a gente joga juntos. 💜'}
          </p>

          <div className="mt-6">
            <BotaoCampo onClick={() => onFinalizar(pontuacao)} icone={<ArrowRight size={20} />}>
              Continuar
            </BotaoCampo>
          </div>
        </motion.div>
      </div>
    )
  }

  // -----------------------------------------------------------
  // TELA DA PERGUNTA ATUAL
  // -----------------------------------------------------------
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6">
      <div className="w-full max-w-lg">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <span className="font-score text-xs uppercase tracking-[0.4em] text-campo-gold">
            Quiz da Paixão
          </span>
        </motion.div>

        {/* Barra de progresso */}
        <ProgressBar
          atual={indiceAtual + 1}
          total={totalPerguntas}
          respondidas={indiceAtual + (opcaoSelecionada ? 1 : 0)}
        />

        {/* Card da pergunta - troca de animação ao mudar de pergunta */}
        <AnimatePresence mode="wait">
          <motion.div
            key={perguntaAtual.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="sticker-card mt-6 p-6 shadow-glow-purple"
          >
            {/* Imagem opcional da pergunta */}
            {perguntaAtual.imagem && (
              <div className="mb-4 overflow-hidden rounded-xl border border-campo-purple/30">
                <img
                  src={perguntaAtual.imagem}
                  alt={`Imagem referente à pergunta ${perguntaAtual.id}`}
                  className="h-44 w-full object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            )}

            <h3 className="font-display text-xl sm:text-2xl text-campo-white">
              {perguntaAtual.pergunta}
            </h3>

            {/* Opções de resposta */}
            <div className="mt-5 flex flex-col gap-3">
              {perguntaAtual.opcoes.map((opcao) => {
                const isSelecionada = opcaoSelecionada === opcao
                const isCorreta = opcao === perguntaAtual.respostaCorreta
                const jaRespondeu = opcaoSelecionada !== null

                // Define o estilo de cada opção com base no estado da resposta
                let estiloBorda = 'border-campo-purple/30 hover:border-campo-purple hover:bg-campo-purple/10'
                if (jaRespondeu) {
                  if (isCorreta) {
                    estiloBorda = 'border-campo-grass bg-campo-grass/10'
                  } else if (isSelecionada) {
                    estiloBorda = 'border-campo-red bg-campo-red/10'
                  } else {
                    estiloBorda = 'border-campo-purple/10 opacity-50'
                  }
                }

                return (
                  <motion.button
                    key={opcao}
                    onClick={() => selecionarOpcao(opcao)}
                    whileHover={!jaRespondeu ? { scale: 1.02 } : undefined}
                    whileTap={!jaRespondeu ? { scale: 0.98 } : undefined}
                    disabled={jaRespondeu}
                    className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left font-body text-sm sm:text-base text-campo-white transition-all duration-300 ${estiloBorda}`}
                  >
                    <span>{opcao}</span>
                    {jaRespondeu && isCorreta && (
                      <CheckCircle2 size={20} className="text-campo-grass" />
                    )}
                    {jaRespondeu && isSelecionada && !isCorreta && (
                      <XCircle size={20} className="text-campo-red" />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {/* Botão de avançar (aparece após responder) */}
            <AnimatePresence>
              {opcaoSelecionada && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 flex justify-center"
                >
                  <BotaoCampo onClick={avancarPergunta} icone={<ArrowRight size={20} />}>
                    {ultimaPergunta ? 'Ver Resultado' : 'Próxima Pergunta'}
                  </BotaoCampo>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
