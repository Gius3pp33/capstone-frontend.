import { useState, useEffect } from 'react';
import { Button, Container, Nav, Modal,  } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../assets/MyNavbar.css'; 
import pizzasImage from '../assets/pizzas.jpg';
import { Envelope, GeoAltFill, TelephoneFill } from 'react-bootstrap-icons';
import { jwtDecode } from 'jwt-decode';

function MyNavbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.role === 'ADMIN');
        setUserName(decodedToken.nome);
        setIsLoggedIn(true); 
      } catch (error) {
        console.error("Invalid token:", error);
        setIsLoggedIn(false); 
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsAdmin(false);
    setUserName('');
    setIsLoggedIn(false); 
    window.location.reload(); 
  };

  return (
    <div className="sidebar">
      <Container>
        <div className="logo">
          <img src={pizzasImage} alt="Img" className="navbar-logo" />
          <h4 className='mb-4'>Pizza & <span className='bordeaux'>Vino</span> </h4>
        </div>
        <div className="user-info">
          {userName && <h5>Hi, {userName}</h5>} 
        </div>
        <br/>

        <Nav className="flex-column nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Home
          </NavLink>
          <NavLink to="/register" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Register
          </NavLink>
          <NavLink to="/menù" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Menu
          </NavLink>
          {isAdmin && ( 
            <NavLink to="/disponibilita" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
            Availability
            </NavLink>
          )}
          <NavLink to="/prenotazione" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
          Book Now
          </NavLink>
          
        </Nav>

        <br />
        
        {isLoggedIn ? (
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        ) : (
          <NavLink to="/login">
            <Button variant="primary">Login</Button>
          </NavLink>
        )}
        <hr/>

        <div className="contact-icons" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <a onClick={() => setShowEmailModal(true)} className="contact-icon">
            <Envelope size={25} />  
          </a>
          <a onClick={() => setShowPhoneModal(true)} className="contact-icon">
            <TelephoneFill size={25} />  
          </a>
          <a onClick={() => setShowLocationModal(true)} className="contact-icon">
            <GeoAltFill size={25} style={{ cursor: 'pointer' }} />  
          </a>
        </div>
      </Container>

      
      <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Contact Us via Email</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Please contact us at:</p>
    <p>Email: email@teneriferestaurant.com</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowEmailModal(false)}>Close</Button>
  </Modal.Footer>
</Modal>

<Modal show={showPhoneModal} onHide={() => setShowPhoneModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Contact Us via Phone</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>Please contact us at:</p>
    <p>Phone:+34 922123456</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowPhoneModal(false)}>Close</Button>
  </Modal.Footer>
</Modal>

<Modal show={showLocationModal} onHide={() => setShowLocationModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Our Location</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p>You can find us at:</p>
    <p>Address: Avenida del Mar, 14
    Santa Cruz de Tenerife</p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowLocationModal(false)}>Close</Button>
  </Modal.Footer>
</Modal>
    </div>
  );
}

export default MyNavbar;
