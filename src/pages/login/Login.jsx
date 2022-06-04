import './login.css';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../redux/Actions/AdminActions';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const disPatch = useDispatch();

  const admin = useSelector((state) => state.adminLogin);
  const { adminInfo, error, loading } = admin;
  const history = useHistory();
  useEffect(() => {
    if (adminInfo) {
      history.push('/');
    }
  }, [adminInfo, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    disPatch(adminLogin(email, password));
  };
  return (
    <div className='login'>
      <form className='login-form' onSubmit={handleSubmit}>
        <p className='title'>BRONZE ADMIN</p>
        {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
        {loading && <p style={{ textAlign: 'center', color: 'green' }}>loading ...</p>}
        <input
          type='email'
          placeholder='admin'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
