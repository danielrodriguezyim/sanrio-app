import { StrictMode } from 'react';
import { createRoot }  from 'react-dom/client';

import './styles/global.css';
import AppRouter from './router/app-router';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('[main] Root element #root not found in index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>
);
