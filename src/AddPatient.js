import React, {useState} from 'react'
import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap'
import Header from './Components/Header'
import SearchPatientModal from './Components/Modals/SearchPatientModal';
import MaskedFormControl from 'react-bootstrap-maskedinput'
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import "react-datepicker/dist/react-datepicker.css";
import TonosService from './services/TonosService';
function AddPatient() {

  const handleShow = () => setModalShow(true);
  const [modalShow, setModalShow] = useState(false);
  
  const [exists, setExists] = useState(false);
  const [secondName, setSecondName] = useState()
  const [firstName, setFirstName] = useState()
  const [patronomicName, setPatronomicName] = useState()
  const [phone, setPhone] = useState()
  const [email, setEmail] = useState()
  const [snils, setSnils] = useState()
  const [polis, setPolis] = useState()
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState()
  const [adress, setAdress] = useState()
  const [district, setDistrict] = useState()
  const changeExisting = () => {
    if (exists) {
      setExists(false)
    }
    else {
      setExists(true)
    }
  }

  const register = () => {
    TonosService.regPatient(secondName, firstName, patronomicName, phone, email, snils, polis, birthDate, gender, adress, district)
  }

  return (
    <>
      <Header/>
      <Container  style={{paddingLeft: '72px'}}>
        <div className="mt-5 vh-100 justify-content-center align-items-center">
          <Form.Check 
            type='switch'
            id={`default-checkbox`}
            label={`Пациент уже был зарегестрирован`}
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
                    Выбрать пациента
                  </Button>
                  
                </Col>
              </Row>
          } 
        </div>
      </Container>
      <SearchPatientModal show={modalShow} onHide={() => setModalShow(false)}/>
    </>

  )
}

export default AddPatient