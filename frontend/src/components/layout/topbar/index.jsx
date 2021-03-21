import React from 'react';
import {
  AppBar,
  Button,
  Grid,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import ProfileButton from './profile-button';

const useStyle = makeStyles((theme) => ({
  appbar: {
    paddingLeft: theme.sidebarWidth,
    backgroundColor: grey[50],
    '& *': {
      color: grey[700],
    },
  },
}));

export default function Topbar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = '/login';
  };

  return (
    <AppBar position="fixed" className={useStyle().appbar}>
      <Toolbar>
        <Grid container justify="flex-end">
          <ProfileButton />
          <Button onClick={handleLogout}>Logout</Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
