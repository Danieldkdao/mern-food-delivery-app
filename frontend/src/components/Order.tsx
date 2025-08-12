import { assets } from "../assets/assets"
import { type CartItem } from "../pages/Orders"
import { type IFood } from "../pages/Orders"

type OrderProps = {
    order: CartItem[]
    status: string
    total: number
}

function Order(props: OrderProps) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between text-sm w-full gap-1 md:gap-5 border p-5 border-orange-500">
            <div className="flex flex-row items-center justify-between w-full md:gap-10 md:w-auto">
                <img src={assets.parcel_icon} />
                <h1>{props.order.filter(item => item.id && typeof item.id !== "string")
                .map(item => {
                    return `${(item.id as IFood).name} x ${item.quantity}`
                }).join(', ')}</h1>
                <h1>${props.total.toFixed(2)}</h1>
            </div>
            <div className="flex flex-row items-center justify-between w-full md:gap-20 md:w-auto">
                <h1>Items: {props.order.length}</h1>
                <div className="flex flex-row items-center justify-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-orange-700"></div>
                    <h1 className="font-medium">{props.status}</h1>
                </div>
                <button className="px-9 py-3 bg-red-100 cursor-pointer">Track Order</button>
            </div>
        </div>
    )
}

export default Order