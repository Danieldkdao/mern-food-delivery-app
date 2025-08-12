import UserModel from './UserModel.js'

const registerUser = async (name: string, email: string, password: string) => {
    try {
        const user = new UserModel({
            name,
            email,
            password,
            cart: [],
            orders:[]
        });
        await user.save();
        return {success: true, message: "User created successfully!"};
    } catch (error) {
        console.error(error);
        return {success: false, message: "Failed to register user."};
    }
}

export default registerUser;