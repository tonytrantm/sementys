import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import {
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  listItem: {
    '&:hover': {
      textDecoration: 'none',
      '& div': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
}));

const sidebarItems = [
  { label: 'Dashboard', link: '/', icon: <DashboardIcon /> },
  { label: 'Settings', link: '/settings', icon: <SettingsIcon /> },
];

export default function SidebarList() {
  return (
    <List>
      {sidebarItems.map((item) => (
        <Link key={item.label} href={item.link} className={useStyle().listItem}>
          <ListItem button>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
