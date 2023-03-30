import { Container, InputGroup, Form, Button, Row, Col, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import TonosService from '../../services/TonosService'

function SearchPatientModal(props) {
  const [ findLabel, setFindLabel ] = useState('')
  const [ choice, setChoice ] = useState(-1)
  const [ selected, setSelected ] = useState(true)
  const findPatient = async () => {
    if (props.doctor_id != null) {
      if (choice > 2 || choice < 0) 
        setSelected(false)
      else {
        const patients = await TonosService.findPatinetByChoiceAndDoctorId(findLabel, choice, props.doctor_id)
        props.sendData(patients);
        props.onHide();
      }
      

    } 
    else {
      if (choice > 2 || choice < 0) 
        setSelected(false)
      else {
        const patients = await TonosService.findPatientByChoice(findLabel, choice)
        props.sendData(patients)
        props.onHide();
      }
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
      <Modal.Title>Найти пациента</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Выберите критерий поиска снизу и введите</Form.Label>
          <Form.Control  onChange={e => setFindLabel(e.target.value)} value={findLabel}></Form.Control>
        </Form.Group>
        {!selected ? <><Form.Label style={{color: 'red'}}>Выберите критерий поиска!</Form.Label></> : <></>}
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  label="ФИО"
                  name="group1"
                  value="0"
                  type={'radio'}
                  id={`reverse-radio-1`}
                  onChange={e=>setChoice(e.target.value)}
                 
                />
                <Form.Check
                  value="1"
                  label="Полис"
                  name="group1"
                  type={'radio'}
                  id={`reverse-radio-2`}
                  onChange={e=>setChoice(e.target.value)}
                />
                <Form.Check
                  value="2"
                  name="group1"
                  label="Снилс"
                  type={'radio'}
                  id={`reverse-radio-3`}
                  onChange={e=>setChoice(e.target.value)}
                />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
        Закрыть
      </Button>
      <Button variant="primary" onClick={findPatient}>Найти</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default SearchPatientModal