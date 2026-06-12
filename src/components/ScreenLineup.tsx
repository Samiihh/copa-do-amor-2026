import { motion } from 'framer-motion'
import { Heart, Laugh, Compass, Users, Award, ArrowRight, Clock } from 'lucide-react'
import BotaoCampo from './BotaoCampo'
import { conteudoEscalacao } from '../data/content'

interface ScreenLineupProps {
  onAvancar: () => void
}

// Ícones associados a cada "título conquistado"
const ICONES_TITULOS: Record<string, JSX.Element> = {
  Risadas: <Laugh size={18} />,
  Companheirismo: <Users size={18} />,
  Aventuras: <Compass size={18} />,
  Amor: <Heart size={18} />,
}

/**
 * TELA 2 - ESCALAÇÃO OFICIAL
 * Apresenta o "elenco" do casal em formato de card de jogador,
 * com foto em destaque, funções, tempo de relacionamento
 * e títulos conquistados.
 */
export default function ScreenLineup({ onAvancar }: ScreenLineupProps) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16 sm:px-6">
      {/* Cabeçalho da seção */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <span className="font-score text-xs uppercase tracking-[0.4em] text-campo-gold">
          Dupla em Campo
        </span>
        <h2 className="scoreboard-text text-glow-purple mt-2 text-3xl sm:text-5xl font-display text-campo-white">
          {conteudoEscalacao.tituloSecao}
        </h2>
      </motion.div>

      <div className="flex w-full max-w-4xl flex-col items-center gap-8 md:flex-row md:justify-center">
      {/* Card principal do casal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="sticker-card w-full max-w-md overflow-hidden shadow-glow-purple"
      >
        {/* Foto do casal */}
        <div className="relative grid grid-cols-2 gap-2 border-b-2 border-campo-purple/40 bg-campo-black/35 p-3">
          <img
            src={conteudoEscalacao.fotoSamy}
            alt="Foto do casal em destaque"
            className="h-full w-full object-cover"
            onError={(e) => {
              // Placeholder visual caso a imagem ainda não tenha sido adicionada
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
          <img
            src={conteudoEscalacao.fotoThi}
            alt="Foto do casal em destaque"
            className="h-full w-full object-cover"
            onError={(e) => {
              // Placeholder visual caso a imagem ainda não tenha sido adicionada
              ;(e.target as HTMLImageElement).style.display = 'none'
            }}
          />
          {/* Faixa "TITULAR" estilo álbum de figurinhas */}
          <div className="absolute left-0 top-4 -rotate-3 bg-campo-red px-4 py-1 font-score text-xs font-bold uppercase tracking-widest text-campo-white shadow-glow-red">
            Titulares
          </div>
        </div>

        <div className="p-6">
          {/* Funções dos jogadores */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-campo-purple/40 bg-campo-green-dark/40 p-4 text-center">
              <p className="font-score text-xs uppercase tracking-widest text-campo-gold">
                {conteudoEscalacao.tecnica.funcao}
              </p>
              <p className="mt-1 font-display text-xl text-campo-white">
                {conteudoEscalacao.tecnica.nome}
              </p>
            </div>
            <div className="rounded-xl border border-campo-red/40 bg-campo-green-dark/40 p-4 text-center">
              <p className="font-score text-xs uppercase tracking-widest text-campo-gold">
                {conteudoEscalacao.camisa10.funcao}
              </p>
              <p className="mt-1 font-display text-xl text-campo-white">
                {conteudoEscalacao.camisa10.nome}
              </p>
            </div>
          </div>

          {/* Tempo de relacionamento */}
          <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-campo-gold/30 bg-campo-black/45 p-3 text-center">
            <Clock size={18} className="text-campo-gold" />
            <p className="font-body text-sm text-campo-white/85">
              Tempo de relacionamento:{' '}
              <span className="font-semibold text-campo-white">
                {conteudoEscalacao.tempoRelacionamento}
              </span>
            </p>
          </div>

          {/* Títulos conquistados */}
          <div className="mt-5">
            <div className="mb-3 flex items-center gap-2">
              <Award size={18} className="text-campo-gold" />
              <p className="font-score text-sm font-semibold uppercase tracking-widest text-campo-white/80">
                Títulos Conquistados
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {conteudoEscalacao.titulosConquistados.map((titulo, index) => (
                <motion.span
                  key={titulo}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.12 }}
                  className="flex items-center gap-1.5 rounded-full border border-campo-gold/40 bg-campo-gold/10 px-3 py-1.5 font-body text-sm text-campo-gold"
                >
                  {ICONES_TITULOS[titulo] ?? <Award size={16} />}
                  {titulo}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Botão para avançar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="w-full max-w-xs md:w-64"
      >
        <div className="rounded-2xl border border-campo-gold/30 bg-campo-black/55 p-5 text-center shadow-glow-gold backdrop-blur-sm">
          <p className="mb-4 font-score text-xs font-bold uppercase tracking-[0.3em] text-campo-gold">
            Próximo lance
          </p>
          <BotaoCampo
            onClick={onAvancar}
            variante="vermelho"
            icone={<ArrowRight size={22} />}
            className="w-full px-5"
          >
            {conteudoEscalacao.textoBotao}
          </BotaoCampo>
        </div>
      </motion.div>
      </div>
    </div>
  )
}
