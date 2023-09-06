import {useState} from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  return (
    <>
      <div>Home</div>
      <Link to={'/Trips'}>
        <button>All trips</button>
      </Link>
      <Link to={'/UserRegistration'}>
        <button>regist</button>
      </Link>
      {token ? (
        <button onClick={handleLogout}>Log out</button>
      ) : (
        <Link to="/UserLogin">
          <button>Log in</button>
        </Link>
      )}
    </>
  )
}

export default Home