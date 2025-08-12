import mongoose, { Schema, Model, Document, Types } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [{
            id: { type: Schema.Types.ObjectId, ref: "Foods", required: true },
            quantity: { type: Number, default: 1 }
        }],
    orders: [
        { order: [{
                    id: { type: Schema.Types.ObjectId, ref: "Foods", required: true },
                    quantity: { type: Number, default: 1 }
                }],
            status: { type: String, required: true },
            total: { type: Number, required: true }
        }
    ],
    refreshToken: { type: String, default: "" }
}, { timestamps: true });
const UserModel = mongoose.models.Users || mongoose.model("Users", UserSchema);
export default UserModel;
//# sourceMappingURL=UserModel.js.map