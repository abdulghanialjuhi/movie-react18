import React, { useContext, useState } from 'react'
import {Routes, Route, Navigate } from "react-router-dom";
import UpdatePass from './UpdatePass';
import Context from '../../context/Context';
import PrivateRoute from './PrivateRoute'
import { Button, Card, Container } from "react-bootstrap";
import UpdateName from './UpdateName';
import httpClient from '../../httpClient';
import FormButton from '../tools/Button';

export default function Home() {

    const { name } = useContext(Context)
    
    return (
            <Routes>
                <Route path='/' element={<Account name={name} />} />
                <Route
                    path='update-password'
                    element={
                    <PrivateRoute>
                       <UpdatePass />
                    </PrivateRoute>
                    }     
                />
                <Route
                    path='update-name'
                    element={
                    <PrivateRoute>
                       <UpdateName name={name} />
                    </PrivateRoute>
                    }     
                />
                <Route path='*' 
                element={<Navigate to='/auth/home' />} 
                />
            </Routes>
    )
}

function Account({ name }) {

    const [loading, setLoading] = useState(false);

    const handleLogOut = () => {
        setLoading(true)

        httpClient('/log_out')
        .then((res) => {
            if (res.data.msg === 'Logged out successfully') {
                window.location = '/auth/log-in'
            }
        }).catch((err) => window.location = '/auth/log-in')
    }
    
return (
    <div className='acount-container'>
        <Container
            className="align-items-center justify-content-center"
        >   
            <div className="w-150" style={{ minWidth: 350 }}>
                <Card style={{minHeight: 250}}>
                    <Card.Body>
                    Welcome
                        <h4 className="text-center mb-4"> 
                            {name} 
                        </h4>
  
                        <div className="button-container">
                            <Button  
                            onClick={() => window.location = '/auth/home/update-password'}
                            style={{marginTop: 20}} >
                            Update password
                            </Button>
                            <Button  
                            onClick={() => window.location = '/auth/home/update-name'}
                            style={{marginTop: 20}} >
                            Update name
                            </Button>
                        </div>
                     
                    </Card.Body>
                </Card>
            </div>
        </Container> 
        <div onClick={handleLogOut}> 
        <FormButton loading={loading} onClick={handleLogOut} name='Log out' className='w-100 btn-danger' />
        </div>
    </div>
  )
}
