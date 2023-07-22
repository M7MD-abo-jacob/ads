import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-between text-center">
        <Col md={6}>
          <h3>ADS.com</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis est
            quisquam architecto exercitationem minima adipisci. Sed voluptatibus
            earum quas odit atque accusamus necessitatibus quod aut!
          </p>
        </Col>
        {/* ========== FOOTER LINKS ========== */}
        <Col md={6}>
          <h3>links</h3>
          <ul className="list-unstyled">
            <li>
              <Link to="/" className="text-decoration-none text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/ads" className="text-decoration-none text-primary">
                Ads
              </Link>
            </li>
            <li>
              <Link to="/ads/new" className="text-decoration-none text-primary">
                Create an Ad
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
