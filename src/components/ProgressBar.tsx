import { motion } from 'framer-motion'

interface ProgressBarProps {
  /** Etapa atual (1-indexado) */
  atual: number
  /** Total de etapas */
  total: number
  /** Quantidade de perguntas já respondidas */
  respondidas?: number
}

/**
 * Barra de progresso usada no Quiz (Tela 3).
 * Mostra visualmente quantas perguntas já foram respondidas.
 */
export default function ProgressBar({ atual, total, respondidas = atual }: ProgressBarProps) {
  const progresso = Math.min(total, Math.max(0, respondidas))
  const porcentagem = Math.min(100, Math.round((progresso / total) * 100))

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="font-score text-sm font-semibold tracking-widest text-campo-white/70 uppercase">
          Pergunta {atual} de {total}
        </span>
        <span className="font-score text-sm font-bold text-campo-gold">{porcentagem}%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full border border-campo-gold/40 bg-campo-black/70">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-campo-gold via-campo-red to-campo-purple shadow-glow-gold"
          initial={{ width: 0 }}
          animate={{ width: `${porcentagem}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
