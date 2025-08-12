import FoodModel, {} from "./FoodModel.js";
const getFoods = async () => {
    try {
        const foods = await FoodModel.find();
        return { success: true, message: "Foods fetched successfully!", foods };
    }
    catch (error) {
        console.error(error);
        return { success: false, message: "Failed to get foods." };
    }
};
export default getFoods;
//# sourceMappingURL=getFoods.js.map