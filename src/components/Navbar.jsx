import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
return (
    <div className='flex place-content-around'>
        <NavLink to="/" className={({ isActive }) => isActive ? "rounded-md bg-gray-900 p-2 m-2 " : "py-4"}>
            Home
        </NavLink>
        <NavLink to="/pastes" className={({ isActive }) => isActive ? "rounded-md bg-gray-900 p-2 m-2 " : "py-4"}>
            Pastes
        </NavLink>
        <NavLink to="/askAI" className={({ isActive }) => isActive ? "rounded-md bg-gray-900 p-2 m-2 " : "py-4"}>
            Ask AI
        </NavLink>
    </div>
)
}

export default Navbar