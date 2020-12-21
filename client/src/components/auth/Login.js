import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log('login Success');
  };
  return (
    <Fragment>
      <h1>Login</h1>
      <i /> Sign in to your account here
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type='text'
          placeholder='Email Address'
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
          minLength='6'
        />
        <input type='submit' value='Log in' />
        <p>
          Don't have an account <Link to='/register'>Register here</Link>
        </p>
      </form>
    </Fragment>
  );
};

export default Login;
