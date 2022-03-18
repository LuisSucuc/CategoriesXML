import React from 'react'
import { Outlet, Link } from "react-router-dom";
import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";

const Menu = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Categories eBay</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">
                                 Upload
                            </Nav.Link>
                            <Nav.Link as={Link} to="/categories">
                                Categories
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Row>
                    <Col className="mt-5">
                        <Outlet />
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Menu