import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Clock, Send, Crown, Sparkles, Star } from 'lucide-react';

// Respostas da cartomante IA
const CARTOMANTE_RESPONSES = [
  "As energias ao seu redor estão se alinhando de forma muito especial... Vejo grandes transformações chegando em sua vida. ✨",
  "Os astros sussurram segredos sobre seu futuro... Há uma nova oportunidade dourada se aproximando. 🌟",
  "Sinto uma energia muito poderosa emanando de você... Seu coração está pronto para receber o amor verdadeiro. 💜",
  "As cartas me revelam que você possui um dom especial... Confie mais em sua intuição, ela nunca te enganará. 🔮",
  "Vejo cristais de proteção ao seu redor... Alguém muito importante entrará em sua vida em breve. 💎",
  "A lua cheia está potencializando suas energias... É hora de manifestar seus desejos mais profundos. 🌙",
  "Sinto presenças ancestrais te guiando... Seus anjos da guarda estão trabalhando ativamente por você. 👼",
  "As energias do amor estão muito intensas... Abra seu coração para receber as bênçãos que o universo preparou. 💖",
  "Vejo símbolos de prosperidade em sua aura... Mudanças financeiras positivas estão a caminho. 🍀",
  "Sua energia espiritual está em ascensão... Você está despertando para um nível superior de consciência. 🦋"
];

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatCartomante: React.FC = () => {
  const { state, useChatTime, setScreen } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "🔮 Bem-vinda, querida alma... Sou Madame Luna, sua guia espiritual. As energias cósmicas me dizem que você está buscando respostas... O que gostaria de saber sobre seu destino?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionTime, setSessionTime] = useState(0); // em segundos
  const [isActive, setIsActive] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Timer para contar o tempo de sessão
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && sessionTime < state.maxChatTime * 60) {
      interval = setInterval(() => {
        setSessionTime(prev => {
          const newTime = prev + 1;
          
          // A cada minuto, atualizar o contexto
          if (newTime % 60 === 0) {
            useChatTime(1);
          }
          
          // Se atingir o limite, parar o timer
          if (newTime >= state.maxChatTime * 60) {
            setIsActive(false);
          }
          
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, sessionTime, state.maxChatTime, useChatTime]);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const remainingTime = Math.max(0, (state.maxChatTime * 60) - sessionTime);
  const isTimeUp = remainingTime === 0;

  const sendMessage = () => {
    if (!inputText.trim() || isTimeUp || isTyping) return;

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: Date.now(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simular digitação da cartomante e responder
    setTimeout(() => {
      const randomResponse = CARTOMANTE_RESPONSES[Math.floor(Math.random() * CARTOMANTE_RESPONSES.length)];
      const cartomanteMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, cartomanteMessage]);
      setIsTyping(false);
    }, 2000 + Math.random() * 1000); // 2-3 segundos
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Fundo místico */}
      <div className="absolute inset-0 bg-gradient-ethereal">
        <div className="absolute inset-0 bg-primary/5 opacity-50"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-mystical text-xl text-gradient">Madame Luna</h2>
              <p className="text-sm text-muted-foreground">Cartomante Espiritual</p>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2">
            <Clock className="w-4 h-4 text-accent" />
            <span className={`font-mono ${isTimeUp ? 'text-destructive' : 'text-accent'}`}>
              {formatTime(remainingTime)}
            </span>
          </div>
        </div>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-auto p-4 relative z-10">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md p-4 rounded-2xl ${
                  message.isUser
                    ? 'bg-primary text-primary-foreground ml-12'
                    : 'bg-card/90 backdrop-blur-sm border border-border/50 mr-12'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}

          {/* Indicador de digitação */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-card/90 backdrop-blur-sm border border-border/50 p-4 rounded-2xl mr-12">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Limite de tempo atingido */}
      {isTimeUp && (
        <div className="relative z-10 p-4 bg-card/90 backdrop-blur-sm border-t border-border/50">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="card-mystical">
              <Crown className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-mystical text-gradient mb-2">
                Tempo de Sessão Esgotado
              </h3>
              <p className="text-muted-foreground mb-4">
                Desbloqueie mais tempo de conversa com nossos planos premium
              </p>
              <Button 
                onClick={() => setScreen('plans')} 
                className="btn-golden"
              >
                Upgrade para Premium
              </Button>
            </Card>
          </div>
        </div>
      )}

      {/* Input de mensagem */}
      {!isTimeUp && (
        <div className="relative z-10 p-4 bg-card/80 backdrop-blur-sm border-t border-border/50">
          <div className="max-w-4xl mx-auto flex gap-3">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua pergunta para Madame Luna..."
              className="flex-1 bg-background/50 border-border/50 focus:border-primary"
              disabled={isTyping}
              maxLength={200}
            />
            <Button
              onClick={sendMessage}
              disabled={!inputText.trim() || isTyping}
              className="btn-mystical px-6"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Navegação */}
      <div className="relative z-10 p-4 bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => setScreen('cards')}
            className="border-primary/50 text-primary hover:bg-primary/10"
          >
            🔮 Voltar às Cartas
          </Button>
          <Button
            variant="outline"
            onClick={() => setScreen('plans')}
            className="border-accent/50 text-accent hover:bg-accent/10"
          >
            ⭐ Ver Planos
          </Button>
        </div>
      </div>

      {/* Efeitos decorativos */}
      <div className="absolute top-20 left-10 floating">
        <Sparkles className="w-6 h-6 text-primary/30" />
      </div>
      <div className="absolute bottom-20 right-16 floating" style={{ animationDelay: '1s' }}>
        <Star className="w-8 h-8 text-accent/40" />
      </div>
    </div>
  );
};