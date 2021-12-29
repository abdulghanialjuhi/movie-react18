import React, { useContext, useState } from 'react';
import { Route, Navigate, Routes } from "react-router-dom";
import Bar from './Bar';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Home from './Home';
import ForgotPass from './ForgotPass';
import Context from '../../context/Context';
import PrivateRoute from './PrivateRoute';
import WatchList from '../watchlist/WatchList';
import './styles/userStyle.css';

export default function AuthUser() {

    const [actvie, setActive] = useState(false)
    
    const { loading, isAuth } = useContext(Context)

    return (
        <div className='container'>
           {!loading && <Routes>  

                <Route path="/*" element={isAuth ? <Navigate to='/auth/home' /> : <Navigate to='/auth/log-in' />} />

                <Route
                    path='home/*'
                    element={
                    <PrivateRoute>
                        <Home /> 
                    </PrivateRoute>
                    }     
                />

                <Route path="log-in" element={!isAuth ? 
                    <>
                        <Bar actvie={actvie}  setActive={setActive} />
                        {
                        actvie ? <SignUp setActive={setActive} />  :
                        <LogIn />
                    
                        }
                    </>
                    : <Navigate to='/auth/home' /> 
                }/>

                <Route path='forgot-password' element={<ForgotPass />} />
                <Route path='watchlist' element={
                    <PrivateRoute>
                        <WatchList />
                    </PrivateRoute>
                } />
            </Routes>}
        </div>
    )
}
