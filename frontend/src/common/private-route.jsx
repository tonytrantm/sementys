import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './auth-provider';
import Layout from '../components/layout';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          return <Redirect to={{ pathname: '/login' }} />;
        }
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.objectOf(PropTypes.any),
};
PrivateRoute.defaultProps = {
  component: null,
};
