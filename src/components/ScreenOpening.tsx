import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import BotaoCampo from './BotaoCampo'
import { conteudoAbertura } from '../data/content'

interface ScreenOpeningProps {
  onAvancar: () => void
}

/**
 * TELA 1 - ABERTURA
 * Tela de entrada do "jogo", com o título principal,
 * texto de introdução e botão para começar.
 */
export default function ScreenOpening({ onAvancar }: ScreenOpeningProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      {/* Luzes de estádio animadas no fundo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/2 top-[-10%] h-72 w-72 -translate-x-1/2 rounded-full bg-campo-purple/40 blur-3xl"
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[-10%] bottom-[-10%] h-80 w-80 rounded-full bg-campo-red/30 blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Selo / bolinha decorativa estilo "AO VIVO" */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6 flex items-center gap-2 rounded-full border border-campo-red/60 bg-campo-red/10 px-4 py-1.5 text-xs font-score font-bold uppercase tracking-[0.3em] text-campo-red"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-campo-red opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-campo-red" />
        </span>
        Transmissão ao vivo
      </motion.div>

      {/* Título principal */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="scoreboard-text text-glow-purple text-4xl sm:text-6xl md:text-7xl font-display font-bold leading-tight text-campo-white"
      >
        🏆 Copa do Amor
        <br />
        <span className="text-campo-red text-glow-red">2026</span>
      </motion.h1>

      {/* Parágrafos de introdução, aparecendo em sequência */}
      <div className="mt-8 max-w-xl space-y-4">
        {conteudoAbertura.paragrafos.map((paragrafo, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.35 }}
            className={`font-body text-base sm:text-lg ${
              index === conteudoAbertura.paragrafos.length - 1
                ? 'font-semibold text-campo-gold'
                : 'text-campo-white/80'
            }`}
          >
            {paragrafo}
          </motion.p>
        ))}
      </div>

      {/* Botão para avançar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="mt-12"
      >
        <BotaoCampo onClick={onAvancar} icone={<ArrowRight size={22} />}>
          {conteudoAbertura.textoBotao}
        </BotaoCampo>
      </motion.div>

      {/* Linha decorativa estilo campo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 text-xs font-score uppercase tracking-[0.4em] text-campo-white/30"
      >
        Estádio do Coração • Edição Especial
      </motion.div>
    </div>
  )
}
