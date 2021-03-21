import React, { createContext, useEffect, useState } from 'react';
import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import axios from '../tools/api';

export const AuthContext = createContext();

const useStyle = makeStyles({
  loadingScreen: {
    height: '100vh',
  },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { loadingScreen } = useStyle();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('/user/authenticated', { token })
      .then((result) => {
        setUser(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading
        ? (
          <Grid container justify="center" alignItems="center" className={loadingScreen}>
            <CircularProgress />
          </Grid>
        ) : (
          <AuthContext.Provider value={{ user, setUser }}>
            {children}
          </AuthContext.Provider>
        )}
    </div>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};
