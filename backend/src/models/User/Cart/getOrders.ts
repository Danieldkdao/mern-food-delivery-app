import UserModel from "../UserModel.js";

const getOrders = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId).populate("orders.order.id");
        console.log(user?.orders);
        return {success: true, message: "Orders retrieved successfully!", orders: user?.orders};
    } catch (error) {
        console.error(error);
        return {success: false, message: "Error retrieving orders."};
    }
}

export default getOrders;