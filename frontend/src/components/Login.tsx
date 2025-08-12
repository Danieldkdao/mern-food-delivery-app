import { toast } from "react-toastify";
import { assets } from "../assets/assets"
import { useApp } from "../context/AppContext"
import { useState, type FormEvent } from 'react'
import api from "../utils/axios";
import { useNavigate } from "react-router";

type Payload = {
    id: string
    name: string
}

type Res1 = {
    success: boolean
    message: string
    accessToken?: string
    payload?: Payload
}

function Login() {

    const navigate = useNavigate();
    const [ login, setLogin ] = useState(false);
    const { loginShown, toggleLoginShown, toggleIsLoggedIn, setUserInfo } = useApp();

    if(!loginShown) return;

    async function registerUser(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const name = formData.get("name");
            const email = formData.get("email");
            const password = formData.get("password");

            const response = await api.post<Res1>('/users/register', {
                name,
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if(response.data.success && response.data.accessToken && response.data.payload){
                toast.success(response.data.message);
                toggleLoginShown(false);
                navigate('/');
                toggleIsLoggedIn(true);
                setUserInfo({id: response.data.payload.id, name: response.data.payload.name, accessToken: response.data.accessToken});
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to register user.");
        }
    }

    async function loginUser(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email");
            const password = formData.get("password");

            const response = await api.post<Res1>('/users/login', {
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if(response.data.success && response.data.accessToken && response.data.payload){
                toast.success(response.data.message);
                toggleLoginShown(false);
                navigate('/');
                toggleIsLoggedIn(true);
                setUserInfo({id: response.data.payload.id, name: response.data.payload.name, accessToken: response.data.accessToken});
                return;
            }
            toast.error(response.data.message);
        } catch (error) {
            console.error(error);
            toast.error("Failed to login user.");
        }
    }

    return (
        <>
            <div className="fixed z-50 inset-0 bg-black opacity-70"></div>
            <div>
                <div className="flex flex-col items-start justify-center gap-5 fixed z-100 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] bg-white p-5 rounded-lg sm:max-w-100 w-[90vw]">
                    <div className="w-full flex flex-row items-center justify-between">
                        <h1 className="text-2xl font-bold">{login ? "Login" : "Sign Up"}</h1>
                        <img src={assets.cross_icon} onClick={() => toggleLoginShown(false)} className="cursor-pointer"/>
                    </div>
                    <form onSubmit={login ? loginUser : registerUser} className="w-full flex flex-col items-start justify-center gap-3">
                        <div className="w-full flex flex-col items-center justify-center gap-3">
                            {login ? "" : <input required type="text" name="name" placeholder="Your name" className="bg-white p-2 outline-0 rounded-lg border-4 border-gray-300 w-full" />}
                            <input required type="email" name="email" placeholder="Your email" className="bg-white p-2 outline-0 rounded-lg border-4 border-gray-300 w-full" />
                            <input required type="password" name="password" placeholder="Password" className="bg-white p-2 outline-0 rounded-lg border-4 border-gray-300 w-full" />
                        </div>
                        <button className="w-full text-center bg-orange-500 rounded-md py-2 text-white cursor-pointer">{login ? "Login" : "Create account"}</button>
                        <div className="w-full">
                            <input required type="checkbox" className="mr-1" />
                            <label className="text-sm text-gray-500">By continuing, I agree to the terms of use & privacy policy.</label>
                        </div>
                    </form>
                    <p className="text-sm text-gray-500">{login ? "Don't" : "Already"} have an account? <span onClick={() => setLogin(!login)} className="text-orange-500 font-bold cursor-pointer">{login ? "Sign Up here." : "Login here."}</span></p>
                </div>
            </div>
        </>
    )
}

export default Login