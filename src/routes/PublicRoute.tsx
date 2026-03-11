import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const { logout } = useAuth();
    const location = useLocation();

    useEffect(() => {
        logout();
    }, [logout, location.pathname]);

    return <>{children}</>;
};

export default PublicRoute;
