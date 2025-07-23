/**
 * This is a basic Schema for validating login data. I can replace it with any other validation library at any given point.
 *
 * @remarks
 * Provides an asynchronous `validateAsync` method to validate
 *
 * @property validateAsync - Asynchronously validates the provided data object.
 * Throws an error with a `details` property containing validation messages if validation fails.
 */

type signupData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export const signupSchema = {
    async validateAsync(data: signupData) {
        const errors: string[] = [];

        if (
            !data.name ||
            typeof data.name !== 'string' ||
            data.name.trim() === '' ||
            data.name.length < 2
        ) {
            errors.push('Invalid or missing name.');
        }
        if (
            !data.email ||
            typeof data.email !== 'string' ||
            !data.email.includes('@')
        ) {
            errors.push('Invalid or missing email.');
        }

        if (
            !data.password ||
            typeof data.password !== 'string' ||
            data.password.length < 6
        ) {
            errors.push('Invalid or missing password.');
        }

        if (
            !data.confirmPassword ||
            typeof data.confirmPassword !== 'string' ||
            data.confirmPassword.length < 6 ||
            data.confirmPassword !== data.password
        ) {
            errors.push('Invalid or missing confirm password.');
        }

        if (errors.length > 0) {
            const error = new Error('Validation failed');
            (error as any).details = errors;
            throw error;
        }

        const validData = {
            name: data.name.trim(),
            email: data.email.trim(),
            password: data.password
        };
        console.log('Valid signup data dans signup schema :', validData);
        return validData;
    }
};
