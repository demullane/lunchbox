import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import logoImg from '../images/lunchbox.svg';
import { Card, Logo, Form, Input, Button, Error } from '../components/AuthForm';
import { useAuth } from '../context/auth';

const Signup = () => {
  const [isSignedUp, setSignedUp] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthTokens } = useAuth();

  const postSignUp = () => {
    axios.post('https://www.somePlace.com/auth/signup', {
      email,
      password,
    }).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setSignedUp(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    })
  };

  if (isSignedUp) {
    return <Redirect to="/" />
  }

  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input
          type="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          placeholder="email" />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        {/* <Input
          type="password"
          value={passwordConfirmation}
          onChange={e => {
            setPassword()
          }}
          placeholder="confirm password"
        /> */}
        <Button onClick={postSignUp}>Sign Up</Button>
      </Form>
      <Link to="/login">Already have an account?</Link>
      { isError && <Error>The email you entered has already been taken!</Error> }
    </Card>
  );
}

export default Signup;
