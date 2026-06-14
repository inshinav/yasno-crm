import React from 'react'
import ReactDOM from 'react-dom/client'

// Variable-шрифты с кириллицей через @fontsource
import '@fontsource-variable/onest'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'

import './index.css'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
