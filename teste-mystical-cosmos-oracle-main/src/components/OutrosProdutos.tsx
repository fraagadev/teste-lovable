import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Star, Sparkles, Crown, Gem } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  features: string[];
  image: string;
  color: string;
  popular?: boolean;
  exclusive?: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: 'past-life',
    name: 'Past Life Reading',
    description: 'Descubra suas vidas passadas e como elas influenciam seu presente',
    price: 'R$ 47,90',
    originalPrice: 'R$ 97,90',
    image: '🔮',
    color: 'from-purple-600 to-indigo-700',
    popular: true,
    features: [
      'Análise completa de 3 vidas passadas',
      'Conexões com sua vida atual',
      'Rituais de cura karmica',
      'PDF exclusivo com sua jornada'
    ]
  },
  {
    id: 'aura-cleansing',
    name: 'Limpeza de Aura',
    description: 'Remova energias negativas e atraia prosperidade para sua vida',
    price: 'R$ 29,90',
    image: '✨',
    color: 'from-pink-600 to-rose-700',
    features: [
      'Análise completa da sua aura',
      'Ritual personalizado de limpeza',
      'Proteções energéticas diárias',
      'Guia de manutenção espiritual'
    ]
  },
  {
    id: 'love-spell',
    name: 'Ritual do Amor Verdadeiro',
    description: 'Atraia o amor da sua vida com poderosos rituais ancestrais',
    price: 'R$ 67,90',
    originalPrice: 'R$ 127,90',
    image: '💖',
    color: 'from-red-500 to-pink-600',
    exclusive: true,
    features: [
      'Ritual personalizado para seu signo',
      'Kit de cristais do amor',
      'Orações sagradas exclusivas',
      'Acompanhamento por 30 dias'
    ]
  },
  {
    id: 'prosperity-mandala',
    name: 'Mandala da Prosperidade',
    description: 'Ative a abundância em todas as áreas da sua vida',
    price: 'R$ 39,90',
    image: '🌟',
    color: 'from-yellow-500 to-orange-600',
    features: [
      'Mandala personalizada com seu nome',
      'Ritual de ativação incluso',
      'Afirmações poderosas diárias',
      'Arte digital em alta resolução'
    ]
  },
  {
    id: 'crystal-therapy',
    name: 'Terapia com Cristais',
    description: 'Harmonize seus chakras com a energia dos cristais sagrados',
    price: 'R$ 87,90',
    image: '💎',
    color: 'from-emerald-600 to-teal-700',
    features: [
      'Análise completa dos 7 chakras',
      'Prescrição personalizada de cristais',
      'Meditações guiadas exclusivas',
      'Certificado de terapia energética'
    ]
  },
  {
    id: 'divine-protection',
    name: 'Proteção Divina Suprema',
    description: 'Blindagem espiritual contra todas as energias negativas',
    price: 'R$ 97,90',
    originalPrice: 'R$ 197,90',
    image: '🛡️',
    color: 'from-violet-600 to-purple-800',
    exclusive: true,
    features: [
      'Ritual de proteção com 21 anjos',
      'Talismã sagrado personalizado',
      'Orações de proteção diárias',
      'Renovação energética mensal'
    ]
  }
];

