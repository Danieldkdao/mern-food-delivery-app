import Img12 from '../assets/food_12.png';

function Contact() {
    return (
        <div className="flex flex-col items-center justify-center gap-10 w-full mb-20">
            <h1 className="text-4xl font-bold">Contact Us</h1>
            <div className="flex flex-col md:flex-row justify-center items-start md:items-center w-full gap-10">
                <img src={Img12} className="w-full md:w-1/2"/>
                <div className="flex flex-col items-start justify-center gap-6 w-1/2">
                    <h2 className="text-2xl font-bold text-gray-600">Our Store</h2>
                    <div>
                        <p className="text-gray-500">54709 Willms Station</p>
                        <p className="text-gray-500">Suite 350, Washington, USA</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Tel: (415) 555-0132</p>
                        <p className="text-gray-500">Email: tomatoadmin@gmail.com</p>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-600">Careers at Tomato</h2>
                    <p className="text-gray-500">Learn more about our teams and job openings.</p>
                    <button className="border text-sm px-8 py-4 cursor-pointer hover:bg-orange-500 hover:border-orange-500 transition-colors duration-300">Explore Jobs</button>
                </div>
            </div>
        </div>
    )
}

export default Contact