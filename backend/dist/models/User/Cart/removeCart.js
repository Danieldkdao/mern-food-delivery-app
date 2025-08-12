import UserModel from "../UserModel.js";
const removeCart = async (userId, itemId, zero) => {
    try {
        if (zero) {
            await UserModel.findByIdAndUpdate(userId, { $pull: { cart: { id: itemId } } });
        }
        else {
            await UserModel.updateOne({ _id: userId, "cart.id": itemId }, { $inc: { "cart.$.quantity": -1 } });
        }
        return { success: true, message: "Item removed from cart!" };
    }
    catch (error) {
        console.error(error);
        return { success: false, message: "Failed to remove item from cart." };
    }
};
export default removeCart;
//# sourceMappingURL=removeCart.js.map