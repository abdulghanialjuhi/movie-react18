import React, { useRef, useState } from 'react'
import { Card, Form, Container, Alert, } from "react-bootstrap";
import SessionAlert from '../tools/SessionAlert'
import httpClient from '../../httpClient';
import FormButton from '../tools/Button';

export default function UpdateName({ name }) {

    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [session, setSession] = useState(false);
    const [alertErr, setAlertErr] = useState();

    const nameRef = useRef()

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setError()

         if (nameRef.current.value === name) return false

         setLoading(true)


        httpClient('/update_name', {
            params: {
                new_name: nameRef.current.value
            }
        })
        .then((res) => {
            if (res.data === "name updated successfully" ) {
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
                            Update name
                        </h2>
                        <div style={{height: 60}}>   
                        <Alert className='h-20' variant={error ? 'danger' :message ? 'primary' : ''}> {error} {message} </Alert>
                        </div>
                      
                        <Form onSubmit={handleOnSubmit}>

                            <Form.Group id="old-password">
                                <Form.Label> Name </Form.Label>
                                <Form.Control type="text"
                                defaultValue={name} required minLength={8} ref={nameRef}/>
                            </Form.Group>

                            <FormButton 
                            name='Update'
                            className='w-100' 
                            loading={loading} />

                        </Form>

                    </Card.Body>
                </Card>
                </div>
            </Container> 
    )
}
