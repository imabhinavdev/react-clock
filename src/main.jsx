import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ThemeContext from './Context/ThemeContext.jsx'
import ThemeState from './Context/ThemeState.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeState>
      <App /></ThemeState>
  </React.StrictMode>,
)
