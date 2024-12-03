import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation(); //tells the web page location from the addess bar
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup') {
                navigate('/feed', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticated])
    return (
        null
    )
}

export default RefreshHandler
