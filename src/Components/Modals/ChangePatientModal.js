import { Container, InputGroup, Form, Button, Row, Col, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import TonosService from '../../services/TonosService'

function ChangePatientModal(props) {
  const [ findLabel, setFindLabel ] = useState('')
  const [ choice, setChoice ] = useState('')
  const [ selected, setSelected ] = useState(true)

  const [secondName, setSecondName] = useState(props.patient.surname)

  const findPatient = async () => {
    if (choice > 2) 
      setSelected(false)
    else {
      const patients = await TonosService.findPatientByChoice(findLabel, choice)
      props.sendData(patients)
      props.onHide();
    }
  }



  return (
    <Modal
    {...props}
    //backdrop="static"
    keyboard={false}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>Изменить пациента</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        { props.patient && 
            <>
              <Form.Label htmlFor="basic-email">Фамилия</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Фамилия"
                    aria-label="Фамилия"
                    aria-describedby="basic-addon1"
                    onChange={e => setSecondName(e.target.value)}
                    value={secondName}
                  />
                </InputGroup>
                {/* <ul>
                  <li key={`${props.patient.surname}_surname`}>
                      {props.patient.surname}
                  </li>
                  <li key={`${props.patient.surname}_name`}>
                      {props.patient.name}
                  </li>
                  <li key={`${props.patient.surname}_patronomic_name`}>
                      {props.patient.patronomic_name}
                  </li>
                  <li key={`${props.patient.surname}_snils`}>
                      {props.patient.snils}
                  </li>
                  <li key={`${props.patient.surname}_polis`}>
                      {props.patient.polis}
                  </li>
              </ul> */}
            </>
            
        }
        
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
        Закрыть
      </Button>
      <Button variant="primary" >Сохранить изменения</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ChangePatientModal