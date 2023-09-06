import { useState } from 'react'
import { Link } from 'react-router-dom'
// import {TokenId} from '../App'


const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  // const {tokenId, setTokenId} = useContext(TokenId);
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const body = {
      email: email,
      password: password
    };

    try {
      const response = await fetch(
        'http://localhost:3000/api/auth/login',
        {
          method: 'POST',
          headers: {
            "authorization": "test-token",
            "Content-Type": "application/json"},
          body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error('Login failed');
      }

      localStorage.setItem('token', data.responseObj.token)
      // setTokenId(data)
      setLoginSuccess(true);
    } catch (error) {
      setError(`Error: ` + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button>
        <Link to={'/'}>Home</Link>
      </button>
      <div>User login</div>
      {loginSuccess ? (
        <>
          <p>login successful! You now a manager.</p>
          <Link to={'/Trips'}><button>All trips</button></Link>
        </>
      ) : (
        <form onSubmit={login}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'login...' : 'Login'}
          </button>
          {error && <p>{error}</p>}
        </form>
      )}
    </>
  );
};

export default UserLogin;