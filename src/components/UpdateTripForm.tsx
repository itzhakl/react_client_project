import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import {TokenId} from '../App'

// type Props = {}
type Trip = {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  description: string;
  price: string;
  image: string;
  activities: string;
  id: string;
}

const UpdateTripForm = () => {
  const {id} = useParams()
  const {tokenId} = useContext(TokenId)
  const [name, setName] = useState('')
  const [destination, setDestination] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [activities, setActivities] = useState<string>('')
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [UpdateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    async function fetchTrip() {
      try {
        const response = await fetch(`http://localhost:3000/api/trips/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch trip')
        }
        const data: Trip = await response.json();
        setName(data.name);
        setDestination(data.destination)
        setStartDate(data.startDate)
        setEndDate(data.endDate)
        setDescription(data.description)
        setPrice(data.price)
        setImage(data.image)
        setActivities(data.activities.toString())
        console.log(data);
      } catch (err) {
        console.error(err)
      }
    }
    fetchTrip();
  }, [id]);

  const update = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const body = {
      name: name,
      destination: destination,
      startDate: startDate,
      endDate: endDate,
      description: description,
      price: price,
      image: image,
      activities: activities.split(' ')
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/trips/${id}`,
        {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            "authorization": tokenId,
          },
          body: JSON.stringify(body),
        });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log(data);
      setUpdateSuccess(true);
    } catch (error) {
      setError(`Error: ` + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Link to={'/Trips'}>
        <button>all trips</button>
      </Link>
      <Link to={'/'}></Link>
      <div>UpdateTripForm</div>
      <div>Trip id: {id}</div>
      {UpdateSuccess ? (
        <>
          <p>Update successful!</p>
          <Link to={`/TripDetail/${id}`}><button>Details</button></Link>
        </>
      ) : (
        <form onSubmit={update}>
          <label>name:
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='name' />
          </label><br/>
          <label>destination:
            <input
              required
              onChange={(e) => setDestination(e.target.value)}
              value={destination}
              placeholder='destination' />
          </label><br/>
          <label>startDate:
            <input required
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              placeholder='startDate' />
          </label><br/>
          <label>endDate:
            <input required
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
              placeholder='endDate' />
          </label><br/>
          <label>description:
            <input required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder='description' />
          </label><br/>
          <label>price:
            <input
              onChange={(e) => setPrice(e.target.value)}
              required
              value={price}
              type='number' placeholder='price' />
          </label><br/>
          <label>image:
            <input
              required
              onChange={(e) => setImage(e.target.value)}
              value={image}
              placeholder='image' />
          </label><br/>
          <label>activities:
            <input
              required
              onChange={(e) => setActivities(e.target.value)}
              value={activities}
              placeholder='activities' /><br />
          </label>
          {/* <button onClick={() => setActivities([...activities, ''])}>
            add activities</button><br /> */}
            <button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </button>
            {error && <p>{error}</p>}
        </form>
      )}
    </>
  )
}

export default UpdateTripForm