import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function PopModal({ show, setShow, handleLogin, message }) {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Alert</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)} variant="secondary">
          Close
        </Button>
        <Button onClick={handleLogin} variant="primary">
          Log in now{" "}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
