import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react'

function SuccessfulSendingTonos(props) {
    
  return (
    <Modal 
        {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
            <Modal.Title>Данные были успешно переданы</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Вы можете просмотреть данные измерений и их динамику на графике во вкладке "Статистика измерений"</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
                Закрыть
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default SuccessfulSendingTonos