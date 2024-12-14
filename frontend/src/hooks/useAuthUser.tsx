import { useContext } from 'react';

import { AuthContext } from '@context/AuthContext';

export const useAuthUser = () => {
    const { user, userInfo, role } = useContext(AuthContext);
    return { user, userInfo, role };
}
