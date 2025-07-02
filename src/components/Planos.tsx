import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Check, Star, Crown, Sparkles, Gem } from 'lucide-react';

interface PlanFeature {
  text: string;
  highlight?: boolean;
}

interface Plan {
  id: 'demo' | 'standard' | 'premium';
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  icon: React.ComponentType<{ className?: string }>;
  popular?: boolean;
  gradient: string;
}

const PLANS: Plan[] = [
  {
    id: 'demo',
    name: 'Demonstração',
    price: 'Grátis',
    description: 'Experimente o poder da cartomancia',
    icon: Star,
    gradient: 'from-muted to-muted-foreground',
    features: [
      { text: '1 carta de tarot por dia' },
      { text: '10 minutos de chat com a cartomante' },
      { text: 'Interpretações básicas' },
      { text: 'Acesso às energias fundamentais' }
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 'R$ 19,90/mês',
    description: 'Para quem busca orientação regular',
    icon: Sparkles,
    popular: true,
    gradient: 'from-purple-600 to-pink-600',
    features: [
      { text: '3 cartas de tarot por dia', highlight: true },
      { text: '30 minutos de chat diário', highlight: true },
      { text: 'Interpretações detalhadas' },
      { text: 'Consultas sobre amor e carreira' },
      { text: 'Histórico de leituras' },
      { text: 'Proteção energética diária' }
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'R$ 39,90/mês',
    description: 'Experiência mística completa',
    icon: Crown,
    gradient: 'from-yellow-500 to-orange-600',
    features: [
      { text: '5 cartas de tarot por dia', highlight: true },
      { text: '60 minutos de chat ilimitado', highlight: true },
      { text: 'Leituras personalizadas exclusivas' },
      { text: 'Consultas sobre todos os aspectos da vida' },
      { text: 'Análise de aura e chakras' },
      { text: 'Rituais de manifestação' },
      { text: 'Suporte prioritário 24/7' },
      { text: 'Acesso a produtos exclusivos' }
    ]
  }
];

export const Planos: React.FC = () => {
  const { state, updatePlan, setScreen } = useApp();

  const handleSelectPlan = (planId: 'demo' | 'standard' | 'premium') => {
    updatePlan(planId);
    
    // Se for um plano pago, simular processo de pagamento
    if (planId !== 'demo') {
      // Aqui seria integrado com Stripe ou outro gateway
      alert(`🌟 Plano ${PLANS.find(p => p.id === planId)?.name} ativado com sucesso! Suas novas funcionalidades já estão disponíveis.`);
    }
    
    setScreen('cards');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Fundo místico */}
      <div className="absolute inset-0 bg-gradient-ethereal">
        <div className="absolute inset-0 bg-primary/5 opacity-50"></div>
      </div>

      {/* Título */}
      <div className="text-center mb-12>
        <h1 className="text-4xl md:text-6xl font-mystical text-gradient mb-4">
          ✨ Planos Místicos
        </h1>
        <p className="text-xl text-muted-foreground font-elegant max-w-2xl">
          Escolha sua jornada espiritual e desbloqueie o poder completo do universo
        </p>
      </div>

      {/* Cards dos planos */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full relative z-10">
        {PLANS.map((plan, index) => {
          const IconComponent = plan.icon;
          const isCurrentPlan = state.currentPlan === plan.id;
          
          return (
            <Card
              key={plan.id}
              className={`relative p-8 text-center transition-all duration-500 hover:scale-105 ${
                plan.popular 
                  ? 'border-2 border-accent shadow-golden' 
                  : 'border border-border/50'
              } ${
                isCurrentPlan 
                  ? 'ring-2 ring-primary shadow-mystical' 
                  : ''
              }`}
              style={{
                background: `linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Badge popular */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-golden text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    ⭐ Mais Popular
                  </div>
                </div>
              )}

              {/* Badge plano atual */}
              {isCurrentPlan && (
                <div className="absolute -top-4 right-4">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                    Ativo
                  </div>
                </div>
              )}

              {/* Ícone do plano */}
              <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center mystical-glow`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              {/* Nome e preço */}
              <h3 className="text-2xl font-mystical text-gradient mb-2">
                {plan.name}
              </h3>
              <div className="text-3xl font-bold text-accent mb-2">
                {plan.price}
              </div>
              <p className="text-muted-foreground mb-6">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8 text-left">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className={`flex items-start gap-2 ${
                      feature.highlight ? 'text-accent font-semibold' : 'text-foreground'
                    }`}
                  >
                    <Check className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                      feature.highlight ? 'text-accent' : 'text-primary'
                    }`} />
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* Botão de ação */}
              <Button
                onClick={() => handleSelectPlan(plan.id)}
                disabled={isCurrentPlan}
                className={`w-full ${
                  plan.popular 
                    ? 'btn-golden' 
                    : plan.id === 'premium'
                    ? 'btn-mystical'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {isCurrentPlan ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Plano Ativo
                  </>
                ) : plan.id === 'demo' ? (
                  'Continuar Grátis'
                ) : (
                  'Assinar Agora'
                )}
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Garantia e informações */}
      <div className="text-center mt-12 space-y-4 relative z-10">
        <Card className="card-mystical max-w-2xl">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gem className="w-6 h-6 text-accent" />
            <span className="text-accent font-semibold">Garantia Sagrada</span>
          </div>
          <p className="text-muted-foreground">
            7 dias de garantia total. Se não sentir a energia positiva, devolvemos seu investimento.
          </p>
        </Card>

        <div className="text-sm text-muted-foreground space-y-1">
          <p>✨ Cancelamento a qualquer momento</p>
          <p>🔮 Suporte místico especializado</p>
          <p>💜 Comunidade exclusiva de almas conectadas</p>
        </div>
      </div>

      {/* Navegação */}
      <div className="flex gap-4 mt-8 relative z-10">
        <Button
          variant="outline"
          onClick={() => setScreen('cards')}
          className="border-primary/50 text-primary hover:bg-primary/10"
        >
          🔮 Voltar às Cartas
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
      <div className="absolute bottom-32 left-20 floating" style={{ animationDelay: '2s' }}>
        <Crown className="w-5 h-5 text-primary/20" />
      </div>
    </div>
  );
};