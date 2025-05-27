import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App' // ✅ Import your App component

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App /> {/* ✅ Use App instead of the inline div */}
  </React.StrictMode>,
)