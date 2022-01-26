import React from 'react'
import { NavLink } from 'react-router-dom'

function Header({logIn, setLogIn, userName}) {
  const handleLog = () =>{
    localStorage.getItem('logIn', false)
    setLogIn(false);
  }
    return (
    <header>
      {
        logIn ?
        <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink onClick={handleLog} to="/profile">Profile - {userName}</NavLink>
      </nav>
      :
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink onClick={handleLog} to="/profile">Profile</NavLink>
      </nav>
      }
      
    </header>
    )
}

export default Header
