import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { MaxUI } from '@maxhub/max-ui'
import '@maxhub/max-ui/dist/styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MaxUI>
        <App />
    </MaxUI>
  </StrictMode>,
)
