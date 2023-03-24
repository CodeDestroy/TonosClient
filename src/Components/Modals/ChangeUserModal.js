import { Container, InputGroup, Form, Button, Row, Col, Modal } from 'react-bootstrap'
import MaskedFormControl from 'react-bootstrap-maskedinput'
import DatePicker from "react-datepicker";
import React, { useEffect, useState } from 'react'
import TonosService from '../../services/TonosService'
import ru from 'date-fns/locale/ru';

function ChangeUserModal(props) {
  /* const [ findLabel, setFindLabel ] = useState('')
  const [ choice, setChoice ] = useState('')
  const [ selected, setSelected ] = useState(true)

  const [secondName, setSecondName] = useState(props.patient.surname)
  const [firstName, setFirstName] = useState(props.patient.name)
  const [patronomicName, setPatronomicName] = useState(props.patient.patronomic_name)
  const [phone, setPhone] = useState(props.patient.phone.substring(2))
  const [email, setEmail] = useState(props.patient.email)
  const [snils, setSnils] = useState(props.patient.snils)
  const [polis, setPolis] = useState(props.patient.polis)
  const [birthDate, setBirthDate] = useState(Date.parse(props.patient.birth_date));
  const [gender, setGender] = useState(props.patient.gender_id)
  const [adress, setAdress] = useState(props.patient.address)
  const [district, setDistrict] = useState(props.patient.sp_district_id) */

  /* const findPatient = async () => {
    if (choice > 2) 
      setSelected(false)
    else {
      const patients = await TonosService.findPatientByChoice(findLabel, choice)
      props.sendData(patients)
      props.onHide();
    }
  } */
  useEffect(() => {
    console.log(props.user)
  }, [])


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
        {/* { props.patient && 
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

                <div className="d-flex mb-3">
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

                  <Form.Select 
                  onChange={e => {setGender(e.target.value);}} 
                  aria-label="Пол"
                  defaultValue={gender}
                  >
                    <option>Пол</option>
                    <option value="1">Мужской</option>
                    <option value="2">Женский</option>
                  </Form.Select>
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
                  <Form.Select 
                    onChange={e => {console.log(`district ${e.target.value}`); 
                    setDistrict(e.target.value);}} 
                    aria-label="Район прописки"
                    defaultValue={district}
                    >
                      <option>Район прописки</option>
                      <option value="4">Воронеж</option>
                      <option value="5">Лиски</option>
                      <option value="6">Новая Усмань</option>
                      <option value="7">Россошь</option>
                      <option value="8">Борисоглебск</option>
                      <option value="9">Воронеж. Поликлинника №7</option>
                  </Form.Select>
                </div>
            </>   
        } */}
        
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

export default ChangeUserModal