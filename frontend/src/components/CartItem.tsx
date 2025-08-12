import type { ChangeEvent } from "react"
import { assets } from "../assets/assets"
import { useApp } from "../context/AppContext"
import { useCart } from "../context/CartContext"
import api from "../utils/axios"

type CartItemProp = {
    info: IFood,
    quantity: number
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
function CartItem(props: CartItemProp) {

    const { userInfo } = useApp();
    const { updateQuantity, setCart } = useCart();

    async function removeItem(){
        const isDelete = window.confirm("Are you sure you want to remove this item from your cart?");
        if(!isDelete) return;
        try {
            setCart(prev => {
                    console.log(prev);
                    console.log(props.info._id);
                    const filtered = prev.filter(item => {
                        if(typeof item.id !== "string"){
                            console.log(item.id._id !== props.info._id);
                        }
                        typeof item.id !== "string" ? item.id._id !== props.info._id : true
                    });
                    console.log(filtered);
                    return filtered;
                }
            );
            
            await api.delete(`/users/removeCartItem?userId=${userInfo.id}&itemId=${props.info._id}`, {
                withCredentials: true
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function updateQuantityItem(e: ChangeEvent<HTMLInputElement>){
        try {
            updateQuantity(userInfo.id, props.info._id, Number(e.currentTarget.value));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="grid grid-cols-6 w-full items-center justify-center border-y border-gray-300 py-3">
            <img src={props.info.image} className="h-10" />
            <h1>{props.info.name}</h1>
            <h1>${props.info.price}</h1>
            <input onChange={updateQuantityItem} value={props.quantity} type="number" min="1" className="outline-0 p-2 w-15 border border-gray-300" />
            <h1>${props.quantity * props.info.price}</h1>
            <img onClick={removeItem} src={assets.cross_icon} className="cursor-pointer" />
        </div>
    )
}

export default CartItem