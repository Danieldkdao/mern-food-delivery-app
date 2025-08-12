declare const loginUser: (email: string, password: string) => Promise<{
    success: boolean;
    message: string;
    accessToken?: never;
    payload?: never;
} | {
    success: boolean;
    message: string;
    accessToken: string;
    payload: {
        id: unknown;
        name: string;
    };
}>;
export default loginUser;
//# sourceMappingURL=loginUser.d.ts.map