import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './App.css';

import { CartProvider } from './context/CartContext.jsx';
import { CurrencyProvider } from './context/CurrencyProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </CartProvider>
  </StrictMode>
);
