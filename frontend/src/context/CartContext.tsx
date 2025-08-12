import React from 'react'
import { createContext, type ReactNode, useState, useContext } from 'react'
import api from '../utils/axios'

type CartItem = {
    id: string | IFood
    quantity: number
    _id?: string
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

type CartContextType = {
    cart: CartItem[]
    subtotal: number
    setSubtotal: (num: number) => void
    addToCart: (userId: string, itemId: string) => void
    removeCart: (userId: string, itemId: string) => void
    updateQuantity: (userId: string, itemId: string, num: number) => void
    getQuantity: (id: string) => number
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
    discount: boolean
    setDiscount: (bool: boolean) => void
}

const CartContext = createContext<CartContextType | null>(null);

export function CartContextProvider({children}: {children: ReactNode}){
    const [ cart, setCart ] = useState<CartItem[]>([]);
    const [ subtotal, setSubtotal ] = useState(0);
    const [ discount, setDiscount ] = useState(false);

    const getQuantity = (id: string) => {
        const quantity = cart.find(item => item.id === id)?.quantity;
        if(!quantity) return 0;
        return quantity;
    }

    const updateQuantity = async (userId: string, itemId: string, num: number) => {
        if(!num) return;
        setCart(prevCart => {
            return prevCart.map(item => {
                if(typeof item.id === "string") return item;
                if(item.id._id === itemId){
                    return {...item, quantity: num};
                }
                return item;
            })
        });

        await api.put('/users/updateQuantity', {
            userId,
            itemId,
            num
        }, {
            withCredentials: true
        });
    }

    const addToCart = async (userId: string, itemId: string) => {
        const exists = cart.some(item => item.id === itemId);
        if(exists){
            setCart(prevCart => 
                prevCart.map(item => 
                    item.id === itemId ? {...item, quantity: item.quantity + 1} : item
                )
            )
        }
        else {
            setCart(prevCart => [...prevCart, {id: itemId, quantity: 1}]);
        }
        
        await api.put('/users/addToCart', {
            userId,
            itemId,
            exists
        }, {
            withCredentials: true
        });
    }

    const removeCart = async (userId: string, itemId: string) => {
        const zero = cart.find(item => item.id === itemId)?.quantity === 1;
        setCart(prevCart => {
            const itemQuantity = prevCart.find(item => item.id === itemId)?.quantity;
            if(itemQuantity && itemQuantity === 1){
                return prevCart.filter(item => item.id !== itemId)
            } else {
                return prevCart.map(item => 
                    item.id === itemId ? {...item, quantity: item.quantity - 1} : item
                )
            }
        });

        await api.put('/users/removeCart', {
            userId,
            itemId,
            zero
        }, {
            withCredentials: true
        });
    }

    return(
        <CartContext.Provider value={{cart, subtotal, setSubtotal, addToCart, removeCart, updateQuantity, getQuantity, setCart, discount, setDiscount}}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart(){
    const context = useContext(CartContext);
    if(!context) throw new Error("Cart context must be used inside cart provider.");
    return context;
}