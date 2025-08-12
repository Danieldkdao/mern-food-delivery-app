import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

type TotalsProps = {
    isCheckout: string
    path?: string
    subtotal: number
    isDiscount?: boolean
}

function Totals(props: TotalsProps) {

    const navigate = useNavigate();
    const { cart, setDiscount } = useCart();

    function decide(){
        if(props.path){
            if(cart.length === 0) return toast.error("Cart cannot be empty.");
            navigate('/checkout');
            if(props.isDiscount){
                setDiscount(props.isDiscount);
            }
        }
    }

    return (
        <div className="w-full flex flex-col">
            <h1 className="text-2xl font-bold mb-5">Cart Totals</h1>
            <div className="flex flex-row items-center justify-between border-b-1 py-3 border-gray-400">
                <p className="font-medium text-gray-500">Subtotal</p>
                <p className="font-medium text-gray-500">${(props.subtotal).toFixed(2)}</p>
            </div>
            <div className="flex flex-row items-center justify-between border-b-1 py-3 border-gray-400">
                <p className="font-medium text-gray-500">Tax (5%)</p>
                <p className="font-medium text-gray-500">${(props.subtotal * 0.05).toFixed(2)}</p>
            </div>
            <div className="flex flex-row items-center justify-between border-b-1 py-3 border-gray-400">
                <p className="font-medium text-gray-500">Delivery Fee</p>
                <p className="font-medium text-gray-500">$5.00</p>
            </div>
            <div className="flex flex-row items-center justify-between py-3 border-gray-400">
                <p className="font-bold">Total</p>
                <p className="font-bold">${cart.length === 0 ? "0.00" : props?.isDiscount ? ((props.subtotal + props.subtotal * 0.05 + 5) * 0.95).toFixed(2) : ((props.subtotal + props.subtotal * 0.05 + 5).toFixed(2))}</p>
            </div>
            <button onClick={decide} className="px-7 py-3 bg-orange-500 text-white self-start text-sm rounded cursor-pointer">{props.isCheckout}</button>
        </div>
    )
}

export default Totals