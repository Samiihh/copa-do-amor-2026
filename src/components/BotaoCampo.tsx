import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BotaoCampoProps {
  children: ReactNode
  onClick?: () => void
  /** Variante visual: 'roxo' (padrão) ou 'vermelho' */
  variante?: 'roxo' | 'vermelho'
  icone?: ReactNode
  className?: string
}

/**
 * Botão principal estilizado da aplicação, com efeito de "brilho" (glow)
 * e leve animação ao passar o mouse / tocar.
 */
export default function BotaoCampo({
  children,
  onClick,
  variante = 'roxo',
  icone,
  className = '',
}: BotaoCampoProps) {
  const cores =
    variante === 'roxo'
      ? 'bg-campo-purple hover:bg-campo-purple/90 shadow-glow-purple border-campo-purple'
      : 'bg-campo-red hover:bg-campo-red/90 shadow-glow-red border-campo-red'

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      className={`group relative flex items-center justify-center gap-2 rounded-full border-2 px-8 py-4
        font-display text-lg sm:text-xl uppercase tracking-wider text-campo-white
        transition-colors duration-300 ${cores} ${className}`}
    >
      <span>{children}</span>
      {icone && (
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {icone}
        </motion.span>
      )}
    </motion.button>
  )
}
