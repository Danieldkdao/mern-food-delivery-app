import UserModel from './UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const loginUser = async (email, password) => {
    try {
        const user = await UserModel.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password)))
            return { success: false, message: "User not found." };
        const payload = {
            id: user._id,
            name: user.name
        };
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "10m"
        });
        return { success: true, message: "User logged in successfully!", accessToken, payload };
    }
    catch (error) {
        console.error(error);
        return { success: false, message: "Failed to login user." };
    }
};
export default loginUser;
//# sourceMappingURL=loginUser.js.map