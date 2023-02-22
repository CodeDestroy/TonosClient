import { Container, InputGroup, Form, Button, Row, Col, Modal } from 'react-bootstrap'
import React from 'react'

function SearchPatientModal(props) {
  return (
    <Modal
    {...props}
    backdrop="static"
    keyboard={false}
  >
    <Modal.Header closeButton>
      <Modal.Title>Найти пациента</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Выберите критерий поиска снизу и введите</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form>
            {['radio'].map((type) => (
              <div key={`reverse-${type}`} className="mb-3">
                <Form.Check
                  label="ФИО"
                  name="group1"
                  type={type}
                  id={`reverse-${type}-1`}
                 
                />
                <Form.Check
                  label="Полис"
                  name="group1"
                  type={type}
                  id={`reverse-${type}-2`}
                  
                />
                <Form.Check
                  name="group1"
                  label="Снилс"
                  type={type}
                  id={`reverse-${type}-3`}
                  
                />
              </div>
            ))}
          </Form>
        </Form.Group>
        <Button>Выбрать</Button>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
        Закрыть
      </Button>
      <Button variant="primary">Подтвердить</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default SearchPatientModal