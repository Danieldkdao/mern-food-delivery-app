import express, { type Request, type Response } from 'express';
import getFoods from '../models/Foods/getFoods.js';
import type { IFood } from '../models/Foods/FoodModel.js';

type FoodRes1 = {
    success: boolean
    message: string
    foods?: IFood[]
}

const foodRoute = express.Router();

foodRoute.use('/uploads', express.static("uploads"));

foodRoute.get('/getFoods', async (req: Request, res: Response<FoodRes1>) => {
    const response = await getFoods();
    res.json(response);
});

export default foodRoute;