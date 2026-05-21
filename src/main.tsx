import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PlaygroundProvider } from './context/PlaygroundProvider'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlaygroundProvider>
      <App />
    </PlaygroundProvider>
  </StrictMode>,
)