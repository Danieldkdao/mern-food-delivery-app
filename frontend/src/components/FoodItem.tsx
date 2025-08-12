import { useEffect, useState } from "react"
import { assets } from "../assets/assets"
import { toast } from 'react-toastify'
import { useApp } from "../context/AppContext"
import { useCart } from "../context/CartContext"

type FoodItemProps = {
    info: FoodInfo
}

type FoodInfo = {
    _id: string
    name: string
    image: string
    price: number
    description: string
    category: string
}

function FoodItem(props: FoodItemProps) {

    const { isLoggedIn, userInfo } = useApp();
    const { getQuantity, addToCart, removeCart, cart } = useCart();
    const [ toggle, setToggle ] = useState(false);

    useEffect(() => {
        if(getQuantity(props.info._id) === 0) return setToggle(false);
        setToggle(true);
    }, [cart, getQuantity, props.info._id]);

    return (
        <div className="rounded-xl bg-white flex flex-col items-start justify-between h-full w-full hover:-translate-y-2 transition-all duration-300">
            <div className="w-full relative">
                <img src={props.info.image} className="rounded-t-xl w-full"/>
                <p className="absolute top-2 left-2 bg-orange-400 p-2 rounded font-medium">{props.info.category}</p>
                <div className="absolute bottom-2 right-2">
                    {toggle ? <div className="bg-white rounded-full p-2 flex flex-row items-center justify-center gap-2">
                        <img onClick={() => removeCart(userInfo.id, props.info._id)} src={assets.remove_icon_red} className="cursor-pointer active:scale-90 active:duration-100 hover:brightness-80 hover:transition-all hover:duration-300"/>
                        <h1 className="text-xl font-bold">{getQuantity(props.info._id)}</h1>
                        <img onClick={() => addToCart(userInfo.id, props.info._id)} src={assets.add_icon_green} className="cursor-pointer active:scale-90 active:duration-100 hover:brightness-80 hover:transition-all hover:duration-300"/>
                    </div>
                    : <img src={assets.add_icon_white} onClick={() => isLoggedIn ? addToCart(userInfo.id, props.info._id) : toast.warn("Log in to add to cart!")} className="cursor-pointer active:scale-90 active:duration-100 hover:brightness-80 hover:transition-all hover:duration-300"/>}
                </div>
            </div>
            <div className="p-5 flex flex-col items-start justify-between gap-1 shadow-xl rounded-b-xl h-full w-full">
                <div className="flex flex-row items-center justify-between w-full h-full">
                    <h1 className="text-xl font-medium">{props.info.name}</h1>
                    <img src={assets.rating_starts} className="h-5 sm:h-4 lg:h-3"/>
                </div>
                <div className="flex flex-col items-start justify-center gap-2">
                    <p className="text-xs text-gray-500">{props.info.description}</p>
                    <h1 className="text-2xl font-medium text-orange-500">${props.info.price}</h1>
                </div>
            </div>
        </div>
    )
}

export default FoodItem