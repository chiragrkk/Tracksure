import { useContext } from 'react';

import { AuthContext } from '@context/AuthContext';

export const useAuthActions = () => {
    const { signUp, signIn, signOut, setUserRole } = useContext(AuthContext);
    return { signUp, signIn, signOut, setUserRole };
}
