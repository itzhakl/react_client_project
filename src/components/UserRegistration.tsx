import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

type Props = {}

const UserRegistration = (props: Props) => {
  useEffect(() => {
    const body = {
      "email": "newuser@example.com",
      "password": "password123"
    }
    const registUser = async () => {
      const trips = await fetch(
        'http://localhost:3000/api/auth/register',
        {
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            "authorization ": "test-token",
          }
        }
      );
      const data = await trips.json();
      console.log(data);
    }
    registUser()
  }, []
  )
  return (
    <>
      <div>UserRegistration</div>
      <Link to={'/'}><button>Home</button></Link>
      <br/>
      <input placeholder='email'/>
      <br/>
      <input placeholder='password'/>
      <br/>
      <input placeholder='verify password'/>
    </>
  )
}

export default UserRegistration