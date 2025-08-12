import UserModel from "../UserModel.js";

const getCartPopulate = async (userId: string) => {
    try {
        const user = await UserModel.findById(userId).populate("cart.id");
        return {success: true, message: "Items fetched successfully!", cart: user?.cart};
    } catch (error) {
        console.error(error);
        return {success: false, message: "Faled to retrieve items."};
    }
}

export default getCartPopulate;