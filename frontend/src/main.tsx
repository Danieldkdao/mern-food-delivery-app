import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { ToastContainer } from 'react-toastify'
import '../node_modules/react-toastify/dist/ReactToastify.css'
import { AppContextProvider } from './context/AppContext.tsx'
import { CartContextProvider } from './context/CartContext.tsx'

createRoot(document.getElementById('root')!).render(
    <CartContextProvider>
        <AppContextProvider>
            <BrowserRouter>
                <StrictMode>
                    <App />
                </StrictMode>
                <ToastContainer
                    newestOnTop
                    position="top-right"
                />
            </BrowserRouter>
        </AppContextProvider>
    </CartContextProvider>
    

)
