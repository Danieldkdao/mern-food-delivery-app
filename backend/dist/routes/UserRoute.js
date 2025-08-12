import express, {} from 'express';
import registerUser from '../models/User/registerUser.js';
import jwt, {} from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import loginUser from '../models/User/loginUser.js';
import UserModel from '../models/User/UserModel.js';
import addToCart from '../models/User/Cart/addToCart.js';
import getCart from '../models/User/Cart/getCart.js';
import removeCart from '../models/User/Cart/removeCart.js';
import getCartPopulate from '../models/User/Cart/getCartPopulate.js';
import removeCartItem from '../models/User/Cart/removeCartItem.js';
import updateQuantity from '../models/User/Cart/updateQuantity.js';
import createOrder from '../models/User/Cart/createOrder.js';
import getOrders from '../models/User/Cart/getOrders.js';
const userRoute = express.Router();
function authenticateUser(req, res, next) {
    const headers = req.headers["authorization"];
    const token = headers && headers.split(" ")[1];
    if (!token)
        return res.json("No token found.");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.json("You are not authorized.");
        }
        req.user = decoded;
        next();
    });
}
userRoute.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const response = await registerUser(name, email, hashedPassword);
        if (!response?.success)
            return res.json(response);
        const logged = await loginUser(email, password);
        if (!logged?.success || !logged.payload)
            return res.json(logged);
        const refreshToken = jwt.sign(logged.payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "7d"
        });
        await UserModel.findByIdAndUpdate(logged.payload.id, { refreshToken });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.json(logged);
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: "Something went wrong registering user." });
    }
});
userRoute.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const logged = await loginUser(email, password);
        if (!logged?.success || !logged.payload)
            return res.json(logged);
        const refreshToken = jwt.sign(logged.payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "7d"
        });
        await UserModel.findByIdAndUpdate(logged.payload.id, { refreshToken });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.json(logged);
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: "Login failed." });
    }
});
userRoute.get('/dashboard', authenticateUser, (req, res) => {
    res.json({ success: true, message: "User authorized successfully!", info: req.user });
});
userRoute.get('/refresh', async (req, res) => {
    const oldRefreshToken = req.cookies.refreshToken;
    if (!oldRefreshToken)
        return res.json("Token not found.");
    try {
        const { id, name } = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const payload = { id, name };
        const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        const newRefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "7d"
        });
        await UserModel.findByIdAndUpdate(payload.id, { refreshToken: newRefreshToken });
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        res.json({ success: true, message: "Refresh successful!", newAccessToken });
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: "An error occurred while trying to refresh." });
    }
});
userRoute.delete('/logout', async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token)
        return res.json({ success: false, message: "No token exists." });
    const decoded = jwt.decode(token);
    await UserModel.findByIdAndUpdate(decoded.id, { refreshToken: "" });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });
    res.json({ success: true, message: "User logged out successfully!" });
});
userRoute.put('/addToCart', async (req, res) => {
    const { userId, itemId, exists } = req.body;
    const response = await addToCart(userId, itemId, exists);
    res.json(response);
});
userRoute.get('/getCart/:userId', async (req, res) => {
    const response = await getCart(req.params.userId);
    res.json(response);
});
userRoute.get('/getCartPopulate/:userId', async (req, res) => {
    const response = await getCartPopulate(req.params.userId);
    res.json(response);
});
userRoute.put('/removeCart', async (req, res) => {
    const { userId, itemId, zero } = req.body;
    const response = await removeCart(userId, itemId, zero);
    res.json(response);
});
userRoute.delete('/removeCartItem', async (req, res) => {
    const response = await removeCartItem(req.query.userId, req.query.itemId);
    res.json(response);
});
userRoute.put('/updateQuantity', async (req, res) => {
    const { userId, itemId, num } = req.body;
    const response = await updateQuantity(userId, itemId, num);
    res.json(response);
});
userRoute.post('/createOrder', async (req, res) => {
    const response = await createOrder(req.body.userId, req.body.total);
    res.json(response);
});
userRoute.get('/getOrders/:userId', async (req, res) => {
    const response = await getOrders(req.params.userId);
    res.json(response);
});
export default userRoute;
//# sourceMappingURL=UserRoute.js.map