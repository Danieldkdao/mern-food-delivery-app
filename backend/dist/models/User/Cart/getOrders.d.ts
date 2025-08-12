declare const getOrders: (userId: string) => Promise<{
    success: boolean;
    message: string;
    orders: {
        order: {
            id: import("mongoose").Types.ObjectId | import("../UserModel.js").IFood;
            quantity: number;
        }[];
        status: string;
        total: number;
    }[] | undefined;
} | {
    success: boolean;
    message: string;
    orders?: never;
}>;
export default getOrders;
//# sourceMappingURL=getOrders.d.ts.map