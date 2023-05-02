import { Container, InputGroup, Form, Button, Row, Col, Modal } from 'react-bootstrap'
import MaskedFormControl from 'react-bootstrap-maskedinput'
import DatePicker from "react-datepicker";
import React, { useEffect, useState, useRef } from 'react'
import TonosService from '../../services/TonosService'
import ru from 'date-fns/locale/ru';
import AdminService from '../../services/AdminService';
import {AccordionSummary, Typography, AccordionDetails, TextField, Accordion} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ChangePatientModal(props) {

  const [ districts, setDistricts ] = useState([])
  
  const [changedPatinet, setChangedPatinet] = useState(null)

  const [ findLabel, setFindLabel ] = useState('')
  const [ choice, setChoice ] = useState('')
  const [ selected, setSelected ] = useState(true)

  const [patientId, setPatientId] = useState(props.patient.p_id)
  const [secondName, setSecondName] = useState(props.patient.p_surname)
  const [firstName, setFirstName] = useState(props.patient.p_name) 
  const [patronomicName, setPatronomicName] = useState(props.patient.p_patronomic_name)
  const [phone, setPhone] = useState(props.patient.p_phone.substring(3))
  const [email, setEmail] = useState(props.patient.p_email)
  const [snils, setSnils] = useState(props.patient.snils)
  const [polis, setPolis] = useState(props.patient.polis)
  const [birthDate, setBirthDate] = useState(Date.parse(props.patient.p_birth_date));
  const [gender, setGender] = useState(props.patient.p_gender_id)
  const [adress, setAdress] = useState(props.patient.p_address)
  const [district, setDistrict] = useState(props.patient.p_sp_district_id)
  const [newPass, setNewPass] = useState(null)
  const [changePasswordInput, setChangePasswordInput] = useState(false)
  const districtRef = useRef(district);
  const findPatient = async () => {
    if (choice > 2) 
      setSelected(false)
    else {
      const patients = await TonosService.findPatientByChoice(findLabel, choice)
      props.sendData(patients)
      props.onHide();
    }
  }

  useEffect(() => {
    TonosService.getDistricts().then((result) => {
      setDistricts(result.data)
      districtRef.current.value = district;
    })
  }, [])
  

  const saveChanges = async () => {
    const user = {
      p_id: patientId, secondName, firstName, patronomicName, phone, email, snils, polis, birthDate, gender, adress, district, newPass

    }
    const response = await AdminService.saveChangesToPatient(user);
    setChangedPatinet(response.data)
  }

  const changePass = () => {
    if (changePasswordInput == true) {
      console.log(false)
      setChangePasswordInput(false)
    }
    else {
      console.log(true)
      setChangePasswordInput(true)
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
      <Modal.Title>Изменить данные о пациенте</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        { props.patient && !changedPatinet ?
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

                <Form.Label htmlFor="basic-email">Имя</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Имя"
                    aria-label="Имя"
                    aria-describedby="basic-addon1"
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                  />
                </InputGroup>

                <Form.Label htmlFor="basic-email">Отчество</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Отчество"
                    aria-label="Отчество"
                    aria-describedby="basic-addon1"
                    onChange={e => setPatronomicName(e.target.value)}
                    value={patronomicName}
                  />
                </InputGroup>

                 <Form.Label htmlFor="basic-phonenumber">Номер телефона</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text id="basic-addon3">
                    +7
                  </InputGroup.Text>
                  <MaskedFormControl id="basic-phonenumber" aria-describedby="basic-addon3" type='text' name='phoneNumber' mask='(111)-111-11-11' 
                    onChange={(e) => setPhone(e.target.value)} value={phone} 
                  />
                </InputGroup>

                <Form.Label htmlFor="basic-email">Электронная почта</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control 
                    placeholder="example@example.ru"
                    aria-label="example@example.ru" 
                    id="basic-email" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </InputGroup>

                <Form.Label htmlFor="basic-phonenumber">СНИЛС</Form.Label>
                <InputGroup className="mb-3">
                  <MaskedFormControl id="basic-snils" type='text' name='snils' mask='111-111-111 11' onChange={(e) => setSnils(e.target.value)} value={snils} />
                </InputGroup>
                
                <Form.Label htmlFor="basic-phonenumber">Номер полиса</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control 
                    placeholder="Полис"
                    aria-label="Полис"
                    aria-describedby="basic-addon1" 
                    id="basic-polis" 
                    onChange={(e) => setPolis(e.target.value)}
                    value={polis}
                  />
                </InputGroup>

                <div className="mb-3">
                  <Form.Label htmlFor="basic-dolzhnost">Дата рождения</Form.Label>
                  <DatePicker
                    locale={ru}
                    selected={birthDate}
                    onChange={(date) => setBirthDate(date)}
                    showYearDropdown
                    maxDate={new Date()}
                    dropdownMode="select"
                    dateFormat="dd MMMM, yyyy"
                    scrollableYearDropdown
                  />

                  {/* <Form.Select 
                  onChange={e => {setGender(e.target.value);}} 
                  aria-label="Пол"
                  defaultValue={gender}
                  >
                    <option>Пол</option>
                    <option value="1">Мужской</option>
                    <option value="2">Женский</option>
                  </Form.Select> */}
                </div>

                <InputGroup>
                  <InputGroup.Text>Адрес</InputGroup.Text>
                  <Form.Control 
                    aria-label="Адрес" 
                    onChange={e => setAdress(e.target.value)} 
                    value={adress} as="textarea" 
                    />
                </InputGroup>

                <div className="d-flex my-3">
                  {
                    districts && 
                    <Form.Select ref={districtRef} onChange={e => {setDistrict(e.target.value);}} aria-label="Район прописки">
                        <option>Район прописки</option>
                        { 
                            districts.map((district, index) => 
                              <option value={district.id}>{district.name}</option>
                            )
                        }
                    </Form.Select>
                  }
                </div>
                <Accordion onChange={changePass}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography >Смена пароля</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField onChange={e => setNewPass(e.target.value)} style={{width: '100%'}} id="outlined-basic" label="Новый пароль" variant="outlined" />
                  </AccordionDetails>
                </Accordion>
            </>   
            :
            <><h3>Изменения внесены!</h3></>
        }
        
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
        Закрыть
      </Button>
      {!changedPatinet && <Button variant="primary" onClick={saveChanges}>Сохранить изменения</Button>}
    </Modal.Footer>
  </Modal>
  )
}

export default ChangePatientModal