import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, permission, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      permission ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default ProtectedRoute;