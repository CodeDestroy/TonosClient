import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react'
function UnSuccessfulSendingTonosModal(props) {

  return (
    <Modal 
        {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title>Данные не были переданы</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>1. Проверьте отобразились ли данные измерения давления на экране.</p>
            <p>2. Если данные не отобразились, прочтите инструкцию ниже на странице и попробуйте еще раз.</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
                Закрыть
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default UnSuccessfulSendingTonosModal