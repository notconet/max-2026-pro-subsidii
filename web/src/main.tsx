import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { MaxUI } from '@maxhub/max-ui'
import '@maxhub/max-ui/dist/styles.css';
import './styles/colors.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MaxUI colorScheme='light'>
        <App />
    </MaxUI>
  </StrictMode>,
)
