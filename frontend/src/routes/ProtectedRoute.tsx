import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthUser } from '@hooks/useAuthUser';
import toast from 'react-hot-toast';

interface ProtectedRouteProps {
    element: React.ReactNode;
    roles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, roles }) => {
    const { user, role } = useAuthUser();

    if (!user) {
        return <Navigate to='/signin' />;
    }
    if (!role || !roles.includes(role)) {
        toast.error(
            "You don't have access yet, please contact admin for access!!",
            {
                style: {
                    background: "white",
                    color: "black",
                },
                iconTheme: {
                    primary: "black",
                    secondary: "white",
                },
            }
        );
        return <Navigate to='/' />;
    }
    return <>{element}</>;
};

export default ProtectedRoute;
