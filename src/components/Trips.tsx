import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
// import CreateTrip from './CreateTrip'
import { TokenId, StatusContext } from '../App'

type Trip = {
  name: string;
  destination: string;
  startDate: string;
  image: string;
  id: string;
  endDate: string;
}

const Trips = () => {
  const [trips, setTrips] = useState<Trip[]>([])
  const tripIde = useContext(TokenId)
  const { status, setStatus } = useContext(StatusContext)
  const handleDelete = (id: string) => {
    const fetching = async () => {
      const response = await fetch(`http://localhost:3000/api/trips/${id}`, {
        method: 'DELETE',
        headers: {
          "authorization": "test-token",
        }
      })
      const data = await response.json();
      console.log(data, id);

      setStatus(prev => !prev)
    }
    fetching()
  }

  useEffect(() => {
    const allTrips = async () => {
      const trips = await fetch('http://localhost:3000/api/trips/', { method: 'GET' });
      const data = await trips.json();
      console.log(data);
      setTrips(data)
    }
    allTrips()
  }, [status]
  )
  return (
    <>
      <Link to={'/'}>
        <button>Home page</button>
      </Link>
      {
        localStorage.getItem('token') ?
          <Link to={'/NewTripForm'}><button>New trip</button></Link> :
          <Link to={'/UserLogin'}><button>login</button></Link>
      }
      <h1>All Trips</h1>
      <div key={'dad'}>
        {
          trips.map((element, index) =>
            <div key={index + '9'}>
              <div key={element.id}>
                <h2 key={'destination'}>{element.destination}</h2>
                <h2 key={'endDate'}>{element.endDate}</h2>
                <h2 key={'id'}>{element.id}</h2>
                <img key={'image'} src={element.image}></img>
                <h2 key={'name'}>{element.name}</h2>
                <h2 key={'startDate'}>{element.startDate}</h2>
              </div>
              {/* <CreateTrip key={element.id} trip={element} /> */}
              <Link key={'detail'} to={`/TripDetail/${element.id}`}>
                <button onClick={() => tripIde.setTokenId(element.id)}>More Detail</button>
              </Link>
              {localStorage.getItem('token') ?
                <button onClick={() => handleDelete(element.id)}>delete trip</button> :
                null}
              {localStorage.getItem('token') ?
                <Link to={`/UpdateTripForm/${element.id}`}>
                  <button onClick={() => tripIde.setTokenId(element.id)}>Edit trip</button>
                </Link> :
                null}
            </div>
          )}
      </div>
    </>
  )
}

export default Trips