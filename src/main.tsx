import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Editor from './pages/Editor'
import Preview from './components/Preview'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Editor />} />
          <Route path="preview" element={<Preview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
) 