import UserModel from '../models/user.model';
import { CreateUserType, UserType } from '../types/user';
import bcrypt from 'bcrypt';
import {
    addDaysFromNow,
    generateAccessToken,
    generateRefreshToken
} from '../utils/tokens';
import { RefreshTokenModel } from '../models/refreshToken.model';

type LoginProps = {
    email: string;
    password: string;
};

type SignupProps = {
    username: string;
    email: string;
    password: string;
};

type JWTPayload = {
    userId: string;
    username: string;
    source: string;
};

class AuthService {
    static async signup(data: SignupProps): Promise<UserType> {
        const emailExist = await UserModel.findOne(data.email);

        if (emailExist) throw new Error('EMAIL_ALREADY_EXIST');

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await UserModel.create({
            ...data,
            password: hashedPassword
        });

        if (!newUser) throw new Error('CREATE_FAILED');

        return newUser;
    }

    static async login(data: LoginProps) {
        const { email, password } = data;

        const user = await UserModel.findOne(email);

        if (!user) throw new Error('INVALID_CREDENTIALS');

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) throw new Error('INVALID_CREDENTIALS');

        const accessToken = generateAccessToken(
            user.id,
            user.username,
            'login'
        );

        const refreshToken = generateRefreshToken(user.id, user.username);
        const expiresAt = addDaysFromNow();

        console.log('before ===> '); // tout fonctionne jusque la, le after ne sort pas
        await RefreshTokenModel.store(user.id, refreshToken, expiresAt);
        // await RefreshTokenModel.store(user.id, user.username, expiresAt);
        console.log('after ===> ');

        return {
            user,
            accessToken,
            refreshToken
        };
    }
}

export default AuthService;
