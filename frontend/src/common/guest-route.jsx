import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './auth-provider';

const GuestRoute = ({ component: Component, ...rest }) => {
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

export default GuestRoute;

GuestRoute.propTypes = {
  component: PropTypes.func,
};
GuestRoute.defaultProps = {
  component: null,
};
