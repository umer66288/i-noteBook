import React from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar(props) {
    let location = useLocation();
    let navigate = useNavigate();
    const { mode, togglemode } = props;
    const handellogout =()=>{
        localStorage.removeItem('token')
        navigate.push("/Login");
    }
    return (
        <Navbar expand="lg" className='sticky-top' bg={mode} data-bs-theme={mode}>
            <Container fluid>
                <Navbar.Brand as={Link} to='/'>Inotebook</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} className={`${location.pathname === "/" ? "active" : ""}`} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} className={`${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Nav.Link>
                    </Nav>
                        {!localStorage.getItem('token')?<Form className="d-flex align-items-center">
                        <Form.Check
                            type="switch"
                            onClick={togglemode}
                            id="input-black"
                        />
                        {/* <Form.Label htmlFor="input-black" className={`text-${mode === "light" ? "dark" : "light"}`}>
                            {mode === "light" ? "Dark mode" : "Light mode"}
                        </Form.Label> */}
                        <Link to="/Login"  className="mx-1 btn btn-sm btn-outline-info">Login</Link>
                        <Link to="/Signup"  className="mx-1 btn btn-sm btn-outline-info">Signup</Link>
                    </Form>: 
                    <div className='d-flex align-items-center'>
                    <Form.Check
                            type="switch"
                            onClick={togglemode}
                            id="input-black"
                        />
                    <Link className='btn btn-sm btn-outline-info mx-1' onClick={handellogout} variant="primary">Logout</Link>
                    </div>
                   }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
  