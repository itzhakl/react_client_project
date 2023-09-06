// import React from 'react'
// import TripDetail from './TripDetail'
// import {Link} from 'react-router-dom'

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
      <h2 key={'destination'}>{props.trip.destination}</h2>
      <h2 key={'endDate'}>{props.trip.endDate}</h2>
      <h2 key={'id'}>{props.trip.id}</h2>
      <img key={'image'} src={props.trip.image}></img>
      <h2 key={'name'}>{props.trip.name}</h2>
      <h2 key={'startDate'}>{props.trip.startDate}</h2>
    </div>
  )
}

export default CreateTrip