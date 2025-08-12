import { assets } from "../assets/assets"
import Foods from "../components/Foods"
import FoodsCategories from "../components/FoodsCategories"
import { useNavigate } from "react-router"

function Home() {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center gap-5 w-full mb-20">
            <div className="relative text-white">
                <img src={assets.header_img} className="rounded" />
                <div className="absolute flex flex-col items-start justify-center gap-5 bottom-5 right-[45%] lg:right-[43%] lg:left-10 left-5">
                    <h1 className="text-[4vw] w-full lg:text-[5vw] leading-relaxed font-medium t">Order your favourite food here</h1>
                    <p className="hidden md:block text-[1vw]">Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                    <button onClick={() => navigate('/menu')} className="px-10 py-3 bg-white rounded-full text-black text-sm cursor-pointer">View Menu</button>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-5">
                <h1 className="text-3xl font-medium">Explore our menu</h1>
                <p className="text-sm text-gray-500">Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
            </div>
            <FoodsCategories clickable={false} />
            <hr className="text-gray-300 w-full border-2 rounded-xl mb-3"></hr>
            <div className="w-full flex flex-col items-start justify-center gap-5 mb-15">
                <h1 className="text-3xl font-medium">Favorites</h1>
                <Foods search="" category={[]} limit={4}/>
            </div>
            <h1 className="text-4xl text-center font-medium max-w-150">For a Better Experience, Download the Tomato App!</h1>
            <div className="flex flex-row items-center justify-center gap-10">
                <img src={assets.play_store} className="h-12 cursor-pointer" />
                <img src={assets.app_store} className="h-12 cursor-pointer" />
            </div>
        </div>
    )
}

export default Home