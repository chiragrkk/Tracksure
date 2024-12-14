import { UserRole } from '@enums/UserRole';
import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

interface defaultUser {
    uid: string;
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
    address: string;
    role: UserRole | null;
    createdAt: Timestamp;
    rfID?: string;
    sensorID?: string;
}

const userSignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string(),
    phoneNumber: z.string(),
    address: z.string(),
});

const userSignInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type userSignUpType = z.infer<typeof userSignUpSchema>;

type userSignInType = z.infer<typeof userSignInSchema>;

export { userSignUpSchema, userSignInSchema };
export type { userSignUpType, userSignInType, defaultUser };
