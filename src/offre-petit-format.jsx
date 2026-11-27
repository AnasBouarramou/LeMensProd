import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import OffrePetitFormat from './pages/OffrePetitFormat.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OffrePetitFormat />
  </StrictMode>,
)
