import React, {  useRef, useState } from 'react'
import { Card, Form, Container, Alert, Row, InputGroup, FormControl } from "react-bootstrap";
import httpClient from '../../httpClient';
import FormButton from '../tools/Button';

const SignUp = ({ setActive }) => {

    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const [userErr, serUserErr] = useState()
    const [loading, setLoading] = useState(false);

    
    const userNameRef = useRef()
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const ConfirmPasswordRef = useRef()

    
    const handleOnSubmit = (e) => {

        e.preventDefault()
        setError(null)
        setMessage(null)

        if (handleUserExists() === false) { 
            return false
        }
       
        if (passwordRef.current.value !== ConfirmPasswordRef.current.value) {
            return setError('password does not match') 
        }
        setLoading(true)

        let fd = new FormData()
        fd.append('user-name', userNameRef.current.value)
        fd.append('name', nameRef.current.value)
        fd.append('email', emailRef.current.value)
        fd.append('password', passwordRef.current.value)

        httpClient
        .post('/signup', fd)
        .then((res) => {
            if (res.data === "Success" ) {
                setMessage('Account Created Successfully')
                setTimeout(() => setActive(false), 2000)
            } else {
                setError(res.data)
            }
            setLoading(false)
        }).catch((err) => {
            setError("Error, Try again")
            setLoading(false)
        })

    }

    const checkUserValid = (s) => {
           //  eslint-disable-next-line
        const format = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
     
        if (s.slice(0,-1).indexOf(' ') >= 0 || format.test(s)) {
            return true ;
        }
      }

    const handleUserExists = () => {
        serUserErr()
        const validName = userNameRef.current.value
        const notValid =  checkUserValid(validName)

        if (notValid) {
            serUserErr('Sorry, only letters (A-Z), numbers (0-9), and underscore (_) are allowd')
            return false
        } else {
            let fd = new FormData()
            fd.append('user-name', validName)

            httpClient
            .post('/check-user-name', fd)
            .then((res) => {
                if (res.data !== "Clear" ) {
                    serUserErr(res.data)
                    return false
                } else {
                    serUserErr()
                }
            }).catch((err) => {
                console.log(err.response)
            })
        }
        return true
    } 


    return (
        <>
            <Container
                id='active'
                className="d-flex"
            >   
                <div className="w-150" style={{ maxWidth: "460px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4"> 
                            Sign up
                        </h2>
                             <Alert variant={error ? "danger" : message && 'primary'}> {error} {message} </Alert>
                        
                        <Form onSubmit={handleOnSubmit} className='form-row'>

                            <Row className="mb-4" >
                                <InputGroup>
                                    <InputGroup.Text>@</InputGroup.Text>
                                    <FormControl 
                                    onBlur={handleUserExists} 
                                    ref={userNameRef} 
                                    required type='username' placeholder="Username" 
                                    className={userErr &&  'is-invalid'}
                                    />
                                    <div className="invalid-feedback">
                                        {userErr}
                                    </div> 
                                </InputGroup>
                            </Row>
                            

                            <Form.Group id="name" className="mb-4">
                                <Form.Control type="Name" placeholder="Enter your name" required ref={nameRef}/>
                            </Form.Group>
                        

                            <Form.Group id="email" className="mb-4">
                                <Form.Control type="email" placeholder="Enter email" required ref={emailRef}/>
                            </Form.Group>

                            <Row>
                            <Form.Group id="password" className='col-md-6'>
                                <Form.Control type="password" placeholder="Password" minLength={8} required ref={passwordRef} />
                            </Form.Group>

                            <Form.Group id="confirm-password" className='col-md-6'>
                                <Form.Control type="password" placeholder="Confirm" minLength={8} required ref={ConfirmPasswordRef} />
                            </Form.Group>
                            </Row>
                            
                            {/* <Button disabled={userErr} className="w-100" type="submit" style={{marginTop: 20}} >
                               Sign up
                            </Button> */}
                            <FormButton className="w-100" loading={loading} name='Sign up' />

                        </Form>

                    </Card.Body>
                </Card>
                </div>
            </Container> 
        </>
    )
}


export default SignUp