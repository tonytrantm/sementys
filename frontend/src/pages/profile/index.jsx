import React from 'react';
import { Box } from '@material-ui/core';
import Profile from '../../components/profile';

export default function ProfilePage() {
  return (
    <div className="container">
      <Box px={10}>
        <h1>Your Profile</h1>
      </Box>
      <Profile />
    </div>
  );
}
