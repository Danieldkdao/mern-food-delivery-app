import UserModel from "../UserModel.js";

const updateQuantity = async (userId: string, itemId: string, num: number) => {
    try {
        await UserModel.findByIdAndUpdate(userId, {$set: {"cart.$[item].quantity": num}}, {arrayFilters: [{"item.id": itemId}]});
        return {success: true, message: "Quantity updated successfully!"};
    } catch (error) {
        console.error(error);
        return {success: false, message: "Failed to update quantity."};
    }
}

export default updateQuantity;