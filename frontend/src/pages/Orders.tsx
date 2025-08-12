import { useEffect, useState } from "react"
import { useApp } from "../context/AppContext";
import api from "../utils/axios";
import Order from "../components/Order";
import { useNavigate } from "react-router";

export type CartItem = {
    id: IFood
    quantity: number
}

export interface IFood {
    name: string
    image: string
    price: number
    description: string
    category: string
    createdAt: Date
    updatedAt: Date
}

type OrderTs = {
    order: CartItem[]
    status: string
    total: number
    _id: string
}

function Orders() {

    const navigate = useNavigate();
    const { userInfo, isLoggedIn } = useApp();
    const [ orders, setOrders ] = useState<OrderTs[]>([]);

    useEffect(() => {
        if(!isLoggedIn){
            navigate('/');
            return;
        };
        if(!userInfo.id) return;
        fetchOrders();

    }, [userInfo, isLoggedIn]);

    async function fetchOrders(){
        try {
            const response = await api.get(`/users/getOrders/${userInfo.id}`, {
                withCredentials: true
            });

            if(response?.data.success && response.data.orders){
                setOrders(response.data.orders);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full flex flex-col items-start justify-center gap-10 my-10">
            <h1 className="text-3xl font-bold">My Orders</h1>
            <div className="w-full flex flex-col items-center justify-center">
                {orders.map(item => {
                    return <Order key={item._id} order={item.order} status={item.status} total={item.total}/>
                })}
            </div>
        </div>
    )
}

export default Orders