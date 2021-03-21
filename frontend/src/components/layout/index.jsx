import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Sidebar from './sidebar';
import Topbar from './topbar';

const useStyle = makeStyles((theme) => ({
  container: {
    paddingLeft: theme.sidebarWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

export default function Layout(props) {
  const { children } = props;
  const { container, toolbar } = useStyle();
  return (
    <Box>
      <Topbar />
      <Sidebar />
      <Box className={container}>
        <div className={toolbar} />
        {children}
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};
