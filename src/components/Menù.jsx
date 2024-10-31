import { useEffect, useState } from 'react';
import { Container, ListGroup, Alert, Button, Form } from 'react-bootstrap';

import '../assets/Menù.css';
import { jwtDecode } from 'jwt-decode';

function Menu() {  
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('pizzas');
  const [isAdmin, setIsAdmin] = useState(false); 

  const [newDish, setNewDish] = useState({
    nomePiatto: '',
    descrizione: '',
    prezzo: '',
    categoria: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchMenu = async () => {
      if (!token) {
        setError("You must log in to view the menu.");
        return;
      }

      
      const decodedToken = jwtDecode(token);
      setIsAdmin(decodedToken.role === 'ADMIN');

      const response = await fetch('http://localhost:3003/menù', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Error fetching the menu.");
        return;
      }

      const data = await response.json();
      setMenu(data);
    };

    fetchMenu();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

 
  const filteredMenu = menu.filter(item => selectedCategory ? item.categoria === selectedCategory : true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddDish = async (e) => {
    e.preventDefault(); 
    const token = localStorage.getItem('token');

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub; 

    const response = await fetch('http://localhost:3003/menù', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ...newDish, utenteId: userId }), 
    });

    if (response.ok) {
     
      const newMenuItem = await response.json(); 
      setMenu(prevMenu => [...prevMenu, newMenuItem]);
      setNewDish({ nomePiatto: '', descrizione: '', prezzo: '', categoria: '' }); 
      setError(null); 
    } else {
      const errorMessage = await response.text();
      setError(`Error adding the dish: ${errorMessage}`);
    }
  };

  return (
    <Container style={{ backgroundColor: '#F5EDE2', padding: '20px', borderRadius: '8px' }}>
      <h2 className='text-center'>Menu</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="text-center mb-3">
        <Button
          variant={selectedCategory === 'pizzas' ? 'dark' : 'outline-dark'}
          className="m-2"
          onClick={() => handleCategoryChange('pizzas')}
        >
          Pizzas
        </Button>
        <Button
          variant={selectedCategory === 'beverages' ? 'dark' : 'outline-dark'}
          className="m-2"
          onClick={() => handleCategoryChange('beverages')}
        >
          Beverages
        </Button>
        <Button
          variant={selectedCategory === 'desserts' ? 'dark' : 'outline-dark'}
          className="m-2"
          onClick={() => handleCategoryChange('desserts')}
        >
          Desserts
        </Button>
        <Button
          variant={selectedCategory === 'wine' ? 'dark' : 'outline-dark'}
          className="m-2"
          onClick={() => handleCategoryChange('wine')}
        >
          Wine
        </Button>
      </div>
      
      <ListGroup>
        {filteredMenu.length > 0 ? (
          filteredMenu.map(item => (
            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center bg-transparent border-0">
              <div>
                <h5 className="menu-title">{item.nomePiatto}</h5>
                <p className="menu-description">{item.descrizione}</p>
              </div>
              <h5 className="menu-price">{item.prezzo} </h5>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item style={{backgroundColor:'#F5EDE2',border:'0'}}></ListGroup.Item>
        )}
      </ListGroup>

    
      {isAdmin && ( 
        <>
         <h3 className='text-center mt-4'>Add an Item</h3>
          <Form onSubmit={handleAddDish}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="itemName"
                placeholder="Enter the item name"
                value={newDish.itemName}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter the description"
                value={newDish.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter the price"
                value={newDish.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder="Enter the category"
                value={newDish.category}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Item
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
}

export default Menu; 
