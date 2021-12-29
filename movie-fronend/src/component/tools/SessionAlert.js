import React from 'react'
import { Modal } from "react-bootstrap";

export default function SessionAlert({alertErr}) {

    return (
        <div>
            <Modal show>
                <Modal.Body> 
                   {alertErr}
                </Modal.Body>
            </Modal>
        </div>
    )
}
