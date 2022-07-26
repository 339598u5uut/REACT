import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children, ...rest }) {

const userIsAuthenticated = useSelector(state => state.user.isAuthenticated);
return (
  <Route
  {...rest}
  render={({ location }) =>
  userIsAuthenticated ? (
          children
      ) : (
          <Redirect
              to={{
                  pathname: 'login',
                  state: { from: location }
              }}
          />
      )
  }
/>
);
} 
