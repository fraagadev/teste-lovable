import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Sparkles, Star, Gem } from 'lucide-react';

const WHEEL_SEGMENTS = [
  { label: '1 Carta Grátis', color: 'from-purple-600 to-purple-800', icon: Star },
  { label: 'Energia Positiva', color: 'from-pink-600 to-pink-800', icon: Sparkles },
  { label: '1 Carta Grátis', color: 'from-indigo-600 to-indigo-800', icon: Star },
  { label: 'Bênção Divina', color: 'from-violet-600 to-violet-800', icon: Gem },
  { label: '1 Carta Grátis', color: 'from-purple-600 to-purple-800', icon: Star },
  { label: 'Proteção Mística', color: 'from-pink-600 to-pink-800', icon: Sparkles },
  { label: '1 Carta Grátis', color: 'from-indigo-600 to-indigo-800', icon: Star },
  { label: 'Luz Interior', color: 'from-violet-600 to-violet-800', icon: Gem }
];

export const RoletaInicial: React.FC = () => {
  const { state, spinWheel } = useApp();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (state.hasSpunWheel || isSpinning) return;

    setIsSpinning(true);
    
    // Calcular rotação aleatória (múltiplo de 45° + várias voltas completas)
    const spins = Math.floor(Math.random() * 3) + 5; // 5-7 voltas completas
    const finalPosition = Math.floor(Math.random() * 8) * 45; // Uma das 8 posições
    const totalRotation = spins * 360 + finalPosition;
    
    setRotation(prev => prev + totalRotation);

    // Após a animação, mostrar o prêmio e ir para cartas
    setTimeout(() => {
      setIsSpinning(false);
      spinWheel();
    }, 3000);
  };

  if (state.hasSpunWheel) {
    return null; // Não renderizar se já girou
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Fundo com efeitos */}
      <div className="absolute inset-0 bg-gradient-ethereal">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-primary/5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent"></div>
        </div>
      </div>

      {/* Título */}
      <div className="text-center mb-8 fade-in-up">
        <h1 className="text-4xl md:text-6xl font-mystical text-gradient mb-4">
          ✨ Bem-vinda ao Mystic Tarot
        </h1>
        <p className="text-xl text-muted-foreground font-elegant">
          Gire a roda da fortuna e receba sua primeira revelação
        </p>
      </div>

      {/* Container da Roleta */}
      <div className="relative mb-8">
        {/* Indicador */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-6 h-8 bg-accent rounded-b-full shadow-golden"></div>
        </div>

        {/* Roleta */}
        <div className="relative">
          <div 
            className={`w-80 h-80 rounded-full border-8 border-accent/50 shadow-glow ${
              isSpinning ? 'spin-magical' : ''
            }`}
            style={{ 
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
            }}
          >
            {WHEEL_SEGMENTS.map((segment, index) => {
              const IconComponent = segment.icon;
              const angle = (360 / WHEEL_SEGMENTS.length) * index;
              
              return (
                <div
                  key={index}
                  className={`absolute inset-0 rounded-full overflow-hidden bg-gradient-to-r ${segment.color}`}
                  style={{
                    transform: `rotate(${angle}deg)`,
                    clipPath: `polygon(50% 50%, 50% 0%, 85% 15%, 85% 85%)`
                  }}
                >
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div className="flex flex-col items-center text-white -mt-8">
                      <IconComponent className="w-6 h-6 mb-1 mystical-glow" />
                      <span className="text-xs font-semibold text-center">
                        {segment.label.split(' ').map((word, i) => (
                          <div key={i}>{word}</div>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Centro da roleta */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-golden rounded-full shadow-golden flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-accent-foreground mystical-glow" />
            </div>
          </div>
        </div>
      </div>

      {/* Botão de girar */}
      <Button
        onClick={handleSpin}
        disabled={isSpinning}
        className="btn-mystical text-lg px-12 py-4"
      >
        {isSpinning ? (
          <>
            <Sparkles className="w-5 h-5 mr-2 animate-spin" />
            Girando...
          </>
        ) : (
          <>
            <Star className="w-5 h-5 mr-2" />
            Girar a Roda Mística
          </>
        )}
      </Button>

      {/* Textos decorativos */}
      <div className="text-center mt-8 opacity-70">
        <p className="text-sm text-muted-foreground">
          Sua jornada espiritual começa aqui...
        </p>
      </div>

      {/* Efeitos decorativos flutuantes */}
      <div className="absolute top-20 left-10 floating">
        <Sparkles className="w-6 h-6 text-primary/30" />
      </div>
      <div className="absolute top-40 right-16 floating" style={{ animationDelay: '1s' }}>
        <Star className="w-8 h-8 text-accent/40" />
      </div>
      <div className="absolute bottom-32 left-20 floating" style={{ animationDelay: '2s' }}>
        <Gem className="w-5 h-5 text-primary/20" />
      </div>
    </div>
  );
};