import { Link } from 'react-router'
import { assets } from '../assets/assets'

function Footer() {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-[#373737] py-10 gap-10">
        <div className="flex flex-col md:flex-row items-start justify-center w-[95%] lg:w-[85%] text-gray-300 gap-12">
            <div className="flex flex-col items-start justify-center gap-5">
                <img src={assets.logo} className="h-8"/>
                <p>Tomato brings fresh, delicious meals from your favorite local restaurants straight to your doorstep, faster than you can set the table. With a seamless ordering experience and a wide variety of cuisines, Tomato turns every night into a feast without the hassle of cooking.</p>
                <div className="flex flex-row items-center justify-start gap-4">
                    <img src={assets.facebook_icon} className="cursor-pointer"/>
                    <img src={assets.twitter_icon} className="cursor-pointer"/>
                    <img src={assets.linkedin_icon} className="cursor-pointer"/>
                </div>
            </div>
            <div className="flex flex-col items-start justify-center gap-1 w-full">
                <h2 className="font-bold text-white text-xl mb-3">COMPANY</h2>
                <Link to='/'>Home</Link>
                <Link to='/'>About us</Link>
                <Link to='/'>Delivery</Link>
                <Link to='/'>Privacy policy</Link>
            </div>
            <div className="flex flex-col items-start justify-center gap-1 w-full">
                <h2 className="font-bold text-white text-xl mb-3">GET IN TOUCH</h2>
                <p>+1-000-000-000</p>
                <a href="mailto:tomatoadmin@gmail.com">tomatoadmin@gmail.com</a>
            </div>
        </div>
        <hr className="text-gray-300 w-[95%] lg:w-[85%]"></hr>
        <p className="text-gray-300">Copyright 2025 &copy; Tomato.com - All Rights Reserved</p>
    </div>
  )
}

export default Footer