import React, { useRef, useContext, useState } from 'react';
import IdleTimer from 'react-idle-timer'
import Context from '../../context/Context';
import SessionAlert from '../tools/SessionAlert';
import httpClient from '../../httpClient';

export default function IdleUser() {

    const { isAuth } = useContext(Context)
    const [session, setSession] = useState(false)
    const [alertErr, setAlertErr] = useState();

    const handleOnActive = async () => {
        if(isAuth) {
            try {
                const res = await httpClient('/check_token_exp')

                if (res.data === 'token expired') {
                    console.log(res.data)
                    setSession(true)
                    setAlertErr('Sorry, Your session has ended')
                    setTimeout(() => window.location = '/popular/1', 2500)
                }    
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    const timerRef = useRef()
    return (
        <div>
            {session && <SessionAlert alertErr={alertErr} />}
            <IdleTimer
            ref={timerRef} timeout={2 * 3600000}
            onActive={handleOnActive}
             />
        </div>
    )
}
