import React from 'react';
import { Navbar, NavbarBrand, Nav, Row, Col } from 'react-bootstrap';

export default function AppNavbar()  {
  return (
    <div>
      <Row>
        <Col>
          <Navbar bg="light" expand="lg">
            <NavbarBrand href="#home">Bank Report</NavbarBrand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <Nav className="font-weight-bold">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href="#service">Service</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </div>
  )
}
