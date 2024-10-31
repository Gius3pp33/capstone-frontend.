import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Disponibilità() {
  // Stato per gestire i dati dell'input
  const [data, setData] = useState('');
  const [fasciaOraria, setFasciaOraria] = useState('');
  const [postiDisponibili, setPostiDisponibili] = useState('');
  const [error, setError] = useState(null); // Stato per gestire gli errori
  const [success, setSuccess] = useState(null); // Stato per messaggi di successo
  const [isAdmin, setIsAdmin] = useState(false); // Stato per verificare se l'utente è admin

  // Effetto per controllare il ruolo dell'utente tramite il token JWT
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setIsAdmin(decodedToken.role === 'ADMIN'); // Imposta isAdmin se il ruolo è 'ADMIN'
    }
  }, []);

  // Funzione per gestire l'invio del modulo
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene il comportamento predefinito del modulo

    // Controllo se l'utente ha i permessi
    if (!isAdmin) {
      setError("You do not have permission to add availability."); // Messaggio di errore se non è admin
      return;
    }

    // Invio della richiesta per aggiungere la disponibilità
    const response = await fetch('http://localhost:3003/disponibilità', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Includo il token nell'intestazione
      },
      body: JSON.stringify({ data, fasciaOraria, postiDisponibili }), // Invio dei dati
    });

    // Controllo la risposta
    if (response.ok) {
      setSuccess("Availability created successfully!"); // Messaggio di successo
      setError(null); // Resetta l'errore
      // Reset dei campi del modulo
      setData('');
      setFasciaOraria('');
      setPostiDisponibili('');
    } else {
      const errorMessage = await response.text(); 
      setError(`Error: ${errorMessage}`); // Imposta l'errore
      setSuccess(null); 
    }
  };

  return (
    <Container>
      <h2>Manage Availability</h2>
      {error && <Alert variant="danger">{error}</Alert>} {/* Mostra l'errore se presente */}
      {success && <Alert variant="success">{success}</Alert>} 
      {isAdmin ? (  // Verifica se l'utente è un admin
        <Form onSubmit={handleSubmit}> {/* Form per aggiungere la disponibilità */}
          <Form.Group controlId="formBasicData">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicFasciaOraria">
            <Form.Label>Time Slot</Form.Label>
            <Form.Control
              type="text"
              placeholder="E.g: 18:00 - 20:00"
              value={fasciaOraria}
              onChange={(e) => setFasciaOraria(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPostiDisponibili">
            <Form.Label>Available Seats</Form.Label>
            <Form.Control
              type="number"
              value={postiDisponibili}
              onChange={(e) => setPostiDisponibili(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Availability
          </Button>
        </Form>
      ) : (
        <Alert variant="warning">You do not have permission to manage availability.</Alert> // Messaggio per utenti non admin
      )}
    </Container>
  );
}

export default Disponibilità;
