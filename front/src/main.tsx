import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { DURATION } from './config';
import App from './App.tsx';

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster
        duration={DURATION}
        theme='dark'
        position='bottom-center'
        richColors
      />

      <App />
    </QueryClientProvider>
  </StrictMode>
);
