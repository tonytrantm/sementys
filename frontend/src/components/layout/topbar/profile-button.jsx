import React, { useContext } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { AuthContext } from '../../../common/auth-provider';

export default function ProfileButton() {
  const { user } = useContext(AuthContext);
  return (
    <IconButton>
      <Avatar variant="circular" src={`${process.env.REACT_APP_API_URL}/${user.profile_picture}`} />
    </IconButton>
  );
}
