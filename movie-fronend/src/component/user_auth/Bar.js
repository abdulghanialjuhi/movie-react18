import React from 'react'

export default function Bar({ actvie, setActive }) {


    return (
        <div className='bar-container'>
            <div onClick={() =>  setActive(false)} className={actvie ? "login-button": 'login-button active-bar'}>
                Log in
            </div>
            <div onClick={() => setActive(true)} className={actvie ? "signup-button active-bar":"signup-button" }>
                Sign up
            </div>
        </div>
    )
}
