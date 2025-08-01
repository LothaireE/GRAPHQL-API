import { UserType, CreateUserType } from '../types/user';
import db from '../db/db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import { firstElem } from '../utils/firstItem';

class UserModel {
    static findOne = async function (
        email: string
        // ): Promise<UserType | undefined> =>
    ): Promise<UserType | undefined> {
        const user = db.query.users.findFirst({
            where: eq(users.email, email)
        });
        return user ?? undefined;
    };

    static create = async function (
        newUser: CreateUserType
    ): Promise<UserType | undefined> {
        // const createdUserArray = await db
        //     .insert(users)
        //     .values(newUser)
        //     .returning();
        // const createdUser = firstElem(createdUserArray);
        const [createdUser] = await db
            .insert(users)
            .values(newUser)
            .returning();
        return createdUser;
    };

    static findAll = async function (): Promise<Array<UserType>> {
        const allUsers = await db.select().from(users);
        return allUsers;
    };
}

export default UserModel;
