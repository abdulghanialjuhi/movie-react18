import React, { useRef, useState } from 'react'
import { Card, Form, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import httpClient from '../../httpClient';
import FormButton from '../tools/Button';

const  LogIn = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        let fd = new FormData()
        fd.append('email', emailRef.current.value)
        fd.append('password', passwordRef.current.value)

        httpClient
        .post('/login', fd)
        .then((res) => {
            if (res.data.message === 'Success') {
                console.log(res.data)
                window.location = '/auth/home'
            } else {
                setError(res.data)
                setLoading(false)
            }

        }).catch((err) => {
            setError('Error, Try again')
            console.log(err)
            setLoading(false)
        })

    }

    return (
        <>
            <Container
                 id='active'
                className="d-flex"
            >   
                <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">
                            Log In
                        </h2>

                        <Alert variant={error && "danger"}> {error} </Alert>
                        <Form onSubmit={handleOnSubmit}>

                            <Form.Group id="email" className='mb-4'>
                                <Form.Control placeholder='Enter email or user name' required ref={emailRef}/>
                            </Form.Group>

                            <Form.Group 
                            id="password" 
                            className='mb-4'>
                                <Form.Control 
                                placeholder='Password' 
                                type="password" 
                                minLength={8} 
                                required 
                                ref={passwordRef} />
                            </Form.Group>

                            <FormButton name='Log In' className='w-100' loading={loading} />

                        </Form>

                        <div className="w-100 text-center mt-2">
                            <Link to="/auth/forgot-password">
                                Forgot Password?
                            </Link>
                        </div>
                    </Card.Body>

                </Card>
                </div>
            </Container> 
        </>
    )
}

export default LogIn
