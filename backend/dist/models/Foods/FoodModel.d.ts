import { Model, Document } from 'mongoose';
export interface IFood extends Document {
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const FoodModel: Model<IFood>;
export default FoodModel;
//# sourceMappingURL=FoodModel.d.ts.map