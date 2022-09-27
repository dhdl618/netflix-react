import React from 'react'
import {Button, Nav, Navbar, Container, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='navbar-container'>
        <Navbar bg="black" variant='dark' expand="lg">
            <Container fluid>
                <Navbar.Brand>
                    <Link to="/">
                        <img style={{margin:"0px 50px 0px 20px"}} width={100} src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'/>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    <Link to="/" className="nav-item">Home</Link>
                    <Link to="/movies" className="nav-item">Movies</Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="outline-danger">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default NavBar