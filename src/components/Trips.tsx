import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreateTrip from './CreateTrip'

type Props = {
  trip: Trip
}
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
  useEffect(() => {
    const allTrips = async () => {
      const trips = await fetch('http://localhost:3000/api/trips/');
      const data = await trips.json();
      console.log(data);
      setTrips(data)
    }
    allTrips()
  }, []
  )
  return (
    <>
      <div>Trips</div>
      <Link to={'/'}><button>Home page</button></Link>
      <Link to={'/NewTripForm'}><button>create trip</button></Link>
      <p>{trips.map(Element => <CreateTrip trip={Element}/>)}</p>
    </>
  )
}

export default Trips