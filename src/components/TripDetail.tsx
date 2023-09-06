import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

type Trip = {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  description: string;
  price: number;
  image: string;
  activities: string[];
  id: string;
}


const TripDetail = () => {
  const [trip, setTrip] = useState<Trip | null>(null);
  const {id} = useParams()
  useEffect(() => {
    async function fetchTrip() {
      try {
        const response = await fetch(`http://localhost:3000/api/trips/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch trip')
        }
        const data = await response.json();
        setTrip(data);
        console.log(data);
      } catch (err) {
        console.error(err)
      }
    }
    fetchTrip();
  }, [id]);

  return (
    <>
      <Link to={'/Trips'}>
        <button>all trips</button>
      </Link>
      <Link to={'/'}>
        <button>Home page</button>
      </Link>
      <div>TripDetail</div>
      {trip ? (
        <div>
          <h2>{trip.id}</h2>
          <h2>{trip.name}</h2>
          <h2>{trip.destination}</h2>
          <h2>{trip.startDate}</h2>
          <h2>{trip.endDate}</h2>
          <h2>{trip.description}</h2>
          <p>Price: ${trip.price}</p>
          <div>
            <h3>Activities:</h3>
            <ul>
              {trip.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
          <img src={trip.image}></img>
        </div>
      ) : (
        <p>Loading trip details...</p>
      )}

    </>
  )
}

export default TripDetail