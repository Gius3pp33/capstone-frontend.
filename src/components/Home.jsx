import { useEffect, useState } from 'react';
import '../assets/Home.css';
import { Carousel, Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import Menù from './Menù';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sections = document.querySelectorAll('.animate-on-scroll');
    const onScroll = () => {
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= window.innerHeight - 150) {
          section.classList.add('visible');
        } else {
          section.classList.remove('visible');
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  const handleStarClick = (value) => {
    setRating(value); 
  };
  const handleBookNow = () => {
    navigate('/prenotazione'); 
  };
  const handleSubmit = (event) => {
    event.preventDefault(); 
    setShowAlert(true); 
    setReview(''); 
    setRating(0); 
    
    setTimeout(() => {
      window.location.reload(); 
    }, 1200); 
  };

  return (
    <div className="page-container">
    
      <div className="book-now-container">
        <Button 
          className="btn-book-now" 
          onClick={handleBookNow}
        >
          Book Now
        </Button>
      </div>
      <div className="content-container">
        <section id="home" className="home-section animate-on-scroll mb-4">
          <div className="image-container">
            <img 
              src="https://static.vecteezy.com/ti/foto-gratuito/p2/35618144-ai-generato-gustoso-italiano-cena-scena-con-pizza-pasta-e-vino-in-partenza-camera-per-testo-gratuito-foto.jpg" 
              alt="img" 
              height={750} 
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
            />
            <div className="overlay">
              <h1>Welcome to Pizza & <span className='bordeaux'>Vino</span></h1>
              <h5>Where Every Bite Tells a Story!</h5>
            </div>
          </div>
        </section>

        <section id="about" className="about-section animate-on-scroll mb-5">
          <div className="about-text">
            <h2>About <span className='bordeaux'>Us</span></h2>
            <p>Embark on a journey of taste and tradition!</p>
            <p>At Pizza & Vino, we combine the art of pizza-making with the finest wines, delivering an unforgettable experience crafted with passion and authenticity.</p>
          </div>
          <Carousel className="about-carousel">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://tenimenticiva.com/wp-content/uploads/2019/07/49940C5A-2EFC-4A8A-BF4B-BAC174C0C7B5.jpeg"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Welcome to Pizza & Vino</h3>
                <p>Indulge in the perfect pairing of pizza and wine.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://static.vecteezy.com/ti/foto-gratuito/p2/2044730-ingredienti-freschi-italiani-gratuito-foto.jpg"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Only the Freshest Ingredients</h3>
                <p>Our secret? Quality ingredients and a love for pizza.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmlzdG9yYW50ZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Join Us for a Memorable Meal</h3>
                <p>Book your table and savor the flavors of Pizza & Vino.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </section>

        <section id="specials" className="specials-section animate-on-scroll mb-5">
          <h2 className='text-center'>Specials</h2>
          <Container>
            <Row className="align-items-center my-4">
              <Col md={4}>
                <Card className="special-card">
                  <Card.Img
                    variant="top"
                    src="https://it.ooni.com/cdn/shop/articles/MarcoPizza.jpg?crop=center&height=800&v=1693420808&width=800s"
                    alt="Gourmet Burgers"
                  />
                  <Card.Body className="text-center">
                    <Card.Title className="special-title">Pistachio</Card.Title>
                    <Card.Text>
                      A journey of flavors with our Pistachio, made with fresh ingredients and a crispy base.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="text-center">
                <h3>Discover Our Delicacies!</h3>
                <p>Each item is a masterpiece, crafted with passion and high-quality ingredients.</p>
              </Col>
              <Col md={4}>
                <Card className="special-card">
                  <Card.Img
                    variant="top"
                    src="https://www.volupizzeria.com/wp-content/uploads/2022/01/Normalissima-1080x675.jpg"
                    alt="Pizza alla Norma"
                  />
                  <Card.Body className="text-center">
                    <Card.Title className="special-title">Norma</Card.Title>
                    <Card.Text>
                      Rediscover the authentic taste of tradition with our Norma, rich in flavor and history.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="align-items-center my-4">
              <Col md={4} className="text-center">
                <h3>An Explosion of Flavors!</h3>
                <p>Every bite tells a story of passion and freshness.</p>
              </Col>
              <Col md={4}>
                <Card className="special-card">
                  <Card.Img
                    variant="top"
                    src="https://t3.ftcdn.net/jpg/04/44/86/70/360_F_444867086_79U7yvSiS6LaEWo8nN0ZYX8CJ7NhvhJh.jpg"
                    alt="Margherita Pizza"
                  />
                  <Card.Body className="text-center">
                    <Card.Title className="special-title">Margherita</Card.Title>
                    <Card.Text>
                      Our specialty, a harmony of fresh tomatoes, melting mozzarella, and fragrant basil.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="text-center">
                <h3>Let Yourself Be Tempted!</h3>
                <p>Every item is an invitation to discover new flavors and traditions.</p>
              </Col>
            </Row>
          </Container>
        </section>

        <Menù />

        <section id="contact" className="contact-section animate-on-scroll mt-5">
          <div className="container">
            <div className="row text-center">
              <div className="col-lg-4" style={{ backgroundColor: '#C7AA74', padding: '20px', color: 'white' }}>
                <h2>Contact <span style={{ color: 'rgb(94, 24, 24) ' }}>Us</span></h2>
                <hr style={{ width: '50px', borderTop: '3px solid white' }} />
                <p>Tel. +34 922123456<br />Avenida del Mar, 14<br />Santa Cruz de Tenerife</p>
               
                <p>email@teneriferestaurant.com</p>
              </div>

              <div className="col-lg-4" style={{ backgroundColor: '#957964', padding: '20px', color: 'white' }}>
                <h2>Visit <span style={{ color: 'rgb(94, 24, 24) ' }}>Us</span></h2>
                <hr style={{ width: '50px', borderTop: '3px solid white' }} />
                <p><strong>Winter Hours:</strong></p>
                <p>Santa Cruz<br />Tuesday - Sunday<br />18:00 - 23:00<br />Monday Closed</p>
                
                <p>Special Events: Sundays open for lunch and dinner</p>
              </div>

              <div className="col-lg-4" style={{ backgroundColor: '#603140', padding: '20px', color: 'white' }}>
                <h2>Tell <span style={{ color: 'rgb(94, 24, 24) ' }}>Us</span></h2>
                <hr style={{ width: '50px', borderTop: '3px solid white' }} />
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">First Name *</label>
                    <input type="text" className="form-control" id="name" placeholder="e.g., John" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="surname">Last Name *</label>
                    <input type="text" className="form-control" id="surname" placeholder="e.g., Doe" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="email" className="form-control" id="email" placeholder="e.g., john@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Rate Your Experience</label>
                    <div className="star-rating">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`star ${rating >= index + 1 ? 'selected' : ''}`}
                          data-value={index + 1}
                          onClick={() => handleStarClick(index + 1)}
                          style={{ cursor: 'pointer', fontSize: '2rem', color: rating >= index + 1 ? '#f5c518' : '#ddd' }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <input type="hidden" id="rating-value" name="rating" value={rating} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="review">Write Your Review</label>
                    <textarea className="form-control" id="review" rows="3" placeholder="Enter your text here" value={review} onChange={(e) => setReview(e.target.value)}></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-dark">Send</button>
                </form>
                {showAlert && (
                  <Alert variant="success" className="mt-3">
                    Thank you for your review!
                  </Alert>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer text-center py-4">
          <p>&copy; 2024 Pizza & <span className='bordeaux'>Vino</span>. All rights reserved.</p>
          <div className="social-icons mt-3">
            <a href="#" className="text-white me-3">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-white me-3">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </footer>

        {/* Google Map */}
        <div className="map-container mb-5 text-center">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3262.622058796106!2d-16.25016858475998!3d28.46833818248573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd59bd4c53962a1f%3A0xe16226c3b36b769b!2sAv.%20del%20Mar%2C%2014%2C%2038107%20Santa%20Cruz%20de%20Tenerife%2C%20Spain!5e0!3m2!1sen!2sus!4v1637004738184!5m2!1sen!2sus" 
            width="82%" 
            height="450" 
            style={{ border: 0, borderRadius: '10px' }} 
            allowFullScreen 
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>
      </div>
     
    </div>
  );
}

export default Home;
