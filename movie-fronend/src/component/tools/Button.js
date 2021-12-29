import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

export default function FormButton({ name, loading, className }) {
    return (
            <Button 
            type="submit"
            disabled={loading}
            style={{marginTop: 20}}
            className={className}
            > 
                {loading ? <Spinner animation='border' style={{width: 15, height:15}} />  :name}
            </Button>
    )
}
