import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface ConfeteProps {
  /** Quantidade de confetes a serem exibidos */
  quantidade?: number
}

const CORES = ['#15803D', '#166534', '#0F172A', '#DC2626', '#7C3AED', '#FBBF24', '#FFFFFF']

/**
 * Efeito de confetes caindo, usado na celebração final
 * (Tela 6 - Renovação de Contrato).
 */
export default function Confete({ quantidade = 60 }: ConfeteProps) {
  // Gera as propriedades aleatórias de cada confete uma única vez
  const confetes = useMemo(() => {
    return Array.from({ length: quantidade }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 2.5 + Math.random() * 2,
      rotate: Math.random() * 360,
      cor: CORES[Math.floor(Math.random() * CORES.length)],
      tamanho: 6 + Math.random() * 8,
    }))
  }, [quantidade])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {confetes.map((c) => (
        <motion.span
          key={c.id}
          className="absolute top-0 block rounded-sm"
          style={{
            left: `${c.left}%`,
            width: c.tamanho,
            height: c.tamanho * 0.4,
            backgroundColor: c.cor,
          }}
          initial={{ y: -40, opacity: 1, rotate: 0 }}
          animate={{
            y: '110vh',
            opacity: [1, 1, 0],
            rotate: c.rotate,
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            ease: 'easeIn',
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      ))}
    </div>
  )
}
