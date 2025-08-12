import mongoose from "mongoose";
const connectToDB = async () => {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error("Database url is not defined!");
        }
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connected.");
    }
    catch (error) {
        console.error(error);
    }
};
export default connectToDB;
//# sourceMappingURL=connectToDB.js.map