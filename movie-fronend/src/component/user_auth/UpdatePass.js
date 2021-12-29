import React, { useRef, useState } from 'react'
import {  Card, Form, Container, Alert, } from "react-bootstrap";
import SessionAlert from '../tools/SessionAlert'
import httpClient from '../../httpClient';
import FormButton from '../tools/Button'

export default function UpdatePass() {

    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [session, setSession] = useState(false);
    const [alertErr, setAlertErr] = useState();
    const [loading, setLoading] = useState(false);


    const oldPassword = useRef()
    const newPassRef = useRef()
    const ConfirmnewPassRef = useRef()
    
    const handleOnSubmit = (e) => {
           
        e.preventDefault()
        setError()

        if (newPassRef.current.value !== ConfirmnewPassRef.current.value) {
            return setError('password does not match') 
        }

        setLoading(true)

        httpClient('/update_pass', {
            params: {
                old_password: oldPassword.current.value,
                new_password: newPassRef.current.value
            }
        })
        .then((res) => {
            if (res.data === "password updated successfully" ) {
                setMessage(res.data)
                setError()
                setTimeout(() => window.location = '/auth/home', 1000) 
            } else {
                setError(res.data)
                setMessage()
            }
            setLoading(false)
        }).catch((err) => {
            console.log(err.response)
            if (err.response.status === 401) {
                setSession(true)
                setAlertErr('Sorry, Your session has ended')
                setTimeout(() => window.location = '/popular/1', 2000)
            } else  {
                setError('Error, Please try again')
            }   
            setLoading(false)
        })

    }


    return (
            <Container
                className="d-flex align-items-center justify-content-center"
            >   
                        {session && <SessionAlert alertErr={alertErr} />}
                <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4"> 
                            Update password
                        </h2>
                        <div style={{height: 60}}>   
                        <Alert className='h-20' variant={error ? 'danger' :message ? 'primary' : ''}> {error} {message} </Alert>
                        </div>
                      
                        <Form onSubmit={handleOnSubmit}>

                            <Form.Group id="old-password">
                                <Form.Label> Old password</Form.Label>
                                <Form.Control type="password" required minLength={8} ref={oldPassword}/>
                            </Form.Group>

                            <Form.Group id="password">
                                <Form.Label> New Password</Form.Label>
                                <Form.Control type="password" minLength={8} required ref={newPassRef} />
                            </Form.Group>

                            <Form.Group id="confirm-password">
                                <Form.Label> Confirm New Password</Form.Label>
                                <Form.Control type="password" minLength={8} required ref={ConfirmnewPassRef} />
                            </Form.Group>

                            <FormButton className='w-100' loading={loading} name='Update' />

                        </Form>

                    </Card.Body>
                </Card>
                </div>
            </Container> 
    )
}
