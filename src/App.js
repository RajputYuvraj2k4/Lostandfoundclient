import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../src/components/home';
import Login from '../src/components/Login';
import Signup from '../src/components/Signup';
import Feed from '../src/components/feed';
import RefreshHandler from './RefreshHandler';
import MyListings from './components/mylistings';
import ItemPage from './components/ItemPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/log-in" />; 
  };

  return (
    <Router>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/feed" element={<PrivateRoute element={<Feed />} />} />
        <Route path="/mylistings" element={<PrivateRoute element={<MyListings />} />} />
        <Route path="/item/:id/:type" element={<PrivateRoute element={<ItemPage />} />} />
        
      </Routes>
    </Router>
  );
}

export default App;