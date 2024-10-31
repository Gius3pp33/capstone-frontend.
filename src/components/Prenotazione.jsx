import { useEffect, useState } from 'react';
import { Container, Form, Button, Alert, ListGroup } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../assets/Prenotazione.css'; 
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const localizer = momentLocalizer(moment);

function Prenotazione() {
  const [events, setEvents] = useState([]);
  const [numeroPersone, setNumeroPersone] = useState('');
  const [disponibilitàId, setDisponibilitàId] = useState('');
  const [nome, setNome] = useState('');
  const [recapito, setRecapito] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [utenteId, setUtenteId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [prenotazioni, setPrenotazioni] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decoded = jwtDecode(token);
      setUtenteId(decoded.sub);
      setIsAdmin(decoded.role === 'ADMIN'); 
    }

    const fetchDisponibilità = async () => {
      if (!token) {
        setError("You must log in to view availability.");
        return;
      }

      const response = await fetch('http://localhost:3003/disponibilità', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Error fetching availability.");
        return;
      }

      const data = await response.json();
      const eventsData = data.map(item => ({
        id: item.id,
        title: ` ${item.fasciaOraria}\nAvailable S.: ${item.postiDisponibili}`,
        start: new Date(item.data), 
        end: new Date(item.data),   
      }));
      setEvents(eventsData);
    };

    const fetchPrenotazioni = async () => {
      if (!isAdmin) return; 

      const response = await fetch('http://localhost:3003/prenotazioni', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError("Error fetching bookings.");
        return;
      }

      const data = await response.json();
      setPrenotazioni(data);
    };

    fetchDisponibilità();
    fetchPrenotazioni();
  }, [isAdmin]);

  const handlePrenotazione = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3003/prenotazioni', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          numeroPersone,
          disponibilitàId,
          utenteId,
          nome,
          recapito,
        }),
      });

      if (!response.ok) {
        throw new Error('Error making the booking');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/'); 
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container style={{ backgroundColor: '#F5EDE2', padding: '20px', borderRadius: '8px' }}>
      <h2>Booking</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Booking made successfully!</Alert>}

      {/* Legend explaining how to book */}
      <p className="text-center">
        Please select an available time slot on the calendar to book a table.
      </p>

      <div style={{ height: '500px', margin: '20px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%', width: '100%' }}
          onSelectEvent={(event) => {
            setDisponibilitàId(event.id); 
          }}
          messages={{
            allDay: '',
            previous: '<',
            next: '>',
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day',
            noEventsInRange: 'No events',
          }}
          views={['month', 'week', 'day']}
          eventPropGetter={() => ({
            style: {
              fontSize: '0.7em', 
              whiteSpace: 'pre-line', 
            },
          })}
        />
      </div>

      <Form onSubmit={handlePrenotazione} className="mt-4">
        <Form.Group controlId="numeroPersone">
          <Form.Label>Number of People</Form.Label>
          <Form.Control
            type="number"
            value={numeroPersone}
            onChange={(e) => setNumeroPersone(e.target.value)}
            required
            placeholder="Enter the number of people"
          />
        </Form.Group>
        <Form.Group controlId="nome">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            placeholder="Enter your name"
          />
        </Form.Group>
        <Form.Group controlId="recapito">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            value={recapito}
            onChange={(e) => setRecapito(e.target.value)}
            required
            placeholder="Enter your phone number"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3" disabled={!disponibilitàId}>
          Book
        </Button>
      </Form>

      {isAdmin && (
        <div className="mt-5">
          <h3>Completed Bookings</h3>
          <ListGroup className="transparent-background">
            {prenotazioni.map(p => (
              <ListGroup.Item key={p.id}>
                <strong>{p.clienteId}</strong> - {p.numeroPersone} people - {p.data} - phone: {p.disponibilitàId} <hr/>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      )}
    </Container>
  );
}

export default Prenotazione;
