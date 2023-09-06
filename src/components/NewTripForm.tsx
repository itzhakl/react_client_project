import { useState } from 'react'
import { Link } from 'react-router-dom'
// import {TokenId} from '../App'

// type Props = {}

const NewTripForm = () => {
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
  const [createSuccess, setCreateSuccess] = useState(false);
  const create = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('Token does not exist');
      }
      const response = await fetch(
        'http://localhost:3000/api/trips',
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "authorization": localStorage.getItem('token')!,
          },
          body: JSON.stringify(body),
        });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log(data);
      setCreateSuccess(true);
    } catch (error) {
      setError(`Error: ` + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Link to={'/Trips'}>
        <button>All trips</button>
      </Link>
      <Link to={'/'}></Link>
      <div>NewTripForm</div>
      {createSuccess ? (
        <>
          <p>create successful!</p>
          <Link to={'/'}><button>Home</button></Link>
        </>
      ) : (
        <form onSubmit={create}>
          <label>name:
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='name' />
          </label><br />
          <label>destination:
            <input
              required
              onChange={(e) => setDestination(e.target.value)}
              value={destination}
              placeholder='destination' />
          </label><br />
          <label>startDate:
            <input required
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
              placeholder='startDate' />
          </label><br />
          <label>endDate:
            <input required
              onChange={(e) => setEndDate(e.target.value)}
              value={endDate}
              placeholder='endDate' />
          </label><br />
          <label>description:
            <input required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder='description' />
          </label><br />
          <label>price:
            <input
              onChange={(e) => setPrice(e.target.value)}
              required
              value={price}
              type='number' placeholder='price' />
          </label><br />
          <label>image:
            <input
              required
              onChange={(e) => setImage(e.target.value)}
              value={image}
              placeholder='image' />
          </label><br />
          <label>activities:
            <input
              required
              onChange={(e) => setActivities(e.target.value)}
              value={activities}
              placeholder='activities' /><br />
          </label>
            {/* <button onClick={(index) => setActivities([...activities.slice(index, 1),])}>delete activities</button><br /> */}
            {/* <button onClick={() => setActivities([...activities, ''])}>add activities</button><br /> */}
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </button>
          {error && <p>{error}</p>}
        </form>
      )}
    </>
  )
}

export default NewTripForm