import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './globals.css'
import HomePage from './pages/HomePage'
import ToolsLayout from './layouts/ToolsLayout'
import JsonYamlPage from './pages/tools/JsonYamlPage'
import Base64Page from './pages/tools/Base64Page'
import UrlEncodePage from './pages/tools/UrlEncodePage'
import HashPage from './pages/tools/HashPage'
import UuidPage from './pages/tools/UuidPage'
import TimestampPage from './pages/tools/TimestampPage'
import JsonFormatterPage from './pages/tools/JsonFormatterPage'
import DiffPage from './pages/tools/DiffPage'
import CaseConverterPage from './pages/tools/CaseConverterPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools" element={<ToolsLayout />}>
          <Route path="json-yaml" element={<JsonYamlPage />} />
          <Route path="base64" element={<Base64Page />} />
          <Route path="url-encode" element={<UrlEncodePage />} />
          <Route path="hash" element={<HashPage />} />
          <Route path="uuid" element={<UuidPage />} />
          <Route path="timestamp" element={<TimestampPage />} />
          <Route path="json-formatter" element={<JsonFormatterPage />} />
          <Route path="diff" element={<DiffPage />} />
          <Route path="case-converter" element={<CaseConverterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
