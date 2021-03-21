import React from 'react';
import { Drawer, makeStyles } from '@material-ui/core';
import SidebarList from './list';

const useStyle = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: theme.sidebarWidth,
    backgroundColor: theme.palette.primary.main,
    '& *': {
      color: theme.palette.primary.contrastText,
    },
  },
}));

export default function Sidebar() {
  const { drawerPaper, toolbar } = useStyle();
  return (
    <Drawer
      open
      variant="persistent"
      ModalProps={{ keepMounted: true }}
      classes={{ paper: drawerPaper }}
    >
      <div className={toolbar} />
      <SidebarList />
    </Drawer>
  );
}
