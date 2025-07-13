import React from 'react'
import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full h-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5 h-full">
                <div className="flex justify-between items-center h-full">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
                            PastesApp
                        </h1>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden sm:flex items-center justify-center space-x-1 lg:space-x-2">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                `px-3 lg:px-4 py-2 rounded-lg font-medium text-sm lg:text-base transition-all duration-200 ${
                                    isActive 
                                        ? "text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700/50 font-semibold shadow-sm" 
                                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink 
                            to="/pastes" 
                            className={({ isActive }) => 
                                `px-3 lg:px-4 py-2 rounded-lg font-medium text-sm lg:text-base transition-all duration-200 ${
                                    isActive 
                                        ? "text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700/50 font-semibold shadow-sm" 
                                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`
                            }
                        >
                            Pastes
                        </NavLink>
                        <NavLink 
                            to="/askAI" 
                            className={({ isActive }) => 
                                `px-3 lg:px-4 py-2 rounded-lg font-medium text-sm lg:text-base transition-all duration-200 ${
                                    isActive 
                                        ? "text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700/50 font-semibold shadow-sm" 
                                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`
                            }
                        >
                            Ask AI
                        </NavLink>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="flex sm:hidden items-center space-x-1">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                `p-2 rounded-lg font-medium text-xs transition-all duration-200 ${
                                    isActive 
                                        ? "text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700/50" 
                                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`
                            }
                        >
                            🏠
                        </NavLink>
                        <NavLink 
                            to="/pastes" 
                            className={({ isActive }) => 
                                `p-2 rounded-lg font-medium text-xs transition-all duration-200 ${
                                    isActive 
                                        ? "text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700/50" 
                                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`
                            }
                        >
                            📚
                        </NavLink>
                        <NavLink 
                            to="/askAI" 
                            className={({ isActive }) => 
                                `p-2 rounded-lg font-medium text-xs transition-all duration-200 ${
                                    isActive 
                                        ? "text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700/50" 
                                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`
                            }
                        >
                            🤖
                        </NavLink>
                    </div>

                    {/* Theme Toggle */}
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    )
}

export default Navbar