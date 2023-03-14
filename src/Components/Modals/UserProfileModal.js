import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../..';

function UserProfileModal(props) {
  const { store } = useContext(Context);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Профиль
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{store.user.full_name}</h4>
        <p>
          Инфорамация
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserProfileModal