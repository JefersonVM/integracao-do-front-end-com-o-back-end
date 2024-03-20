import { useState } from 'react';
import './styles.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [Passsword, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='Passsword'
          value={Passsword}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>
          Login
        </button>
      </form>
    </div>
  );
}

export default SignIn;
