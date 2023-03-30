import { Container, InputGroup, Form, Button, Row, Col, Modal } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import TonosService from '../../services/TonosService'
import MaskedFormControl from 'react-bootstrap-maskedinput'
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';

function RegisterUser(props) { 
  /* const [ findLabel, setFindLabel ] = useState('') */
  const [ choice, setChoice ] = useState('')
  const [ selected, setSelected ] = useState(true)

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
  
  const [ districts, setDistricts ] = useState([])

  useEffect(() => {
    TonosService.getDistricts().then((result) => {
      setDistricts(result.data)
    })
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
      <Modal.Title>Добавить нового пользователя</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        {!selected ? <><Form.Label style={{color: 'red'}}>Выберите тип пользователя</Form.Label></> : <></>}
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  label="Врач"
                  name="group1"
                  value="0"
                  type={'radio'}
                  id={`reverse-radio-1`}
                  onChange={e=>setChoice(e.target.value)}
                 
                />
                <Form.Check
                  value="2"
                  name="group1"
                  label="Администратор"
                  type={'radio'}
                  id={`reverse-radio-3`}
                  onChange={e=>setChoice(e.target.value)}
                />
        </Form.Group>
      </Form>
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
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
        Закрыть
      </Button>
      {<Button variant="primary" >Найти</Button>}
    </Modal.Footer>
  </Modal>
  )
}

export default RegisterUser