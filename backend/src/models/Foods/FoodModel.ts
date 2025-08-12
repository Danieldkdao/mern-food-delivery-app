import mongoose, {Schema, Model, Document} from 'mongoose';

export interface IFood extends Document {
    name: string
    image: string
    price: number
    description: string
    category: string
    createdAt: Date
    updatedAt: Date
}

const FoodSchema: Schema<IFood> = new Schema({
    name: {type: String, required: true, unique: true},
    image: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true}
}, {timestamps: true});

const FoodModel: Model<IFood> = mongoose.models.Foods || mongoose.model("Foods", FoodSchema);

export default FoodModel;