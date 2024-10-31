import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function Register() {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonClicked(true); 

    const ruolo = 'CLIENTE';

    const response = await fetch('http://localhost:3003/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, cognome, email, password, ruolo }),
    });

    if (response.ok) {
      setSuccess("Registration successful! You can now log in.");
      setError(null);
      setNome('');
      setCognome('');
      setEmail('');
      setPassword('');
      setIsButtonClicked(false); 
    } else {
      const errorMessage = await response.text();
      setError(`Error: ${errorMessage}`);
      setSuccess(null);
      setIsButtonClicked(false); 
    }
  };

  return (
    <Container>
      <h2>Registration</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicNome">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicCognome">
          <Form.Label>Cognome</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant={isButtonClicked ? "dark" : "transparent border-black"} 
          type="submit"
        >
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default Register;
