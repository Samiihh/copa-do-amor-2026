import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { figurinhasAlbum } from '../data/figurinhas'

/**
 * ===================================================================
 * FUNDO DE FIGURINHAS - "Copa do Amor 2026"
 * ===================================================================
 * Efeito ambiente exibido por trás do conteúdo principal:
 * uma bolinha de futebol "voa" até um canto da tela, bate
 * (flash de impacto) e then revela uma figurinha do álbum
 * (foto + legenda), que fica colada por alguns segundos antes
 * de sair e dar lugar à próxima.
 *
 * As figurinhas (fotos + legendas) ficam em `src/data/figurinhas.ts`.
 * ===================================================================
 */

// Fases do ciclo de animação de cada figurinha
type Fase = 'voando' | 'impacto' | 'revelada' | 'saindo' | 'pausa'

// Duração (ms) de cada fase
const DURACOES: Record<Fase, number> = {
  voando: 650,
  impacto: 220,
  revelada: 2800,
  saindo: 300,
  pausa: 350,
}

// Posições possíveis na tela (cantos e laterais, fora do centro)
const POSICOES = [
  'top-[6%] left-[4%]',
  'top-[8%] right-[4%]',
  'bottom-[8%] left-[5%]',
  'bottom-[6%] right-[5%]',
  'top-[42%] left-[2%]',
  'top-[46%] right-[2%]',
]

export default function FundoFigurinhas() {
  const [fase, setFase] = useState<Fase>('voando')
  const [indiceFigurinha, setIndiceFigurinha] = useState(0)
  const [indicePosicao, setIndicePosicao] = useState(0)

  const figurinha = figurinhasAlbum[indiceFigurinha % figurinhasAlbum.length]

  // Controla a transição automática entre as fases do ciclo
  useEffect(() => {
    const timer = setTimeout(() => {
      switch (fase) {
        case 'voando':
          setFase('impacto')
          break
        case 'impacto':
          setFase('revelada')
          break
        case 'revelada':
          setFase('saindo')
          break
        case 'saindo':
          setFase('pausa')
          break
        case 'pausa':
          // Sorteia a próxima figurinha e a próxima posição na tela
          setIndiceFigurinha((i) => (i + 1) % figurinhasAlbum.length)
          setIndicePosicao((p) => {
            let novo = Math.floor(Math.random() * POSICOES.length)
            if (novo === p) novo = (novo + 1) % POSICOES.length
            return novo
          })
          setFase('voando')
          break
      }
    }, DURACOES[fase])

    return () => clearTimeout(timer)
  }, [fase])

  if (figurinhasAlbum.length === 0) return null

  return (
    <div
      className={`pointer-events-none fixed h-56 w-40 sm:h-72 sm:w-52 md:h-80 md:w-60 ${POSICOES[indicePosicao]}`}
    >
      <AnimatePresence mode="wait">
        {/* Bolinha de futebol voando até a posição */}
        {fase === 'voando' && (
          <motion.div
            key="bola"
            className="flex h-full w-full items-center justify-center text-7xl sm:text-8xl"
            initial={{ opacity: 0, scale: 0.3, y: 160, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 540 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURACOES.voando / 1000, ease: 'easeOut' }}
          >
            ⚽
          </motion.div>
        )}

        {/* Flash de impacto (bola "bateu" na tela) */}
        {fase === 'impacto' && (
          <motion.div
            key="flash"
            className="bola-flash absolute inset-0"
            initial={{ opacity: 1, scale: 0.2 }}
            animate={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: DURACOES.impacto / 1000, ease: 'easeOut' }}
          />
        )}

        {/* Figurinha revelada (foto + legenda) */}
        {(fase === 'revelada' || fase === 'saindo') && (
          <motion.div
            key="figurinha"
            className="figurinha-card h-full w-full"
            initial={{ opacity: 0, scale: 0.2, rotate: -18 }}
            animate={
              fase === 'revelada'
                ? { opacity: 1, scale: 1, rotate: -4 }
                : { opacity: 0, scale: 0.7, rotate: 10 }
            }
            transition={{
              duration: fase === 'revelada' ? 0.5 : DURACOES.saindo / 1000,
              type: fase === 'revelada' ? 'spring' : 'tween',
              bounce: 0.45,
            }}
          >
            <div className="figurinha-card__inner flex h-full w-full flex-col">
              <div className="relative flex-1 overflow-hidden bg-campo-green-dark/60">
                <img
                  src={figurinha.imagem}
                  alt={figurinha.legenda}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
              <p className="truncate px-2 py-1.5 text-center font-score text-xs font-semibold uppercase tracking-wide text-campo-white sm:text-sm">
                {figurinha.legenda}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
