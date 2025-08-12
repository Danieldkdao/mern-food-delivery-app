declare const getCart: (userId: string) => Promise<{
    success: boolean;
    message: string;
    cart: {
        id: import("mongoose").Types.ObjectId | import("../UserModel.js").IFood;
        quantity: number;
    }[] | undefined;
} | {
    success: boolean;
    message: string;
    cart?: never;
}>;
export default getCart;
//# sourceMappingURL=getCart.d.ts.map