import React from 'react'
import {Link} from 'react-router-dom'

type Props = {
  page: string
}

function Home() {
  return (
    <>
      <div>Home</div>
      <Link to={'/Trips'}><button>All trips</button></Link>
      <Link to={'/UserRegistration'}><button>regist</button></Link>
      <Link to={'/UserLogin'}><button>login</button></Link>
    </>
  )
}

export default Home