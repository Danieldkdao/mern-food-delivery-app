import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToDB from './config/connectToDB.js';
import foodRoute from './routes/FoodRoute.js';
import userRoute from './routes/UserRoute.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

await connectToDB();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use('/foods', foodRoute);
app.use('/users', userRoute);

app.get('/', (req: Request, res: Response) => {
    res.send("Hello, welcome the Food Store backend!")
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));