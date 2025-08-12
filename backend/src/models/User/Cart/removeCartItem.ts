import UserModel from "../UserModel.js";

const removeCartItem = async (userId: string, itemId: string) => {
    try {
        await UserModel.findByIdAndUpdate(userId, {$pull: {cart: {id: itemId}}});
        return {success: true, message: "Item removed successfully!"};
    } catch (error) {
        console.error(error);
        return {success: false, message: "Failed to remove cart item."};
    }
}

export default removeCartItem;