export const OutrosProdutos: React.FC = () => {
  const { setScreen } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handlePurchase = (product: Product) => {
    // Simular compra
    alert(`✨ Obrigada por adquirir "${product.name}"! \n\n💜 Você receberá todas as informações por email em até 24h. \n\n🔮 Prepare-se para uma transformação espiritual incrível!`);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen p-4 relative">
      {/* Fundo místico */}
      <div className="absolute inset-0 bg-gradient-ethereal">
        <div className="absolute inset-0 bg-primary/5 opacity-50"></div>
      </div>

      {/* Título */}
      <div className="text-center mb-12 fade-in-up relative z-10">
        <h1 className="text-4xl md:text-6xl font-mystical text-gradient mb-4">
          ✨ Produtos Místicos Exclusivos
        </h1>
        <p className="text-xl text-muted-foreground font-elegant max-w-2xl mx-auto">
          Transforme sua vida com nossos rituais e serviços espirituais personalizados
        </p>
      </div>

      {/* Grid de produtos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
        {PRODUCTS.map((product, index) => (
          <Card
            key={product.id}
            className={`relative p-6 cursor-pointer transition-all duration-500 hover:scale-105 border border-border/50 ${
              product.popular ? 'border-2 border-accent shadow-golden' : ''
            } ${product.exclusive ? 'border-2 border-primary shadow-mystical' : ''}`}
            style={{
              background: `linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--muted)) 100%)`,
              animationDelay: `${index * 0.1}s`
            }}
            onClick={() => handleProductClick(product)}
          >
            {/* Badges */}
            <div className="absolute -top-3 left-4 flex gap-2">
              {product.popular && (
                <div className="bg-gradient-golden text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  🔥 Popular
                </div>
              )}
              {product.exclusive && (
                <div className="bg-gradient-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                  👑 Exclusivo
                </div>
              )}
            </div>

            {/* Ícone do produto */}
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${product.color} flex items-center justify-center text-2xl mystical-glow`}>
              {product.image}
            </div>

            {/* Nome e descrição */}
            <h3 className="text-xl font-mystical text-gradient mb-2 text-center">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              {product.description}
            </p>

            {/* Preço */}
            <div className="text-center mb-4">
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through mr-2">
                  {product.originalPrice}
                </span>
              )}
              <span className="text-2xl font-bold text-accent">
                {product.price}
              </span>
            </div>

            {/* Features resumidas */}
            <div className="text-xs text-muted-foreground text-center mb-4">
              {product.features.length} benefícios inclusos
            </div>

            <Button className="w-full btn-mystical text-sm">
              Ver Detalhes ✨
            </Button>
          </Card>
        ))}
      </div>

      {/* Modal de produto */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-auto bg-card border border-border shadow-mystical">
            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-6">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${selectedProduct.color} flex items-center justify-center text-3xl mystical-glow`}>
                  {selectedProduct.image}
                </div>
                <h2 className="text-3xl font-mystical text-gradient mb-2">
                  {selectedProduct.name}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {selectedProduct.description}
                </p>
                
                {/* Preço */}
                <div className="mb-6">
                  {selectedProduct.originalPrice && (
                    <div className="text-sm text-muted-foreground line-through mb-1">
                      De {selectedProduct.originalPrice}
                    </div>
                  )}
                  <div className="text-4xl font-bold text-accent">
                    {selectedProduct.price}
                  </div>
                  {selectedProduct.originalPrice && (
                    <div className="text-sm text-green-400 mt-1">
                      Economize {parseInt(selectedProduct.originalPrice.replace(/\D/g, '')) - parseInt(selectedProduct.price.replace(/\D/g, ''))}% hoje!
                    </div>
                  )}
                </div>
              </div>

              {/* Features detalhadas */}
              <div className="mb-8">
                <h3 className="text-xl font-mystical text-gradient mb-4 text-center">
                  ✨ O que está incluso:
                </h3>
                <ul className="space-y-3">
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Garantia */}
              <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Gem className="w-5 h-5 text-accent" />
                  <span className="font-semibold text-accent">Garantia Sagrada</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  7 dias de garantia total. Se não sentir a transformação espiritual, devolvemos seu investimento.
                </p>
              </Card>

              {/* Botões */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 border-muted-foreground/30"
                >
                  Fechar
                </Button>
                <Button
                  onClick={() => handlePurchase(selectedProduct)}
                  className="flex-1 btn-golden"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Adquirir Agora
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Navegação */}
      <div className="flex justify-center gap-4 mt-12 relative z-10">
        <Button
          variant="outline"
          onClick={() => setScreen('cards')}
          className="border-primary/50 text-primary hover:bg-primary/10"
        >
          🔮 Voltar às Cartas
        </Button>
        <Button
          variant="outline"
          onClick={() => setScreen('chat')}
          className="border-accent/50 text-accent hover:bg-accent/10"
        >
          💬 Chat Cartomante
        </Button>
        <Button
          variant="outline"
          onClick={() => setScreen('plans')}
          className="border-primary/50 text-primary hover:bg-primary/10"
        >
          ⭐ Ver Planos
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
        <Gem className="w-5 h-5 text-primary/20" />
      </div>
    </div>
  );
};