import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Signup(props) {
  const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:"" })
  let navigate = useNavigate();
  const handelsubmit = async (e) => {
      // preventDefault() method is used to stop the default behavior of an event from occurring
      e.preventDefault();
      const {name, email, password} = credentials;
      const response = await fetch(`http://localhost:1000/api/auth/createuser`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password})
      });
      const json = await response.json()
      console.log(json)
      if (json.success) {
          // Save the auth token and redirect
          localStorage.setItem('token', json.authtoken);
          navigate("/");
          props.showaleart('Account created successfully', "success ")
      }
      else {
          props.showaleart('Invalid credentials', "danger ");
      }
  }
  const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>
    <h1 className='my-3 text-center'>Signup</h1>
    <Form onSubmit={handelsubmit}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Full Name</Form.Label>
      <Form.Control type="text" placeholder="Enter name" name="name" onChange={onChange}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" name='email' onChange={onChange}/>
      <small>
        We'll never share your email with anyone else.
      </small>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name="password" onChange={onChange} minLength={5} required/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control type="password" placeholder="Password" name="cpassword" onChange={onChange} minLength={5} required/>
    </Form.Group>
    <Button variant="outline-info" type="submit">
    Signup
    </Button>
  </Form>
  </>
  )
}