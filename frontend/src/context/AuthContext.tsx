import React, { useState, useEffect, createContext } from 'react';
import app from '@services/firebase';
import { User, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { userSignUpType, userSignInType, defaultUser } from '@schemas/userSchema';
import { UserRole } from '@enums/UserRole';

interface AuthContextType {
    user: User | null;
    userInfo: defaultUser | null;
    role: UserRole | null;
    loading: boolean;
    signUp: (data: userSignUpType) => Promise<User>;
    signIn: (data: userSignInType) => Promise<User>;
    signOut: () => Promise<void>;
    setUserRole: (uid: string, role: UserRole) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userInfo, setUserInfo] = useState<defaultUser | null>(null);
    const [role, setRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const auth = getAuth(app);
    const db = getFirestore(app);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setUser(user);
            if (user) {
                const userDoc = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDoc);
                if (userDocSnap.exists()) {
                    const data = userDocSnap.data();
                    setRole(data.role as UserRole);
                    setUserInfo(data as defaultUser);
                }
            } else {
                setRole(null);
                setUserInfo(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth, db]);

    const signUp = async (data: userSignUpType) => {
        const userCred = await createUserWithEmailAndPassword(auth, data.email, data.password);
        const userDoc = doc(db, 'users', userCred.user.uid);
        await setDoc(userDoc, {
            uid: userCred.user.uid,
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            address: data.address,
            role: UserRole.UNASSIGNED,
            createdAt: new Date(),
        });
        return userCred.user;
    };

    const signIn = async (data: userSignInType) => {
        const userCred = await signInWithEmailAndPassword(auth, data.email, data.password);
        return userCred.user;
    };

    const signOut = async () => {
        setUser(null);
        setUserInfo(null);
        setRole(null);
        await auth.signOut();
    };

    const setUserRole = async (uid: string, role: UserRole) => {
        if (role !== UserRole.ADMIN) {
            throw new Error("Only admins can set roles");
        }
        const userDoc = doc(db, 'users', uid);
        await updateDoc(userDoc, { role });
    };

    return (
        <AuthContext.Provider value={{ user, userInfo, role, loading, signUp, signIn, signOut, setUserRole }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
