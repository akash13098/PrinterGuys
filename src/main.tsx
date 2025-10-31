// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

// ✅ Create Supabase client (use your actual keys here)
const supabase = createClient(
  'https://YOUR_PROJECT_URL.supabase.co',
  'YOUR_ANON_PUBLIC_KEY'
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Wrap entire app with Supabase Auth Session Provider */}
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </StrictMode>
);
