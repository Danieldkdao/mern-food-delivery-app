import Img4 from '../assets/food_4.png';
import Img5 from '../assets/food_5.png';
import { assets } from '../assets/assets';

function MobileApp() {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-10">
            <h1 className="font-bold text-4xl">Mobile App</h1>
            <div className="flex flex-row items-center justify-center gap-2">
                <img src={Img4} className="w-1/2 md:w-screen rounded-xl"/>
                <img src={Img5} className="w-1/2 md:w-screen rounded-xl"/>
            </div>
            <p className="text-gray-500">Tomato brings fresh, delicious meals from your favorite local restaurants straight to your doorstep, faster than you can set the table. With a seamless ordering experience and a wide variety of cuisines, Tomato turns every night into a feast without the hassle of cooking.</p>
            <h1 className="text-4xl text-center font-medium max-w-150">Download the Tomato App Here!</h1>
            <div className="flex flex-row items-center justify-center gap-10">
                <img src={assets.play_store} className="h-12 cursor-pointer"/>
                <img src={assets.app_store} className="h-12 cursor-pointer"/>
            </div>
        </div>
    )
}

export default MobileApp