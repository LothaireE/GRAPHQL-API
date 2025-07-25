import { UserType } from '../types/user';

// Mock database for demonstration purposes
// This is a simple in-memory array to simulate user storage.

const userData = [
    {
        name: 'Bob',
        email: 'bob@example.com',
        password: '$2b$10$wWN0AhQKcAiMc9lGL7aWteV6iKd7BXcigYcXZaewIBvUeoMIwy9zu' // use following password in POSTMAN: password123
    },
    {
        name: 'Jim',
        email: 'jim@example.com',
        password: '$2b$10$GsP0mR.2qarbwpQYUlBVL.Tmx6WW9WmsMn01OCfsvQuKQGS9jr3zC' // use following password in POSTMAN: password456
    }
];

class UserModel {
    static findOne = async function (
        email: string
    ): Promise<UserType | undefined> {
        return userData.find((user) => user.email === email);
    };

    static create = async function (user: UserType) {
        userData.push(user);
        return user;
    };
    static findAll = async function (): Promise<UserType[]> {
        return userData;
    };
}

export default UserModel;
