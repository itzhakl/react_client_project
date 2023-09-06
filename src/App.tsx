import { useState, createContext } from 'react'
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

type Token = {
  tokenId: string
  setTokenId: React.Dispatch<React.SetStateAction<string>>
}

type Status = {
  status: boolean
  setStatus: React.Dispatch<React.SetStateAction<boolean>>
}

export const TokenId = createContext<Token>({tokenId:'', setTokenId:()=>{}})
export const StatusContext = createContext<Status>({status:true, setStatus:()=>{}})

function App() {
  // const [tokenId, setTokenId] = useState<string>('test-token')
  const [status, setStatus] = useState(true)
  return (
    <StatusContext.Provider value={{status, setStatus}}>
    {/* <TokenId.Provider value={{tokenId, setTokenId}}> */}
    <Router>
      <Routes>
        <Route path='/' element={< Home />}></Route>
        <Route path='/Trips' element={< Trips />}></Route>
        <Route path='/TripDetail/:id' element={< TripDetail />}></Route>
        <Route path='/NewTripForm' element={< NewTripForm />}></Route>
        <Route path='/UpdateTripForm/:id' element={< UpdateTripForm />}></Route>
        <Route path='/UserLogin' element={< UserLogin />}></Route>
        <Route path='/UserRegistration' element={< UserRegistration />}></Route>
      </Routes>
    </Router>
    {/* </TokenId.Provider> */}
    </StatusContext.Provider>
  )
}

export default App
