import { useState, useContext } from 'react'
import './App.css'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Trips from './components/Trips'
import TripDetail from './components/TripDetail'
import NewTripForm from './components/NewTripForm'
import UpdateTripForm from './components/UpdateTripForm'
import UserLogin from './components/UserLogin'
import UserRegistration from './components/UserRegistration'

// export const [page, setpage] = useState('Home')

function App() {
  // switch(page){
  //   case 'Home':
  //     'Home'
  //     break
    
  // }
  return (
    <Router>
      <Routes>
        <Route path='/' element={< Home />}></Route>
        <Route path='/Trips' element={< Trips />}></Route>
        <Route path='/TripDetail' element={< TripDetail />}></Route>
        <Route path='/NewTripForm' element={< NewTripForm />}></Route>
        <Route path='/UpdateTripForm' element={< UpdateTripForm />}></Route>
        <Route path='/UserLogin' element={< UserLogin />}></Route>
        <Route path='/UserRegistration' element={< UserRegistration />}></Route>
      </Routes>
    </Router>
  )
}

export default App
