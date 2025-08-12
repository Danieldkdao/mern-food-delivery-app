import api from '../utils/axios'
import { useEffect, useState } from 'react'
import FoodItem from "./FoodItem"
import LoadingGif from '../assets/Insider-loading.gif'
import { useApp } from '../context/AppContext'
import { useCart } from '../context/CartContext'

type CartItem = {
    id: string
    quantity: number
}

type FoodsProps = {
    limit: number
    search: string
    category: string[]
}

type FoodRes1 = {
    success: boolean
    message: string
    foods?: IFood[]
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

type GetCart = {
    success: boolean
    message: string
    cart?: CartItem[]
}

function Foods(props: FoodsProps) {

    const [ loading, setLoading ] = useState(true);
    const [ foodList, setFoodList ] = useState<IFood[] | undefined>([]);
    const [ filteredFoods, setFilteredFoods ] = useState<IFood[] | undefined>([]);
    const { userInfo, isLoggedIn } = useApp();
    const { setCart } = useCart();

    useEffect(() => {
        filterFoods();
    }, [props.category, props.search]);

    useEffect(() => {
        async function wait(){
            setLoading(true);
            await fetchFoods();
            await getCart();
            setLoading(false);
        }

        wait();
    }, [isLoggedIn, userInfo]);

    async function fetchFoods(){
        try {
            const response = await api.get<FoodRes1>('/foods/getFoods', {
                withCredentials: true
            });
            
            if(response?.data.success){
                setFoodList(response?.data.foods);
                setFilteredFoods(response?.data.foods);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function filterFoods(){
        if(!foodList) return;
        let items = foodList;
        if(props.category.length !== 0){
            items = items?.filter(item => props.category?.includes(item.category));
        }
        if(props.search.trim() !== ""){
            items = items?.filter(item => item.name.toLowerCase().includes(props.search?.toLowerCase()));
        }

        setFilteredFoods(items);
    }

    async function getCart(){
        try {
            const response = await api.get<GetCart>(`/users/getCart/${userInfo.id}`, {
                withCredentials: true
            });

            if(response.data.success && response.data.cart){
                setCart(response.data.cart);
            }
        } catch (error) {
            console.error(error);
        }
    }

    if(loading) return (
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-4xl text-center font-medium">Loading...</h1>
            <img src={LoadingGif} className="h-60"/>
        </div>
    )

    return (
        <>
            {filteredFoods?.length !== 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-5 w-full">
                {filteredFoods?.map((item, index) => {
                    if(props.limit === 0) return <FoodItem key={item._id} info={item}/>
                    if(props.limit <= index) return;
                    return <FoodItem key={item._id} info={item}/>
                })}
            </div> : <div className="w-full items-center justify-center">
                    <h1 className="text-center font-bold text-4xl">No Foods Found! Try Something Else.</h1>
                </div>}
        </>
        
    )
}

export default Foods