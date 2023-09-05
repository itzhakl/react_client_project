import React from 'react'

type Trip = {
  name: string;
  destination: string;
  startDate: string;
  image: string;
  id: string;
  endDate: string;
}

type Props = {
  trip: Trip
}

const CreateTrip = (props: Props) => {
  return (
    <div>
      <p>{props.trip.destination}</p>
      <p>{props.trip.endDate}</p>
      <p>{props.trip.id}</p>
      <img src={props.trip.image}></img>
      <p>{props.trip.name}</p>
      <p>{props.trip.startDate}</p>
    </div>
  )
}

export default CreateTrip