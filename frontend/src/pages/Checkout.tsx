import Totals from "../components/Totals"
import { useEffect, type FormEvent } from 'react'
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import api from "../utils/axios";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router";

type GetCart = {
    success: boolean
    message: string
    cart?:  Res[]
}

type Res = {
    quantity: number
    id: IFood
    _id: string
}

type IFood = {
    _id: string
    name: string
    image: string
    price: number
    description: string
    category: string
    createdAt: Date
    updatedAt: Date
}

function Checkout() {
    const navigate = useNavigate();
    const { userInfo, isLoggedIn } = useApp();
    const { cart, setCart, subtotal, setSubtotal, discount } = useCart();

    useEffect(() => {
        if(!userInfo.id) return;
        getCart();
    }, [cart, userInfo.id]);

    useEffect(() => {
        if(cart.length === 0){
            setSubtotal(0);
            return;
        }

        const total = cart.reduce((sum, item) => {
            if(typeof item.id === "string" || !item.id.price) return sum;
            return sum + item.quantity * item.id.price
        }, 0);

        setSubtotal(total);
    }, [cart]);

    async function createOrder(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(!isLoggedIn) return toast.error("You must be logged in to create orders.");
        try {
            const total = discount ? (subtotal + subtotal * 0.05 + 5) * 0.95 : (subtotal + subtotal * 0.05 + 5);
            const response = await api.post('/users/createOrder', {
                userId: userInfo.id,
                total
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if(response?.data.success){
                setCart([]);
                navigate('/orders');
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create order.");
        }
    }

    async function getCart(){
        try {
            const response = await api.get<GetCart>(`/users/getCartPopulate/${userInfo.id}`, {
                withCredentials: true
            });

            if(response.data.success && response.data.cart){
                setCart(response.data.cart);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={createOrder} className="flex flex-col lg:flex-row items-start justify-center w-full gap-15 lg:gap-50 mt-15 mb-25">
            <div className="flex flex-col items-start justify-center gap-10 w-full">
                <h1 className="text-3xl font-bold">Delivery Information</h1>
                <div className="flex flex-col items-center justify-center w-full gap-3">
                    <div className="w-full flex flex-row items-center justify-center gap-3">
                       <input required type="text" className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-orange-500" placeholder="First name"/>
                       <input required type="text" className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-orange-500" placeholder="Last name"/>
                    </div>
                    <input required type="email" className="w-full p-2 border-2 border-gray-300 rounded focus:outline-orange-500" placeholder="Email address"/>
                    <input required type="text" className="w-full p-2 border-2 border-gray-300 rounded focus:outline-orange-500" placeholder="Street"/>
                    <div className="w-full flex flex-row items-center justify-center gap-3">
                       <input required type="text" className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-orange-500" placeholder="City"/>
                       <input required type="text" className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-orange-500" placeholder="State"/>
                    </div>
                    <div className="w-full flex flex-row items-center justify-center gap-3">
                       <input required type="number" className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-orange-500" placeholder="Zip code"/>
                       <input required type="text" className="flex-1 p-2 border-2 border-gray-300 rounded focus:outline-orange-500" placeholder="Country"/>
                    </div>
                    <input required type="tel" className="w-full p-2 border-2 border-gray-300 rounded focus:outline-orange-500" placeholder="Phone"/>
                </div>
            </div>
            <Totals subtotal={subtotal} isCheckout="Proceed To Payment" isDiscount={discount}/>
        </form>
    )
}

export default Checkout