import UserModel from "../UserModel.js";

const getCart = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId);
        return {success: true, message: "Cart found!", cart: user?.cart};
    } catch (error) {
        console.error(error);
        return {success: false, message: "No cart found."};
    }
}

export default getCart;