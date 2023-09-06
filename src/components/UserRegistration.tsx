import { useState } from 'react'
import { Link } from 'react-router-dom'


const UserRegistration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const regist = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const body = {
      email: email,
      password: password
    };

    try {
      const response = await fetch(
        'http://localhost:3000/api/auth/register',
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "authorization": "test-token",
          },
          body: JSON.stringify(body),
        });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log(data);
      setRegistrationSuccess(true);
    } catch (error) {
      setError(`Error: ` + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Link to={'/'}>
        <button>Home</button>
      </Link>
      <div>User Registration</div>
      {registrationSuccess ? (
        <>
        <p>Registration successful! You can now log in.</p>
        <Link to={'/UserLogin'}>
        <button>Login</button>
        </Link>
        </>
      ) : (
        <form onSubmit={regist}>
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
            {loading ? 'registering...' : 'Register'}
          </button>
          {error && <p>{error}</p>}
        </form>
      )}
    </>
  );
};

export default UserRegistration;