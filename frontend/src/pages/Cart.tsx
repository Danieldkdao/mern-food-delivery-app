import { type FormEvent } from 'react';
import { useEffect, useState } from 'react';
import Totals from '../components/Totals';
import { useApp } from '../context/AppContext';
import api from '../utils/axios';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import LoadingGif from '../assets/Insider-loading.gif';
import { toast } from 'react-toastify';

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

function Cart() {

    const { userInfo } = useApp();
    const { setCart, cart, subtotal, setSubtotal, discount, setDiscount } = useCart();
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if(!userInfo.id){
            setLoading(false);
            return;
        };
        async function wait(){
            await getCart();
            setLoading(false);
        }

        wait();
    }, [userInfo.id]);

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

    function checkDiscount(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const code = new FormData(e.currentTarget).get("code") as string;
        if(code && code.trim() === "DISCOUNT5"){
            setDiscount(true);
            toast.success("Discount applied!");
            return;
        }

        toast.error("Invalid discount code.");
    }

    return (
        <div className="flex flex-col items-center justify-center gap-20 w-full mt-10 mb-20">
            {loading ? <div className="flex flex-col items-center justify-center w-full">
                        <h1 className="text-4xl text-center font-medium">Loading...</h1>
                        <img src={LoadingGif} className="h-60"/>
                    </div>
                    : 
                    cart.length === 0 ? <h1 className="text-center text-4xl font-bold">Your cart is empty!</h1> : <div className="w-full flex flex-col items-center justify-center gap-5">
                <div className="grid grid-cols-6 w-full">
                    <h1 className="text-gray-400 font-medium">Items</h1>
                    <h1 className="text-gray-400 font-medium">Title</h1>
                    <h1 className="text-gray-400 font-medium">Price</h1>
                    <h1 className="text-gray-400 font-medium">Quantity</h1>
                    <h1 className="text-gray-400 font-medium">Total</h1>
                    <h1 className="text-gray-400 font-medium">Remove</h1>
                </div>
                <div className="w-full">
                    {cart.map(item => {
                        if(typeof item.id === "string"){
                            return null;
                        }

                        return <CartItem key={item._id} info={item.id} quantity={item.quantity}/>
                    })}
                </div>
            </div>}
            <div className="w-full flex flex-col md:flex-row items-start justify-center gap-10 md:gap-20">
                <Totals path="checkout" subtotal={subtotal} isCheckout='PROCEED TO CHECKOUT' isDiscount={discount}/>
                <div className="flex flex-col items-start justify-center gap-3 w-full">
                    <p className="text-gray-500">Enter promo code here:</p>
                    <form onSubmit={checkDiscount} className="flex flex-row items-center justify-center w-full">
                        <input required type="text" name="code" className="bg-gray-200 rounded p-3 text-sm outline-0 flex-1" />
                        <button className="px-18 py-3 text-sm text-white rounded bg-black cursor-pointer">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Cart



















































