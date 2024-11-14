import { useAuth } from '../../contexts/auth/auth_context';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginForm = ({ setNewUser }) => {
  const nav = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);

  const handleClick = () => {
    setNewUser(true);
  };

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(formData);
      nav('/dashboard');
    } catch (err) {
      let newArr = err.response.data.errors.map((e) => {
        return <p>{e.msg}</p>;
      });

      setErrors(newArr);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
  }

  return (
    <div className='forms'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <label htmlFor='email'>Email: </label>
        <input
          onChange={handleChange}
          type='email'
          id='email'
          name='email'
          placeholder='Email'
        />
        <label htmlFor='password'>Password: </label>
        <input
          onChange={handleChange}
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          minLength='6'
        />
        <button type='submit'>Log In</button>
      </form>
      {errors.length > 0 ? errors : null}
      <p>
        Dont have an account? <button onClick={handleClick}>Sign Up</button>
      </p>
    </div>
  );
};

export default LoginForm;
