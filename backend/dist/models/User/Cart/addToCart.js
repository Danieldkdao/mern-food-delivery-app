import UserModel from "../UserModel.js";
const addToCart = async (userId, itemId, exists) => {
    try {
        if (exists) {
            await UserModel.updateOne({ _id: userId, "cart.id": itemId }, { $inc: { "cart.$.quantity": 1 } });
            return { success: true, message: "Item added successfully!" };
        }
        await UserModel.findByIdAndUpdate(userId, { $push: { cart: { id: itemId, quantity: 1 } } });
        return { success: true, message: "Item added successfully!" };
    }
    catch (error) {
        console.error(error);
        return { success: false, message: "Failed to add item to cart." };
    }
};
export default addToCart;
//# sourceMappingURL=addToCart.js.map