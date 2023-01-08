import './App.scss';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage'
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Alert } from "./components/alert/Alert"
import { refreshToken } from "./redux/actions/authAction"
import { useDispatch, useSelector } from "react-redux"
import Navbar from "./components/Navbar"
import Menu from "./components/Menu"
import {TodoContextProvider} from "./context/TodoContext"



const App = () => {
  const dispatch = useDispatch()
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const [dayNight, setDayNight] = useState(false)

  const { authReducer } = useSelector(state => state)



  useEffect(() => {

    dispatch(refreshToken())
  }, [dispatch])





  return (
    <TodoContextProvider value={{ dayNight, setDayNight }}>
    <Router>
        <Alert />
        <Navbar
          hamburgerMenu={hamburgerMenu}
          setHamburgerMenu={setHamburgerMenu}
        />
        <Menu
          hamburgerMenu={hamburgerMenu}
          setHamburgerMenu={setHamburgerMenu}
        />

        <Routes>
          <Route exact path="/login" element={<Login userData={authReducer} />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element = { <Homepage setHamburgerMenu={setHamburgerMenu} />} />
        </Routes>
    </Router>
     </TodoContextProvider >
  )
}


export default App