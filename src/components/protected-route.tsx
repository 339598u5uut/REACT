import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useEffect, FC } from 'react';
import { getUser } from '../services/actions/user';
import { useDispatch,useSelector } from '../services/reducers/root-reducer';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser())
    }, []);

    const userIsAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const userLoading = useSelector((state) => state.user.getUserRequest);
    
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
