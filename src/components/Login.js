import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login(props) {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const handelsubmit = async (e) => {
        // preventDefault() method is used to stop the default behavior of an event from occurring
        e.preventDefault();
        const response = await fetch(`http://localhost:1000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            props.showaleart('Login successfully', "success ")
            navigate("/");
        }
        else {
            props.showaleart('Invalid details', "danger ");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
             <h1 className='my-3 text-center'>Login</h1>
            <Form onSubmit={handelsubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' value={credentials.email} onChange={onChange} />
                    <small>
                        We'll never share your email with anyone else.
                    </small>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="password" value={credentials.password} onChange={onChange} name="password" />
                </Form.Group>
                <Button variant="outline-info" type="submit" >
                    Login
                </Button>
            </Form>
        </div>
    )
}