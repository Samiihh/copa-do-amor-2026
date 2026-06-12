import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Etapa } from './types'
import ScreenOpening from './components/ScreenOpening'
import ScreenLineup from './components/ScreenLineup'
import ScreenQuiz from './components/ScreenQuiz'
import ScreenVAR from './components/ScreenVAR'
import ScreenStats from './components/ScreenStats'
import ScreenFinal from './components/ScreenFinal'
import FundoFigurinhas from './components/FundoFigurinhas'

/**
 * Componente raiz da aplicação "Copa do Amor 2026".
 *
 * Controla a navegação entre as 6 telas/etapas do "jogo" usando
 * um simples estado de etapa atual. Cada tela é responsável por
 * chamar `irPara(...)` quando o usuário avança.
 */
export default function App() {
  const [etapa, setEtapa] = useState<Etapa>('abertura')

  // Pontuação obtida no quiz (Tela 3) - guardada para uso futuro, se desejado
  const [, setPontuacaoQuiz] = useState(0)

  return (
    <div className="relative min-h-screen w-full">
      {/* Fundo fixo do "estádio" */}
      <div className="stadium-bg" />
      <div className="stadium-lines" />

      {/* Figurinhas animadas que "colam" nos cantos da tela */}
      <FundoFigurinhas />

      <div className="relative z-10">
      <AnimatePresence mode="wait">
        {etapa === 'abertura' && (
          <motion.div
            key="abertura"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ScreenOpening onAvancar={() => setEtapa('escalacao')} />
          </motion.div>
        )}

        {etapa === 'escalacao' && (
          <motion.div
            key="escalacao"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ScreenLineup onAvancar={() => setEtapa('quiz')} />
          </motion.div>
        )}

        {etapa === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ScreenQuiz
              onFinalizar={(pontuacao) => {
                setPontuacaoQuiz(pontuacao)
                setEtapa('var')
              }}
            />
          </motion.div>
        )}

        {etapa === 'var' && (
          <motion.div
            key="var"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ScreenVAR onAvancar={() => setEtapa('estatisticas')} />
          </motion.div>
        )}

        {etapa === 'estatisticas' && (
          <motion.div
            key="estatisticas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ScreenStats onAvancar={() => setEtapa('final')} />
          </motion.div>
        )}

        {etapa === 'final' && (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ScreenFinal
              onVoltarInicio={() => {
                setPontuacaoQuiz(0)
                setEtapa('abertura')
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}
