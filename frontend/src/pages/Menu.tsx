import { useState } from "react";
import { assets } from "../assets/assets"
import Foods from "../components/Foods"
import FoodsCategories from "../components/FoodsCategories"
import { useApp } from "../context/AppContext"

function Menu() {

    const [ search, setSearch ] = useState("");
    const [ category, setCategory ] = useState<string[]>([]);
    const { showSearchbar, toggleShowSearchbar } = useApp();

    return (
        <div className="flex flex-col items-center justify-center gap-10 w-full mb-20">
            <h1 className="text-4xl font-bold">Our Menu</h1>
            {showSearchbar && <div className="w-full flex flex-row items-center justify-center gap-3">
                <input type="text" onChange={(e) => setSearch(e.currentTarget.value)} className="bg-white outline-0 shadow-lg max-w-180 rounded-xl flex-1 p-3 border border-gray-300" placeholder="Search"/>
                <img src={assets.cross_icon} onClick={() => toggleShowSearchbar(false)} className="cursor-pointer"/>
            </div>}
            <FoodsCategories clickable={true} category={category} setCategory={setCategory}/>
            <Foods category={category} search={search} limit={0} />
        </div>
    )
}

export default Menu