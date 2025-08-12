import express, {} from 'express';
import getFoods from '../models/Foods/getFoods.js';
const foodRoute = express.Router();
foodRoute.use('/uploads', express.static("uploads"));
foodRoute.get('/getFoods', async (req, res) => {
    const response = await getFoods();
    res.json(response);
});
export default foodRoute;
//# sourceMappingURL=FoodRoute.js.map