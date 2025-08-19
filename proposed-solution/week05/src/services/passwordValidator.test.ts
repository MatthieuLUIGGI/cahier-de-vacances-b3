import {validatePassword} from './passwordValidator';

describe('validatePassword', () => {
    test.each([
        'Valid123@',
        'Valid123@#$',
        'ValidPassword123@'
    ])(
        'should accept valid password $description',
        (password) => {
            const result = validatePassword(password);
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        }
    );

    interface InvalidPasswordTestCase {
        description: string;
        password: string;
        expectedError: string;
    }

    const singleErrorCases: InvalidPasswordTestCase[] = [
        {
            description: 'too short',
            password: 'Val1@',
            expectedError: 'Password must be at least 8 characters long'
        },
        {
            description: 'no uppercase letters',
            password: 'valid123@',
            expectedError: 'Password must contain at least one uppercase letter'
        },
        {
            description: 'no lowercase letters',
            password: 'VALID123@',
            expectedError: 'Password must contain at least one lowercase letter'
        },
        {
            description: 'no numbers',
            password: 'ValidTest@',
            expectedError: 'Password must contain at least one number'
        },
        {
            description: 'no cyber-symbols',
            password: 'Valid123',
            expectedError: 'Password must contain at least one cyber-symbol (. * # @ $ % &)'
        },
        {
            description: 'invalid characters',
            password: 'Valid123!',
            expectedError: 'Invalid characters detected: !'
        }
    ];

    test.each(singleErrorCases)(
        'should reject password with $description',
        ({password, expectedError}) => {
            const result = validatePassword(password);
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain(expectedError);
        }
    );

    interface MultiErrorTestCase {
        description: string;
        password: string;
        expectedErrors: string[];
    }

    const multiErrorCases: MultiErrorTestCase[] = [
        {
            description: 'short with invalid character',
            password: 'pass!',
            expectedErrors: [
                'Password must be at least 8 characters long',
                'Password must contain at least one uppercase letter',
                'Password must contain at least one number',
                'Password must contain at least one cyber-symbol (. * # @ $ % &)',
                'Invalid characters detected: !'
            ]
        },
        {
            description: 'no uppercase or number',
            password: 'password@',
            expectedErrors: [
                'Password must contain at least one uppercase letter',
                'Password must contain at least one number'
            ]
        }
    ];

    test.each(multiErrorCases)(
        'should report multiple validation errors for $description',
        ({password, expectedErrors}) => {
            const result = validatePassword(password);
            expect(result.isValid).toBe(false);
            expectedErrors.forEach(error => {
                expect(result.errors).toContain(error);
            });
            expect(result.errors).toHaveLength(expectedErrors.length);
        }
    );
});