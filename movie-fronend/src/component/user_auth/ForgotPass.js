import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, Form, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import httpClient from '../../httpClient';


export default function ForgotPass() {

    const emailRef = useRef()
    const [error, setError] = useState()
    const [message, setMessage] = useState()
    const [timer, setTimer] = useState()
    const [disabled, setDisabled] = useState(false)


    const handleOnSubmit = (e) => {

        setDisabled(true)
        e.preventDefault()

        let fd = new FormData()
        fd.append('email', emailRef.current.value)

        httpClient
        .post('/reset', fd)
        .then((res) => {
            if (res.data === 'Failed' || res.data === 'This email is not registered') {
                setMessage()
                setError(res.data)
            } else {
                setError()
                setMessage(res.data)
                setTimer(30)
            }
        }).catch((err) => console.log(err))
        .finally(() => setDisabled(false))

    }

    useEffect(() => {
        timer > 0 ? setTimeout(() => setTimer(timer => timer - 1), 1000) : setMessage()
    }, [timer])

    useEffect(() => {
        return () => setTimer()
    }, [])

    const disabledSubmit = () => {
        if (timer > 0 || disabled) return true
        return false
    }

    return (
        <>
            <Container
                className="d-flex align-items-center justify-content-center"
            >   
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">
                                Reset Password
                            </h2>
                        
                            <Alert variant={error ? 'danger' :message ? 'primary' : ''}> {error} {message} </Alert>
                            
                            <Form onSubmit={handleOnSubmit}>
                                <Form.Group id="email">
                                    <Form.Label> Email</Form.Label>
                                    <Form.Control type="email" required ref={emailRef}/>
                                </Form.Group>

                                <Button className="w-100" disabled={disabledSubmit()} type="submit" style={{marginTop: 20}} >
                                    {timer > 0 ?  `send email again in ${timer}` : disabled ? 'sending...' : 'Send me an email'}
                                </Button>
                            </Form>

                            <div className="w-100 text-center mt-2">
                                You already have an account {'  '}
                                <Link to="/auth/log-in">
                                    Log in
                                </Link>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Container> 
        </>
    )
}
