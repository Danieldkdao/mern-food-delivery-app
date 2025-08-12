import FoodModel, {type IFood} from "./FoodModel.js";

const getFoods = async () => {
    try {
        const foods: IFood[] = await FoodModel.find();
        return {success: true, message: "Foods fetched successfully!", foods}
    } catch (error) {
        console.error(error);
        return {success: false, message: "Failed to get foods."};
    }
}

export default getFoods;