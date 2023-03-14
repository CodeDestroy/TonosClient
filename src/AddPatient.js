import React, {useEffect, useState} from 'react'
import { Container, Row, Col, Button, InputGroup, Form, Table } from 'react-bootstrap'
import Header from './Components/Header'
import SearchPatientModal from './Components/Modals/SearchPatientModal';
import ChangePatientModal from './Components/Modals/ChangePatientModal';
import MaskedFormControl from 'react-bootstrap-maskedinput'
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import "react-datepicker/dist/react-datepicker.css";
import TonosService from './services/TonosService';


function AddPatient() {

  const handleShow = () => setModalShow(true);
  const [modalShow, setModalShow] = useState(false);

  const handleShowPatient = () => setModalChangePatientShow(true);
  const [modalChangePatientShow, setModalChangePatientShow] = useState(false);

  const [patients, setPatients] = useState([])
  const [ patientId, setPatientId ] = useState(0)
  const [exists, setExists] = useState(false);
  const [secondName, setSecondName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [patronomicName, setPatronomicName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [snils, setSnils] = useState('')
  const [polis, setPolis] = useState('')
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState('')
  const [adress, setAdress] = useState('')
  const [district, setDistrict] = useState('')
  const [ login, setLogin ] = useState('')
  const [ password , setPassword] = useState('')

  const [ showPatients, setShowPatients ] = useState(null)

  const getData = (val) => {
    // do not forget to bind getData in constructor
    //console.log(val);
    setPatients(val.data)
  }  
  const changeExisting = () => {
    if (exists) {
      setExists(false)
    }
    else {
      setExists(true)
    }
  }

  const changePatient = event => {
    
    setPatientId(event.currentTarget.id)
    handleShowPatient()
    
  }
  useEffect (() => {
    //console.log(patients)
  }, [patients])
  const register = async () => {
    const patient = await TonosService.regPatient(secondName, firstName, patronomicName, phone, email, snils, polis, birthDate, gender, adress, district, login, password)
    let c = []
    c.push(patient.data)
    setPatients(c)
    //patients.push(patient.data)
    setShowPatients(true)
    changeExisting()
  }

  const createAcc = () => {

  }

  return (
    <>
      <Header/>
      <Container  style={{paddingLeft: '72px'}}>
        <div className="mt-5 vh-100 justify-content-center align-items-center">
          <Form.Check 
            type='switch'
            id={`default-checkbox`}
            label={`Пациент уже был добавлен`}
            onChange={changeExisting}
          />
          {
            !exists ? 
            <>
              <Row className="justify-content-center align-items-center">
                <Form.Label htmlFor="basic-email">Фамилия</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Иванов"
                    aria-label="Иванов"
                    aria-describedby="basic-addon1"
                    onChange={e => setSecondName(e.target.value)}
                    value={secondName}
                  />
                </InputGroup>

                <Form.Label htmlFor="basic-email">Имя</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Иван"
                    aria-label="Иван"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                </InputGroup>

                <Form.Label htmlFor="basic-email">Отчество</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Иванович"
                    aria-label="Иванович"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setPatronomicName(e.target.value)}
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
                  <Form.Select onChange={e => {setGender(e.target.value);}} aria-label="Пол"
                  >
                    <option>Пол</option>
                    <option value="1">Мужской</option>
                    <option value="2">Женский</option>
                  </Form.Select>
                </div>
                
                <InputGroup>
                  <InputGroup.Text>Адрес</InputGroup.Text>
                  <Form.Control onChange={e => setAdress(e.target.value)} value={adress} as="textarea" aria-label="Адрес" />
                </InputGroup>
                <div className="d-flex my-3">
                  <Form.Select onChange={e => {console.log(`district ${e.target.value}`); setDistrict(e.target.value);}} aria-label="Район прописки">
                      <option>Район прописки</option>
                      <option value="4">Воронеж</option>
                      <option value="5">Лиски</option>
                      <option value="6">Новая Усмань</option>
                      <option value="7">Россошь</option>
                      <option value="8">Борисоглебск</option>
                      <option value="9">Воронеж. Поликлинника №7</option>
                  </Form.Select>
                </div>
                <Form.Label htmlFor="basic-email">Логин</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control 
                    placeholder="Логин"
                    aria-label="Логин" 
                    id="basic-login" 
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                  />
                </InputGroup>
                <Form.Label htmlFor="basic-email">Пароль</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control 
                    placeholder="Пароль"
                    aria-label="Пароль" 
                    type="password"
                    id="basic-pass" 
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </InputGroup>
              </Row>
              <Row>
                <Col>
                  <Button className='btn-lg' onClick={register}>
                    Зарегестрировать
                  </Button>
                </Col>  
              </Row>  
            </>
            :
              <Row className="justify-content-center align-items-center my-3">
                <Col>
                  <Button variant="primary" onClick={handleShow} className='mx-3 btn-primary btn-lg'>
                    Найти пациента
                  </Button>
                  
                </Col>
              </Row>
          }
          {
            (patients.length > 0 || showPatients) ?
            <>
              <Table striped bordered hover>
                <thead>
                  <tr key='0'>
                    <th key='th_1'>#</th>
                    <th key='th_2'>Фамилия</th>
                    <th key='th_3'>Имя</th>
                    <th key='th_4'>Отчество</th>
                    <th key='th_5'>СНИЛС</th>
                    <th key='th_6'>Полис</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  patients.map((patient, index) => 
                    <tr key={`tr_${patient.id}`}>
                      <td key={`td_${patient.id}`}>{patient.id}</td>
                      <td key={`td_${patient.surname}_surname`}>{patient.surname}</td>
                      <td key={`td_${patient.name}_name`}>{patient.name}</td>
                      <td key={`td_${patient.patronomic_name}_patr_name`}>{patient.patronomic_name}</td>
                      <td key={`td_${patient.snils}`}>{patient.snils}</td>
                      <td key={`td_${patient.polis}`}>{patient.polis}</td>
                      <td key={`td_${patient.id}_change_btn`}>
                        <Button id={index} onClick={changePatient}>Изменить</Button>
                        <Button id={index} onClick={createAcc}>Создать аккаунт</Button>  
                      </td>

                    </tr>
                  )
                  }
                 
                </tbody>
              </Table>
            </>
            :
            <></> 
          } 
        </div>
      </Container>
      { patients[patientId] &&  <ChangePatientModal show={modalChangePatientShow} patient={patients[patientId]} onHide={() => setModalChangePatientShow(false)}/>}
      
      <SearchPatientModal show={modalShow} sendData={getData} onHide={() => setModalShow(false)}/>
      
    </>

  )
}

export default AddPatient