import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import LoginButton from './LogInButton';

function NavBar() {
  return (
    <Navbar fixed="top" expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <NavLink
            to="/"
            className="text-decoration-none text-primary fw-bold fs-3">
            <img src="logo.png" alt="logo" height={40} className="me-2" />
            ADS.com
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle />
        {/* ==================== OFFCANVAS ==================== */}
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-md"
          aria-labelledby="offcanvasNavbarLabel-expand-md"
          placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* ==================== LoginButton for small screens ==================== */}
            <LoginButton className="d-block d-md-none w-100" />
            <Nav as="ul" className="justify-content-end flex-grow-1 pe-3">
              <li>
                <NavLink to="/" className="nav-link">
                  home
                </NavLink>
              </li>
              <li>
                <NavLink to="/ads" className="nav-link">
                  ads
                </NavLink>
              </li>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        {/* ==================== LoginButton for large screens ==================== */}
        <LoginButton className="d-none d-md-block" />
      </Container>
    </Navbar>
  );
}

export default NavBar;
