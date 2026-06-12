import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Laugh, HeartHandshake, Heart, ArrowRight } from 'lucide-react'
import BotaoCampo from './BotaoCampo'
import { estatisticasPartida, conteudoEstatisticas } from '../data/content'
import type { EstatisticaPartida } from '../types'

interface ScreenStatsProps {
  onAvancar: () => void
}

// Mapeamento de ícones para cada tipo de estatística
const ICONES: Record<EstatisticaPartida['icone'], JSX.Element> = {
  gols: <Target size={28} />,
  risadas: <Laugh size={28} />,
  abracos: <HeartHandshake size={28} />,
  escolhas: <Heart size={28} />,
}

interface CardEstatisticaProps {
  estatistica: EstatisticaPartida
  delay: number
}

/**
 * Card individual com animação de contagem progressiva,
 * finalizando no texto descritivo (ex: "999+", "Incontáveis").
 */
function CardEstatistica({ estatistica, delay }: CardEstatisticaProps) {
  const [valorExibido, setValorExibido] = useState(0)
  const [finalizado, setFinalizado] = useState(false)

  useEffect(() => {
    const tempoInicio = setTimeout(() => {
      const duracaoMs = 1400
      const passos = 30
      const incremento = estatistica.valor / passos
      let atual = 0
      let contador = 0

      const intervalo = setInterval(() => {
        contador += 1
        atual += incremento
        if (contador >= passos) {
          setValorExibido(estatistica.valor)
          setFinalizado(true)
          clearInterval(intervalo)
        } else {
          setValorExibido(Math.round(atual))
        }
      }, duracaoMs / passos)

      return () => clearInterval(intervalo)
    }, delay)

    return () => clearTimeout(tempoInicio)
  }, [estatistica.valor, delay])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="sticker-card flex flex-col items-center gap-3 p-6 text-center shadow-glow-purple"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-campo-purple/15 text-campo-gold">
        {ICONES[estatistica.icone]}
      </div>
      <p className="font-score text-3xl sm:text-4xl font-bold text-campo-white">
        {finalizado ? estatistica.valorTexto ?? estatistica.valor : valorExibido}
      </p>
      <p className="font-body text-sm text-campo-white/70">{estatistica.rotulo}</p>
    </motion.div>
  )
}

/**
 * TELA 5 - ESTATÍSTICAS DA PARTIDA
 * Exibe cards animados com "números" simbólicos do relacionamento.
 */
export default function ScreenStats({ onAvancar }: ScreenStatsProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6">
      {/* Cabeçalho */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <span className="font-score text-xs uppercase tracking-[0.4em] text-campo-gold">
          Placar do Amor
        </span>
        <h2 className="scoreboard-text text-glow-purple mt-2 text-3xl sm:text-5xl font-display text-campo-white">
          {conteudoEstatisticas.tituloSecao}
        </h2>
        <p className="mt-3 font-body text-sm sm:text-base text-campo-white/70">
          {conteudoEstatisticas.subtitulo}
        </p>
      </motion.div>

      {/* Grid de estatísticas */}
      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
        {estatisticasPartida.map((estatistica, index) => (
          <CardEstatistica key={estatistica.id} estatistica={estatistica} delay={index * 300} />
        ))}
      </div>

      {/* Botão para avançar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="mt-12"
      >
        <BotaoCampo onClick={onAvancar} variante="vermelho" icone={<ArrowRight size={22} />}>
          Ir para a Final
        </BotaoCampo>
      </motion.div>
    </div>
  )
}
