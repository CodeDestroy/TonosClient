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
/* import FileService from './services/FileService'; */
import AcceptPatient from './Components/Modals/AcceptPatient';
import * as Icon from 'react-bootstrap-icons';

function AddPatient() {

  const handleShow = () => setModalShow(true);
  const [modalShow, setModalShow] = useState(false);

  const handleShowPatient = () => setModalChangePatientShow(true);
  const [modalChangePatientShow, setModalChangePatientShow] = useState(false);

  const handleShowAccepting = () => showAcceptPatient(true)
  const [ modalAcceptPatient, showAcceptPatient ] = useState(false)

  const [patients, setPatients] = useState([])
  const [ patientId, setPatientId ] = useState(-1)
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
  const [ districts, setDistricts ] = useState([])

  const [error, setError] = useState(null)

  useEffect(() => {
    TonosService.getDistricts().then((result) => {
      setDistricts(result.data)
    })
  }, [])

  const getData = (val) => {
    // do not forget to bind getData in constructor
    //console.log(val);
    setPatients([])
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
  const accpetPatient = event => {
    setPatientId(event.currentTarget.id)
    handleShowAccepting()
  }
  const changePatient = event => {
    
    setPatientId(event.currentTarget.id)
    console.log(patients[event.currentTarget.id])
    handleShowPatient()
    
  }
  useEffect (() => {
    //console.log(patients)
  }, [patients])
  const register = async () => {
    setPatients([])
    try {
      const patient = await TonosService.regPatient(phone, email, snils, polis,  district, password)

      let c = []
      c.push(patient.data)
      setPatients(c)
      //patients.push(patient.data)
      setShowPatients(true)
      changeExisting()
      setError(null)
    }
    catch (e) {
      setError(e.response.data)
    }

    
    
    
  }

  /* const print = async () => {
    const state = {
      sys: 120,
      dia: 80,
      pul: 60,
    }

    const response = await FileService.print(state)
    
  } */

  return (
    <>
      <Header/>
      <Container  style={{paddingLeft: '72px'}}>
        <div className="mt-5 vh-100 justify-content-center align-items-center">
          <Form.Check 
            type='switch'
            id={`default-checkbox`}
            label={`Повторный приём`}
            onChange={changeExisting}
          />
          {error && <h4 style={{color: 'red'}}>{error}</h4>}
          {
            !exists ? 
            <>
              <Row className="justify-content-center align-items-center">
                {/* <Form.Label htmlFor="basic-email">Фамилия</Form.Label>
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
                </InputGroup> */}

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
                {/* <div className="d-flex mb-3">
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
                </div> */}
                
                {/* <InputGroup>
                  <InputGroup.Text>Адрес</InputGroup.Text>
                  <Form.Control onChange={e => setAdress(e.target.value)} value={adress} as="textarea" aria-label="Адрес" />
                </InputGroup> */}
                <div className="d-flex my-3">
                  <Form.Select onChange={e => {setDistrict(e.target.value);}} aria-label="Район прописки">
                      <option>Район прописки</option>
                      {
                        districts && 
                          districts.map((district, index) => 
                            <option value={district.id}>{district.name}</option>
                          )
                      }
                  </Form.Select>
                </div>
                {/* <Form.Label htmlFor="basic-email">Логин</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control 
                    placeholder="Логин"
                    aria-label="Логин" 
                    id="basic-login" 
                    onChange={(e) => setLogin(e.target.value)}
                    value={login}
                  />
                </InputGroup> */}
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
                    Зарегистрировать
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
              <Table striped bordered hover responsive="md">
                <thead>
                  <tr key='0'>
                    {Array.from({ length: 1 }).map((_, index) => (
                      <th key='th_1'>#</th>
                    ))}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <th key='th_2'>Фамилия</th>
                    ))}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <th key='th_3'>Имя</th>
                    ))}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <th key='th_4'>Отчество</th>
                    ))}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <th key='th_5'>СНИЛС</th>
                    ))}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <th key='th_6'>Полис</th>
                    ))}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <th key='th_7'>Дата начала приёма</th>
                    ))}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <th key='th_8'>Статус приёма</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {
                  patients.map((patient, index) => 
                    <tr key={`tr_${patient.p_id}`}>
                      <td key={`td_${patient.id}`}>{index+1}</td>
                      <td key={`td_${patient.p_surname}_surname`}>{patient.p_surname}</td>
                      <td key={`td_${patient.p_name}_name`}>{patient.p_name}</td>
                      <td key={`td_${patient.p_patronomic_name}_patr_name`}>{patient.p_patronomic_name}</td>
                      <td key={`td_${patient.snils}`}>{patient.snils}</td>
                      <td key={`td_${patient.polis}`}>{patient.polis}</td>
                      <td key={`td_${patient.ap_date}`}>{patient.ap_date}</td>
                      <td key={`td_${patient.finished}_index`}>{(patient.finished == '' || patient.finished == null) ? 'Открыт' : patient.finished}</td>
                      <td key={`td_${patient.uud_id}_change_btn`}>
                        <Button id={index} onClick={accpetPatient}>Принять пациента</Button>
                        <Button id={index} onClick={changePatient}>
                          <Icon.PencilFill width={'20px'}/>
                        </Button>
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
      { patients[patientId] && 
        <>
          <ChangePatientModal show={modalChangePatientShow} patient={patients[patientId]} onHide={() => setModalChangePatientShow(false)}/>
          <AcceptPatient show={modalAcceptPatient} patient={patients[patientId]} onHide={() => showAcceptPatient(false)}/>
        </>
      }
      
      <SearchPatientModal show={modalShow} sendData={getData} onHide={() => setModalShow(false)}/>
      
    </>

  )
}

export default AddPatient