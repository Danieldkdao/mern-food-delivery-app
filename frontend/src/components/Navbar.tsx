import { assets } from '../assets/assets'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/axios';
import { useCart } from '../context/CartContext';
import MenuIcon from '../assets/menu_icon.png';

type Res = {
    success: boolean
    message: string
}

function Navbar() {

    const navigate = useNavigate();
    const { toggleLoginShown, toggleShowSearchbar, isLoggedIn, toggleIsLoggedIn, setUserInfo } = useApp();
    const { cart } = useCart();
    const [ showDrop, setShowDrop ] = useState(false);
    const [ toggleFullMenu, setToggleFullMenu ] = useState(false);

    function navSearch(){
        navigate('/menu');
        toggleShowSearchbar(true);
    }

    async function logout(){
        try {
            const response = await api.delete<Res>('/users/logout', {
                withCredentials: true
            });

            if(response?.data.success){
                navigate('/');
                toast.success(response.data.message);
                toggleIsLoggedIn(false);
                setUserInfo({id: "", name: "", accessToken: ""});
                setShowDrop(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error logging out.");
        }
    }

    return (
        <div className="flex flex-row items-center justify-between w-full py-5">
            <img src={assets.logo} className="h-7 cursor-pointer" onClick={() => navigate('/')} />
            <div className="hidden flex-row items-center justify-center gap-5 md:flex">
                <Link to='/'>home</Link>
                <Link to='/menu'>menu</Link>
                <Link to='/mobile-app'>mobile app</Link>
                <Link to='/contact'>contact us</Link>
            </div>
            <div className="flex flex-row items-center justify-center gap-9">
                <img src={assets.search_icon} onClick={navSearch} className="cursor-pointer"/>
                <div className="relative">
                    <img src={assets.basket_icon} onClick={() => navigate('/cart')} className="cursor-pointer"/>
                    <div className={`${cart.length === 0 ? "hidden" : ""} absolute h-3 w-3 bg-orange-600 rounded-full -top-2 -right-2`}></div>
                </div>
                
                {isLoggedIn ? <div className="relative">
                        <img src={assets.profile_icon} onClick={() => setShowDrop(!showDrop)} className="cursor-pointer"/>
                        <div className={`${showDrop ? "flex" : "hidden"} bg-gray-200 absolute flex-col items-start justify-center -left-25 -bottom-26 gap-2 p-2 z-10 rounded w-30`}>
                            <div className="flex flex-row items-center justify-center gap-1 cursor-pointer p-1">
                                <img src={assets.bag_icon} className="h-7"/>
                                <Link to='/orders'>Orders</Link>
                            </div>
                            <div onClick={logout} className="flex flex-row items-center justify-center gap-1 cursor-pointer p-1">
                                <img src={assets.logout_icon} className="h-7"/>
                                <Link to='/'>Logout</Link>
                            </div>
                        </div>
                    </div>
                : <button onClick={() => toggleLoginShown(true)} className="border border-orange-800 cursor-pointer px-8 py-2 rounded-full">sign in</button>
                }
                <img onClick={() => setToggleFullMenu(true)} src={MenuIcon} className="h-7 cursor-pointer inline md:hidden"/>
                <div className={`fixed top-1/2 ${toggleFullMenu ? "left-1/2" : "left-[200%]"} -translate-1/2 bg-white z-100 h-screen w-screen transition-all duration-400 ease-in-out`}>
                    <p onClick={() => setToggleFullMenu(false)} className="text-lg p-5 cursor-pointer">Close</p>
                    <Link onClick={() => setToggleFullMenu(false)} className="bg-orange-600 block px-3 py-5 font-medium text-2xl text-white border-y border-black" to='/'>home</Link>
                    <Link onClick={() => setToggleFullMenu(false)} className="bg-orange-600 block px-3 py-5 font-medium text-2xl text-white border-y border-black" to='/menu'>menu</Link>
                    <Link onClick={() => setToggleFullMenu(false)} className="bg-orange-600 block px-3 py-5 font-medium text-2xl text-white border-y border-black" to='/mobile-app'>mobile app</Link>
                    <Link onClick={() => setToggleFullMenu(false)} className="bg-orange-600 block px-3 py-5 font-medium text-2xl text-white border-y border-black" to='/contact'>contact</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar