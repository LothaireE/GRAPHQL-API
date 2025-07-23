export type UserModelType = {
    findOne(query: { email: string }): Promise<User | undefined>;
    create(user: User): Promise<User>;
};

export type UserType = {
    name: string;
    email: string;
    password: string;
};
