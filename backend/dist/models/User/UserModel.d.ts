import { Model, Document, Types } from 'mongoose';
type CartItem = {
    id: Types.ObjectId | IFood;
    quantity: number;
};
export interface IFood {
    _id: Types.ObjectId;
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}
type Order = {
    order: CartItem[];
    status: string;
    total: number;
};
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    cart: CartItem[];
    orders: Order[];
    refreshToken: string;
}
declare const UserModel: Model<IUser>;
export default UserModel;
//# sourceMappingURL=UserModel.d.ts.map