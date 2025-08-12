import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Menu from './pages/Menu'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Login from "./components/Login"
import MobileApp from "./pages/MobileApp"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Orders from "./pages/Orders"
import { useEffect, useState } from 'react'
import api from "./utils/axios"
import { useApp } from "./context/AppContext"
import { toast } from "react-toastify"
import LoadingImg from './assets/Insider-loading.gif'

type Info = {
    id: string
    name: string
}

type Res1 = {
    success: boolean
    message: string
    newAccessToken?: string
    info: Info
}

function App() {

    const { setUserInfo, toggleIsLoggedIn, isLoggedIn } = useApp();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        async function wait() {
            await refresh();
            setLoading(false);
        }

        wait();
    }, [isLoggedIn]);

    async function refresh(){
        try {
            const response = await api.get<Res1>('/users/refresh', {
                withCredentials: true
            });

            if(response?.data.success && response.data.newAccessToken){
                authenticate(response.data.newAccessToken);
                return;
            }
            setUserInfo({id: "", name: "", accessToken: ""});
            toggleIsLoggedIn(false);
        } catch (error) {
            console.error(error);
        }
    }

    async function authenticate(accessToken: string){
        try {
            const response = await api.get<Res1>('/users/dashboard', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                withCredentials: true
            });

            if(response.data.success && response.data.info){
                setUserInfo({id: response.data.info.id, name: response.data.info.name, accessToken});
                toggleIsLoggedIn(true);
                return;
            }
            toast.error(response.data.message);
        } catch (error) {
            console.error(error);
            
        }
    }

    if(loading){
        return(
            <div className="flex flex-col items-center justify-center gap-10">
                <div className="w-[95vw] lg:w-[85vw] flex flex-col items-center justify-center gap-10">
                    <h1 className="text-5xl mt-20 font-bold">Loading...</h1>
                    <img src={LoadingImg} className="h-40 mb-20"/>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <>
            <Login />
            <div className="flex flex-col items-center justify-center gap-10">
                <div className="w-[95vw] lg:w-[85vw] flex flex-col items-center justify-center gap-10">
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/menu' element={<Menu />} />
                        <Route path='/mobile-app' element={<MobileApp />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/checkout' element={<Checkout />} />
                        <Route path='orders' element={<Orders />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </>

    )
}

export default App
