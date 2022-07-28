import { Redirect, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';

export function ProtectedRoute({ children, ...rest }) {
    const userIsAuthenticated = useSelector(state => state.user.isAuthenticated);
    const userLoading = useSelector(state => state.user.getUserRequest);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser())
    }, []);

    if (userLoading || userIsAuthenticated === null) {
        return null
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                userIsAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
} 
