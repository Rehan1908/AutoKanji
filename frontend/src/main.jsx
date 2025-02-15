import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import GettingStartedPage from './components/GettingStartedPage.jsx'
import { Routes, Route } from 'react-router-dom'
import FormPage from './components/Formpage.jsx'
import { CategoryProvider } from './components/CategoryContext.jsx'

createRoot(document.getElementById('root')).render(
    <CategoryProvider>
    <BrowserRouter>
    <Routes>
    <Route path="/kanjidisplay" element={<App />} />
    <Route path="/" element={<GettingStartedPage />} />
    <Route path="/home" element={<FormPage />} />
    </Routes>
    </BrowserRouter>
    </CategoryProvider>
)
