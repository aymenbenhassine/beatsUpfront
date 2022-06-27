import { useState } from 'react';
// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  return (
    <Avatar
      src={user.result?.imageUrl}
      alt={user.result?.name || user?.result?.username}
      color={user.result?.imageUrl ? 'default' : createAvatar(user?.displayName).color}
      {...other}
    >
      {createAvatar(user?.result?.name).name}
    </Avatar>
  );
}
