import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: React.ReactNode;
    path: string;
    [key: string]: any; // Other potential props
}

const ProtectedRoute = ({ children }: { children: any }) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/not-logged-in" replace />;
    }

    return children;
};
export default ProtectedRoute;
