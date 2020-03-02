import React from 'react';
import { Button } from '../components/AuthForm';
import { useAuth } from '../context/auth';

const Admin = (props) => {
  const { setAuthTokens } = useAuth();

  const logOut = () => {
    setAuthTokens();
  }

  return (
    <>
      <div>Admin Page</div>
      <Button onClick={logOut}>Log out</Button>
    </>
  )
}

export default Admin;
