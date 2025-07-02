import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Sparkles, Star, Crown, Lock } from 'lucide-react';

// Dados das cartas de tarot
const TAROT_CARDS = [
  {
    name: 'O Louco',
    meaning: 'Novos começos, aventura, potencial ilimitado',
    description: 'O Louco representa o início de uma jornada espiritual. É o momento de confiar no universo e dar o primeiro passo em direção aos seus sonhos.',
    image: '🃏',
    color: 'from-violet-600 to-purple-700'
  },
  {
    name: 'A Imperatriz',
    meaning: 'Feminilidade, criatividade, abundância',
    description: 'A Imperatriz simboliza a energia feminina criativa. É um momento de fertilidade em todos os aspectos da vida, seja material ou espiritual.',
    image: '👑',
    color: 'from-pink-600 to-rose-700'
  },
  {
    name: 'A Estrela',
    meaning: 'Esperança, inspiração, orientação espiritual',
    description: 'A Estrela é um sinal de esperança e renovação. Ela indica que você está no caminho certo e que o universo está conspirando a seu favor.',
    image: '⭐',
    color: 'from-blue-600 to-indigo-700'
  },
  {
    name: 'O Sol',
    meaning: 'Alegria, sucesso, vitalidade',
    description: 'O Sol representa alegria pura e sucesso. É um período de iluminação onde tudo se torna claro e positivo em sua vida.',
    image: '☀️',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    name: 'A Lua',
    meaning: 'Intuição, ilusão, ciclos',
    description: 'A Lua representa o mundo dos sonhos e da intuição. Confie em seus instintos e esteja atenta aos sinais que o universo está enviando.',
    image: '🌙',
    color: 'from-indigo-600 to-purple-700'
  }
];

export const CartaAnimada: React.FC = () => {
  const { state, useCard, setScreen } = useApp();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [revealedCard, setRevealedCard] = useState<typeof TAROT_CARDS[0] | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const handleCardClick = (index: number) => {
    if (selectedCard !== null || isRevealing) return;
    
    // Verificar se pode usar uma carta
    if (!useCard()) {
      // Não pode usar mais cartas hoje
      return;
    }

    setSelectedCard(index);
    setIsRevealing(true);

    // Selecionar carta aleatória
    const randomCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    
    setTimeout(() => {
      setRevealedCard(randomCard);
      setIsRevealing(false);
    }, 800);
  };

  const canUseCard = state.dailyCards < state.maxDailyCards;
  const remainingCards = state.maxDailyCards - state.dailyCards;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Fundo místico */}
      <div className="absolute inset-0 bg-gradient-ethereal">
        <div className="absolute inset-0 bg-primary/5 opacity-50"></div>
      </div>

      {/* Título */}
      <div className="text-center mb-8 fade-in-up relative z-10">
        <h1 className="text-3xl md:text-5xl font-mystical text-gradient mb-4">
          🔮 Revelação das Cartas
        </h1>
        <p className="text-lg text-muted-foreground font-elegant">
          Escolha uma carta e descubra sua mensagem espiritual
        </p>
        
        {/* Contador de cartas */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <Star className="w-5 h-5 text-accent" />
          <span className="text-accent font-semibold">
            {remainingCards} carta{remainingCards !== 1 ? 's' : ''} restante{remainingCards !== 1 ? 's' : ''} hoje
          </span>
        </div>
      </div>

      {/* Cartas */}
      <div className="flex gap-6 mb-8 relative z-10">
        {[0, 1, 2].map((index) => (
          <div key={index} className="relative">
            <Card
              className={`w-32 h-48 md:w-40 md:h-60 cursor-pointer transition-all duration-500 ${
                selectedCard === index
                  ? 'card-flip bg-gradient-to-br ' + (revealedCard?.color || 'from-purple-600 to-indigo-700')
                  : canUseCard
                  ? 'hover:scale-105 hover:shadow-mystical bg-gradient-to-br from-muted to-muted-foreground'
                  : 'opacity-50 cursor-not-allowed bg-muted/50'
              } ${isRevealing && selectedCard === index ? 'mystical-glow' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              <div className="w-full h-full flex items-center justify-center relative overflow-hidden rounded-lg">
                {selectedCard === index && revealedCard ? (
                  // Carta revelada
                  <div className="text-center text-white p-4 fade-in-up">
                    <div className="text-4xl mb-2">{revealedCard.image}</div>
                    <h3 className="font-mystical text-lg mb-2">{revealedCard.name}</h3>
                    <p className="text-xs opacity-90">{revealedCard.meaning}</p>
                  </div>
                ) : (
                  // Carta virada para baixo
                  <div className="flex flex-col items-center text-foreground">
                    {canUseCard ? (
                      <>
                        <Sparkles className="w-8 h-8 mb-2 mystical-glow" />
                        <span className="text-sm font-elegant">Toque para</span>
                        <span className="text-sm font-elegant">revelar</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-8 h-8 mb-2 opacity-50" />
                        <span className="text-xs text-center opacity-50">Limite diário atingido</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Resultado da carta */}
      {revealedCard && (
        <div className="max-w-md text-center space-y-4 relative z-10 fade-in-up">
          <Card className="card-mystical">
            <h3 className="text-2xl font-mystical text-gradient mb-2">
              {revealedCard.name}
            </h3>
            <p className="text-accent font-semibold mb-3">
              {revealedCard.meaning}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {revealedCard.description}
            </p>
          </Card>
        </div>
      )}

      {/* Call to Action para upgrade */}
      {!canUseCard && (
        <div className="text-center space-y-4 relative z-10 fade-in-up">
          <Card className="card-mystical max-w-md">
            <Crown className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-mystical text-gradient mb-2">
              Limite Diário Atingido
            </h3>
            <p className="text-muted-foreground mb-4">
              Desbloqueie mais cartas diárias com nossos planos premium
            </p>
            <Button 
              onClick={() => setScreen('plans')} 
              className="btn-golden w-full"
            >
              Ver Planos Premium
            </Button>
          </Card>
        </div>
      )}

      {/* Navegação */}
      <div className="flex gap-4 mt-8 relative z-10">
        <Button
          variant="outline"
          onClick={() => setScreen('chat')}
          className="border-primary/50 text-primary hover:bg-primary/10"
        >
          💬 Chat com Cartomante
        </Button>
        <Button
          variant="outline"
          onClick={() => setScreen('products')}
          className="border-accent/50 text-accent hover:bg-accent/10"
        >
          ✨ Outros Produtos
        </Button>
      </div>

      {/* Efeitos decorativos */}
      <div className="absolute top-20 left-10 floating">
        <Sparkles className="w-6 h-6 text-primary/30" />
      </div>
      <div className="absolute top-40 right-16 floating" style={{ animationDelay: '1s' }}>
        <Star className="w-8 h-8 text-accent/40" />
      </div>
    </div>
  );
};