import React, { createContext, useContext, useState, useEffect } from 'react';

// Tipos para o sistema de planos
export type PlanType = 'demo' | 'standard' | 'premium';

// Interface para o contexto da aplicação
interface AppState {
  currentPlan: PlanType;
  dailyCards: number;
  maxDailyCards: number;
  chatTimeUsed: number; // em minutos
  maxChatTime: number; // em minutos
  hasSpunWheel: boolean;
  currentScreen: 'wheel' | 'cards' | 'chat' | 'plans' | 'products';
  wheelPrize: string | null;
}

interface AppContextType {
  state: AppState;
  updatePlan: (plan: PlanType) => void;
  useCard: () => boolean;
  useChatTime: (minutes: number) => void;
  setScreen: (screen: AppState['currentScreen']) => void;
  spinWheel: () => void;
  resetDaily: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Configurações dos planos
const PLAN_CONFIGS = {
  demo: { maxCards: 1, maxChatTime: 10 },
  standard: { maxCards: 3, maxChatTime: 30 },
  premium: { maxCards: 5, maxChatTime: 60 }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    currentPlan: 'demo',
    dailyCards: 0,
    maxDailyCards: 1,
    chatTimeUsed: 0,
    maxChatTime: 10,
    hasSpunWheel: false,
    currentScreen: 'wheel',
    wheelPrize: null
  });

  // Carregar estado do localStorage na inicialização
  useEffect(() => {
    const savedState = localStorage.getItem('mysticTarotState');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      // Verificar se é um novo dia e resetar contadores
      const lastReset = localStorage.getItem('lastDailyReset');
      const today = new Date().toDateString();
      
      if (lastReset !== today) {
        // Novo dia - resetar contadores diários
        setState(prev => ({
          ...parsed,
          dailyCards: 0,
          chatTimeUsed: 0,
          hasSpunWheel: false
        }));
        localStorage.setItem('lastDailyReset', today);
      } else {
        setState(parsed);
      }
    }
  }, []);

  // Salvar estado no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('mysticTarotState', JSON.stringify(state));
  }, [state]);

  const updatePlan = (plan: PlanType) => {
    const config = PLAN_CONFIGS[plan];
    setState(prev => ({
      ...prev,
      currentPlan: plan,
      maxDailyCards: config.maxCards,
      maxChatTime: config.maxChatTime
    }));
  };

  const useCard = (): boolean => {
    if (state.dailyCards >= state.maxDailyCards) {
      return false; // Não pode usar mais cartas hoje
    }
    
    setState(prev => ({
      ...prev,
      dailyCards: prev.dailyCards + 1
    }));
    return true;
  };

  const useChatTime = (minutes: number) => {
    setState(prev => ({
      ...prev,
      chatTimeUsed: Math.min(prev.chatTimeUsed + minutes, prev.maxChatTime)
    }));
  };

  const setScreen = (screen: AppState['currentScreen']) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
  };

  const spinWheel = () => {
    setState(prev => ({
      ...prev,
      hasSpunWheel: true,
      wheelPrize: 'Uma carta de tarot grátis!',
      currentScreen: 'cards'
    }));
  };

  const resetDaily = () => {
    setState(prev => ({
      ...prev,
      dailyCards: 0,
      chatTimeUsed: 0,
      hasSpunWheel: false
    }));
    localStorage.setItem('lastDailyReset', new Date().toDateString());
  };

  return (
    <AppContext.Provider value={{
      state,
      updatePlan,
      useCard,
      useChatTime,
      setScreen,
      spinWheel,
      resetDaily
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return context;
};