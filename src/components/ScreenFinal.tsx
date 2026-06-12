import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Heart, FileText, Sparkles, RotateCcw } from 'lucide-react'
import Confete from './Confete'
import BotaoCampo from './BotaoCampo'
import { conteudoFinal } from '../data/content'

interface ScreenFinalProps {
  onVoltarInicio: () => void
}

/**
 * TELA 6 - FINAL
 * Tela de encerramento: troféu, mensagem final emocionante e,
 * após alguns segundos, a "renovação de contrato" com confetes.
 */
export default function ScreenFinal({ onVoltarInicio }: ScreenFinalProps) {
  const [mostrarContrato, setMostrarContrato] = useState(false)
  const [contratoRenovado, setContratoRenovado] = useState(false)

  // Exibe a seção de "Renovação de Contrato" após alguns segundos
  useEffect(() => {
    const timer = setTimeout(() => setMostrarContrato(true), 4500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      {/* Confetes ao confirmar a renovação */}
      {contratoRenovado && <Confete />}

      <AnimatePresence>
        {contratoRenovado && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="fixed right-4 top-4 z-[60] sm:right-6 sm:top-6"
          >
            <BotaoCampo
              onClick={onVoltarInicio}
              variante="vermelho"
              icone={<RotateCcw size={18} />}
              className="px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base"
            >
              Voltar ao Início
            </BotaoCampo>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brilho de fundo dourado */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-campo-gold/20 blur-3xl"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Troféu animado */}
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative mb-4"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-campo-gold/15 text-campo-gold shadow-glow-gold sm:h-28 sm:w-28"
        >
          <Trophy size={56} />
        </motion.div>
        {/* Brilhos ao redor do troféu */}
        <motion.span
          className="absolute -right-2 -top-2 text-campo-gold"
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
        >
          <Sparkles size={20} />
        </motion.span>
        <motion.span
          className="absolute -left-3 bottom-0 text-campo-gold"
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.2, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
        >
          <Sparkles size={16} />
        </motion.span>
      </motion.div>

      {/* Título de campeão */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="scoreboard-text text-glow-gold max-w-2xl text-2xl sm:text-4xl md:text-5xl font-display text-campo-white"
      >
        🏆 {conteudoFinal.titulo}
      </motion.h1>

      {/* Mensagem final, linha por linha */}
      <div className="mt-8 max-w-md space-y-3">
        {conteudoFinal.mensagem.map((linha, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 + index * 0.4 }}
            className={`font-body text-base sm:text-lg ${
              index === 0
                ? 'font-semibold text-campo-gold'
                : linha.includes('❤️')
                  ? 'font-semibold text-campo-red text-glow-red'
                  : 'text-campo-white/85'
            }`}
          >
            {linha}
          </motion.p>
        ))}
      </div>

      {/* Seção de Renovação de Contrato */}
      <AnimatePresence>
        {mostrarContrato && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="sticker-card mt-12 w-full max-w-md p-6 shadow-glow-purple"
          >
            <div className="mb-3 flex items-center justify-center gap-2 text-campo-gold">
              <FileText size={22} />
              <h3 className="font-score text-lg font-bold uppercase tracking-widest text-campo-white">
                📝 {conteudoFinal.contrato.titulo}
              </h3>
            </div>

            <AnimatePresence mode="wait">
              {!contratoRenovado ? (
                <motion.div
                  key="pergunta-contrato"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="mb-5 font-body text-campo-white/85">
                    {conteudoFinal.contrato.pergunta}
                  </p>
                  <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setContratoRenovado(true)}
                      className="rounded-full border-2 border-campo-purple bg-campo-purple px-6 py-3 font-display uppercase tracking-wider text-campo-white shadow-glow-purple"
                    >
                      {conteudoFinal.contrato.botaoSim}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setContratoRenovado(true)}
                      className="rounded-full border-2 border-campo-red bg-campo-red px-6 py-3 font-display uppercase tracking-wider text-campo-white shadow-glow-red"
                    >
                      {conteudoFinal.contrato.botaoComCerteza}
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="resposta-contrato"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex flex-col items-center gap-2"
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-campo-red"
                  >
                    <Heart size={40} fill="currentColor" />
                  </motion.div>
                  <p className="font-display text-lg text-campo-white sm:text-xl">
                    {conteudoFinal.contrato.respostaTitulo}
                  </p>
                  <div className="mt-2 flex flex-col items-center">
                    <p className="font-score text-xs font-bold uppercase tracking-[0.35em] text-campo-white/70">
                      Validade
                    </p>
                    <motion.div
                      className="relative mt-1 flex h-24 w-32 items-center justify-center"
                      animate={{ scale: [1, 1.06, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <motion.span
                        className="absolute h-16 w-28 rounded-full border border-campo-gold/30 blur-sm"
                        animate={{ rotate: 360, opacity: [0.35, 0.75, 0.35] }}
                        transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
                      />
                      <motion.span
                        className="scoreboard-text text-glow-gold font-score text-7xl font-bold leading-none text-campo-gold"
                        animate={{ textShadow: [
                          '0 0 12px rgba(251, 191, 36, 0.8)',
                          '0 0 30px rgba(251, 191, 36, 1)',
                          '0 0 12px rgba(251, 191, 36, 0.8)',
                        ] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        ∞
                      </motion.span>
                      <motion.span
                        className="absolute right-1 top-3 text-campo-gold"
                        animate={{ opacity: [0, 1, 0], scale: [0.7, 1.3, 0.7] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      >
                        <Sparkles size={16} />
                      </motion.span>
                    </motion.div>
                    <p className="font-body text-xs text-campo-white/65">
                      Sem acréscimos. Sem apito final.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {contratoRenovado && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden"
          >
            <BotaoCampo
              onClick={onVoltarInicio}
              variante="vermelho"
              icone={<RotateCcw size={20} />}
              className="px-6 py-3 text-base sm:text-lg"
            >
              Voltar ao Início
            </BotaoCampo>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
