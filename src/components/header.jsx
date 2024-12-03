import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import '../css/header.css';
import logo from '../assets/logo-2.png'; 

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
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
        <Nav className="ml-auto auth">
          <Nav.Link as={Link} to="/log-in">
            <Button variant="outline-primary" className="mr-2">Log In</Button>
          </Nav.Link>
          <Nav.Link as={Link} to="/sign-up">
            <Button variant="primary">Sign Up</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
