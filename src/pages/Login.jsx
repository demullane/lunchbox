
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import logoImg from '../images/lunchbox.svg';
import { Card, Logo, Form, Input, Button, Error } from '../components/AuthForm';
import { useAuth } from '../context/auth';

const Login = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthTokens } = useAuth();
  const referer = (props.location.state && props.location.state.referer) || '/';

  const postLogin = () => {
    console.log('email: ', email);
    console.log('password: ', password);
    axios.post('http://localhost:3001/authenticate',
      { email, password },
      { headers: { 'Content-Type': 'application/json' } },
    ).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isLoggedIn) {
    return <Redirect to={referer} />;
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
          placeholder="email"
        />
        <Input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
          placeholder="password"
        />
        <Button onClick={postLogin}>Sign In</Button>
      </Form>
      <Link to="/signup">Don't have an account?</Link>
      { isError && <Error>The email or password provided were incorrect!</Error> }
    </Card>
  );
}

export default Login;
