import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './auth-provider';

const UnPrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <Redirect to={{ pathname: '/' }} />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default UnPrivateRoute;

UnPrivateRoute.propTypes = {
  component: PropTypes.objectOf(PropTypes.any),
};
UnPrivateRoute.defaultProps = {
  component: null,
};
