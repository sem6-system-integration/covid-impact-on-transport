import React, {FC, useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {TokenContext} from "../../App";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {getClaimFromToken} from "../../utils/tokenUtils";


interface MyNavbarProps {
}

const MyNavbar: FC<MyNavbarProps> = () => {
    const {token, setToken} = useContext(TokenContext);
    const navigate = useNavigate()

    const logout = () => {
        setToken('')
        localStorage.removeItem("jwtToken")
        navigate('/')
    };

    const getUserDropdown = () => {
        const userName = getClaimFromToken(token, 'username');
        return (
            <NavDropdown title={userName} align={"end"}>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
        )
    }

    const getAuthLinks = () => {
        return (
            <>
                <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                </LinkContainer>
            </>
        )
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container fluid>
                <Navbar.Brand>Covid Impact on Transport</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="col-12">
                        <Nav.Item className="me-auto d-lg-flex">
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/flights">
                                <Nav.Link>Flights</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="d-lg-flex">
                            {token ? getUserDropdown() : getAuthLinks()}
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;