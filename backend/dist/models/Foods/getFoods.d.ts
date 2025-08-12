import { type IFood } from "./FoodModel.js";
declare const getFoods: () => Promise<{
    success: boolean;
    message: string;
    foods: IFood[];
} | {
    success: boolean;
    message: string;
    foods?: never;
}>;
export default getFoods;
//# sourceMappingURL=getFoods.d.ts.map