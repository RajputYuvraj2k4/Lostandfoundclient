import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { handleSuccess } from '../util';
import '../css/navbar.css';
import logo from '../assets/logo-2.png';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostItemModal from './PostItemModal';

function NavigationBar({ onItemPosted }) { // Accept the prop here
  const [showPostModal, setShowPostModal] = useState(false);

  const handleOpenPostModal = () => setShowPostModal(true);
  const handleClosePostModal = () => setShowPostModal(false);

  const navigate = useNavigate();

  const handleSignOut = (e) => {
    e.preventDefault(); // Prevent the default link behavior
    localStorage.removeItem('token');
    localStorage.removeItem('logged-in');
    handleSuccess('Logged Out Successfully'); // Show success message
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <>
      <Navbar expand="lg">
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            height="100"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text">
            <Nav.Link onClick={handleOpenPostModal}>
              <Button variant="primary">Post Item</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/feed">Feed</Nav.Link>
            <Nav.Link as={Link} to="/mylistings">My Listings</Nav.Link>
            <Nav.Link as={Link} to="/responses">Responses</Nav.Link>
            <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ToastContainer />

      <PostItemModal 
        show={showPostModal} 
        handleClose={handleClosePostModal} 
        onItemPosted={onItemPosted} // Pass the prop to the modal
      />
    </>
  );
}

export default NavigationBar;