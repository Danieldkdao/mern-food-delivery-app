import mongoose, { Schema, Model, Document } from 'mongoose';
const FoodSchema = new Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true }
}, { timestamps: true });
const FoodModel = mongoose.models.Foods || mongoose.model("Foods", FoodSchema);
export default FoodModel;
//# sourceMappingURL=FoodModel.js.map