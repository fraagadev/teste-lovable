import React from 'react';
import { useApp } from '../contexts/AppContext';
import { RoletaInicial } from '../components/RoletaInicial';
import { CartaAnimada } from '../components/CartaAnimada';
import { ChatCartomante } from '../components/ChatCartomante';
import { Planos } from '../components/Planos';
import { OutrosProdutos } from '../components/OutrosProdutos';

const Index = () => {
  const { state } = useApp();

  // Renderizar diferentes telas baseado no estado
  switch (state.currentScreen) {
    case 'wheel':
      return <RoletaInicial />;
    case 'cards':
      return <CartaAnimada />;
    case 'chat':
      return <ChatCartomante />;
    case 'plans':
      return <Planos />;
    case 'products':
      return <OutrosProdutos />;
    default:
      return <RoletaInicial />;
  }
};

export default Index;
