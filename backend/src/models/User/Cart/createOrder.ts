import UserModel from "../UserModel.js";
import getCartPopulate from "./getCartPopulate.js";

const createOrder = async (userId: string, total: number) => {
    try {
        const cart = (await getCartPopulate(userId)).cart;
        const order = {order: cart, status: "Food Processing", total};
        await UserModel.findByIdAndUpdate(userId, 
            { $push: {orders: order}, $set: {cart: []}}
        );
        return {success: true, message: "Order created successfully!"};
    } catch (error) {
        console.error(error);
        return {success: false, message: "Error creating order."};
    }
}

export default createOrder;