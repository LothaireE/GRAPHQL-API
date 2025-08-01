export type AuthorizedUser = {
    userId: string;
    username: string;
    source: string;
    iat: number;
    exp: number;
};

export type UserType = {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

// export type CreateUserType = Omit<
//     UserType,
//     'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
// >;

export type CreateUserType = {
    username: string;
    email: string;
    password: string;
};
