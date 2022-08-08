import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useEffect, FC } from 'react';
import { getUser } from '../services/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../services/reducers/root-reducer';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {

    const userIsAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
    const userLoading = useSelector((state: any) => state.user.getUserRequest);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch<any>(getUser())
    }, []);

    if (userLoading || userIsAuthenticated === null) {
        return null;
    }
    return (
        <Route
            {...rest}
            render={({ location }): any =>
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
