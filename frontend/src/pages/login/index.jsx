import React from 'react';
import {
  Box,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import LoginForm from './login-form';

const useStyle = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  wrap: {
    backgroundColor: grey[100],
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

export default function LoginPage() {
  const { root, header, wrap } = useStyle();
  return (
    <Grid container justify="center" alignItems="center" className={root}>
      <Grid item xs={12} md={4} className={wrap}>
        <Box p={3} className={header}>
          <Typography align="center" variant="h5">Login</Typography>
        </Box>
        <Box p={3}>
          <LoginForm />
        </Box>
      </Grid>
    </Grid>
  );
}
