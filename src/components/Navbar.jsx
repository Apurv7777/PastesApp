import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex justify-evenly'>
            <NavLink to="/" className={({ isActive }) => isActive ? "rounded-xl p-3 bg-gray-800 py-2 mb-4" : "py-2 p-3 mb-4"}>
                Home
            </NavLink>
            <NavLink to="/pastes" className={({ isActive }) => isActive ? "rounded-xl p-3 bg-gray-800 py-2 mb-4" : "py-2 p-3 mb-4"}>
                Pastes
            </NavLink>
            <NavLink to="/askAI" className={({ isActive }) => isActive ? "rounded-xl p-3 bg-gray-800 py-2 mb-4" : "py-2 p-3  mb-4"}>
                Ask AI
            </NavLink>
        </div>
    )
}

export default Navbar