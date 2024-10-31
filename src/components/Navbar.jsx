import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
return (
    <div className='p-4 flex place-content-evenly'>
        <NavLink to="/">
            Home
        </NavLink>
        <NavLink to="/pastes">
            Pastes
        </NavLink>
    </div>
)
}

export default Navbar