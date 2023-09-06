import {useState} from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };
  return (
  <div id="background-image">
    <div id="main-container">
      <div id="home-heading">Home</div>
      <Link to={'/Trips'}>
        <button id="all-trips-button" className="button">All trips</button>
      </Link>
      <Link to={'/UserRegistration'}>
        <button id="register-button" className="button">Register</button>
      </Link>
      {token ? (
        <button id="logout-button" className="button" onClick={handleLogout}>Log out</button>
      ) : (
        <Link to="/UserLogin">
          <button className="button">Log in</button>
        </Link>
      )}
    </div>
    </div>
  )
}

export default Home