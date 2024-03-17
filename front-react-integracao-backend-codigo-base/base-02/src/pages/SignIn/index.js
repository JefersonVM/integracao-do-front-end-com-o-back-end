import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      console.log('Preencha todos os campos!');
    }

    navigate('/main');
  }

  return (
    <div className='container'>
      <form className='form-sign-in' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder='E-mail'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='btn-purple'>
          Login
        </button>
      </form>
    </div>
  );
}

export default SignIn;
