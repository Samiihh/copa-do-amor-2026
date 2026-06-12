import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScanLine, ArrowRight, CheckCircle } from 'lucide-react'
import BotaoCampo from './BotaoCampo'
import { conteudoVAR } from '../data/content'

interface ScreenVARProps {
  onAvancar: () => void
}

/**
 * TELA 4 - VAR DO AMOR
 * Simula uma revisão de lance (VAR) usando uma foto antiga do casal.
 * A "resposta" do VAR (texto sob a foto) pode ser editada livremente
 * em `src/data/content.ts` -> conteudoVAR.respostaEditavel
 */
export default function ScreenVAR({ onAvancar }: ScreenVARProps) {
  const [revelado, setRevelado] = useState(false)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6">
      {/* Cabeçalho */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <span className="font-score text-xs uppercase tracking-[0.4em] text-campo-red">
          Revisão de Lance
        </span>
        <h2 className="scoreboard-text text-glow-red mt-2 text-3xl sm:text-5xl font-display text-campo-white">
          {conteudoVAR.tituloSecao}
        </h2>
      </motion.div>

      <div className="flex w-full max-w-4xl flex-col items-center gap-8 md:flex-row md:justify-center">
      {/* Quadro estilo "tela de replay" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Cantos vermelhos estilo moldura de revisão */}
        <div className="pointer-events-none absolute -left-2 -top-2 h-8 w-8 border-l-4 border-t-4 border-campo-red" />
        <div className="pointer-events-none absolute -right-2 -top-2 h-8 w-8 border-r-4 border-t-4 border-campo-red" />
        <div className="pointer-events-none absolute -bottom-2 -left-2 h-8 w-8 border-b-4 border-l-4 border-campo-red" />
        <div className="pointer-events-none absolute -bottom-2 -right-2 h-8 w-8 border-b-4 border-r-4 border-campo-red" />

        <div className="sticker-card overflow-hidden shadow-glow-red">
          {/* Foto antiga */}
          <div className="relative flex h-[24rem] w-full items-center justify-center overflow-hidden border-b-2 border-campo-red/40 bg-campo-black/60 sm:h-[28rem]">
            <img
              src={revelado ? conteudoVAR.fotoAntiga : conteudoVAR.fotoAnalise}
              alt="Foto antiga do casal sendo revisada pelo VAR"
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                ;(e.target as HTMLImageElement).style.display = 'none'
              }}
            />

            {/* Linha de varredura animada (efeito "analisando") */}
            {!revelado && (
              <motion.div
                className="absolute left-0 top-0 h-1 w-full bg-campo-red/80 shadow-glow-red"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
              />
            )}

            {/* Selo "VAR" */}
            <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md bg-campo-red px-3 py-1 font-score text-xs font-bold uppercase tracking-widest text-campo-white shadow-glow-red">
              <ScanLine size={14} />
              VAR
            </div>
          </div>

          {/* Texto da pergunta / resposta */}
          <div className="p-6 text-center">
            <p className="whitespace-pre-line font-body text-base sm:text-lg text-campo-white/90">
              {revelado ? conteudoVAR.perguntaRevelada : conteudoVAR.pergunta}
            </p>

            <AnimatePresence mode="wait">
              {!revelado ? (
                <motion.div
                  key="botao-revelar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-5"
                >
                  <BotaoCampo
                    onClick={() => setRevelado(true)}
                    variante="vermelho"
                    icone={<ScanLine size={20} />}
                  >
                    Confirmar Lance
                  </BotaoCampo>
                </motion.div>
              ) : (
                <motion.div
                  key="resposta-var"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-5 rounded-xl border border-campo-grass/40 bg-campo-grass/10 p-4"
                >
                  <div className="mb-2 flex items-center justify-center gap-2 font-score text-sm font-bold uppercase tracking-widest text-campo-grass">
                    <CheckCircle size={18} />
                    Lance Confirmado
                  </div>
                  <p className="font-body text-sm sm:text-base text-campo-white/90">
                    {conteudoVAR.respostaEditavel}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Botão para avançar (aparece após revelar) */}
      <AnimatePresence>
        {revelado && (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-xs md:w-64"
          >
            <div className="rounded-2xl border border-campo-gold/30 bg-campo-black/55 p-5 text-center shadow-glow-gold backdrop-blur-sm">
              <p className="mb-4 font-score text-xs font-bold uppercase tracking-[0.3em] text-campo-gold">
                Revisão concluída
              </p>
              <BotaoCampo onClick={onAvancar} icone={<ArrowRight size={22} />} className="w-full px-5">
                Continuar Partida
              </BotaoCampo>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  )
}
