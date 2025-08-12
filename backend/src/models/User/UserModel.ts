import mongoose, {Schema, Model, Document, Types} from 'mongoose';

type CartItem = {
    id: Types.ObjectId | IFood
    quantity: number
}

export interface IFood {
    _id: Types.ObjectId
    name: string
    image: string
    price: number
    description: string
    category: string
    createdAt: Date
    updatedAt: Date
}

type Order = {
    order: CartItem[]
    status: string
    total: number
}

export interface IUser extends Document {
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    cart: CartItem[]
    orders: Order[]
    refreshToken: string
}

const UserSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cart: [{
        id: {type: Schema.Types.ObjectId, ref: "Foods", required: true},
        quantity: {type: Number, default: 1}
    }],
    orders: [
            {order: [{
            id: {type: Schema.Types.ObjectId, ref: "Foods", required: true},
            quantity: {type: Number, default: 1}
        }],
        status: {type: String, required: true},
        total: {type: Number, required: true}
    }
    ],
    refreshToken: {type: String, default: ""}
}, {timestamps: true});

const UserModel: Model<IUser> = mongoose.models.Users || mongoose.model("Users", UserSchema);

export default UserModel;