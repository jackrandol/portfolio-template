import React, { Fragment, useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('passwords do not match');
    } else {
      console.log(formData);
      const newUser = {
        name,
        email,
        password,
      };
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const body = JSON.stringify(newUser);

        const res = await axios.post('api/users', body, config);
        console.log(res.data);
      } catch (res) {
        console.error(res.error);
      }
    }
  };

  return (
    <Fragment>
      <h1>Register</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={(e) => onChange(e)}
          required
        />
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
        <input
          type='password'
          placeholder='Please repeat password'
          name='password2'
          minLength='6'
          value={password2}
          onChange={(e) => onChange(e)}
        />
        <input type='submit' value='Register' />
      </form>
    </Fragment>
  );
};

export default Register;
