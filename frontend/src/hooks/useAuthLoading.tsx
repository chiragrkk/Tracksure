import { useContext } from 'react';

import { AuthContext } from '@context/AuthContext';

export const useAuthLoading = () => {
    const { loading } = useContext(AuthContext);
    return { loading };
}
