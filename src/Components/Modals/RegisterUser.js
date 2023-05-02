import { Container, InputGroup, Form, Button, Row, Col, Modal } from 'react-bootstrap'
import React, { useState, useEffect, useRef, useMemo, useCallback, useContext } from 'react'
import TonosService from '../../services/TonosService'
import AuthService from '../../services/AuthService'
import MaskedFormControl from 'react-bootstrap-maskedinput'
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import debounce from 'lodash/debounce';
import { Context } from '../..';
function RegisterUser(props) { 
  const { store } = useContext(Context);
  const [ choice, setChoice ] = useState('')
  const [ selected, setSelected ] = useState(true)
  const [roles, setRoles] = useState([])
  const [secondName, setSecondName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [patronomicName, setPatronomicName] = useState('')
  const [tabelNum, setTableNum] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [birthDate, setBirthDate] = useState(new Date());
  const [gender, setGender] = useState('')
  const [adress, setAdress] = useState('')
  const [district, setDistrict] = useState('')
  const [ login, setLogin ] = useState('')
  const [ password , setPassword] = useState('')

  const [ orgId, setOrgId] = useState(null)
  const [postId, setPostId] = useState(null)
  const [results, setResults] = useState([]);
  const inputEl = useRef(null);
  const inputElPost = useRef(null);
  const [show, setShow] = useState(true)
  const [showPost, setShowPost] = useState(true)

  const [error, setError] = useState('')

  const [posts, setPosts] = useState([])
  const handleTintClick = useCallback((value, id) => {
    setShow(false)
    setPostId(null)
    inputEl.current.value = value;
  }, [inputEl]);

  const handleInputChange = useMemo(() => debounce(async e => {
    const { value } = e.target;
    setShowPost(false)
    if (value.length < 3) return;

    const results = await TonosService.getMedOrg(value);
    setResults(results.data)
    setShow(true)
  }, 800), []);


  const handleTintClickPost = useCallback((value, id) => {
    setShowPost(false)
    setPostId(id)
    inputElPost.current.value = value;
  }, [inputEl]);

  const handleInputChangePost = useMemo(() => debounce(async e => {
    const { value } = e.target;

    if (value.length < 3) return;
    
    if (orgId != null) {
      const results = await TonosService.getPostByOrgId(value, orgId);

      setPosts(results.data)
      setShowPost(true)
    }
    else {
      setError('Сначала выберите медицинскую организацию!')
    }
    
    
  }, 800), [orgId]);

  useEffect(() => {
    TonosService.getAvailableRoles(store.user.role).then((roles) => {
      const roles_exept_patient = [];
      roles.data.forEach(role => {
        if (role.role != 'Пациент')
          roles_exept_patient.push(role)
      });
      setRoles(roles_exept_patient); 
    
    });
  }, [store])



  const setOption = event => {
    setChoice(event)
    console.log(event)
  }

  const [registred, setRegistred] = useState(null)

  const register = async () => {
    const user = await AuthService.registrarion(choice, secondName, firstName, patronomicName, tabelNum, phone, email, birthDate, gender, postId, login, password)
    console.log(secondName, firstName, patronomicName, tabelNum, phone, email, birthDate, gender, postId, login, password)
    setRegistred(user)
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
      <Modal.Title>Добавить нового пользователя</Modal.Title>
      
    </Modal.Header>
    <Modal.Body>
      { !registred ? 
      <>
      <Form>
        {error.length > 0 && <h4 style={{color: 'red'}}>{error}</h4>}
        {!selected ? <><Form.Label style={{color: 'red'}}>Выберите тип пользователя</Form.Label></> : <></>}
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          {roles.length > 0 && 
            roles.map((role, index) => {
              if (role.id != 2)
                return (
                  <Form.Check
                  label={role.role}
                  name="group1"
                  value={role.id}
                  type={'radio'}
                  id={`reverse-radio-1`}
                  onChange={e=>setOption(e.target.value)}
                 
                />
                )
            })
          }
                
{/*                 <Form.Check
                  value="3"
                  name="group1"
                  label="Администратор"
                  type={'radio'}
                  id={`reverse-radio-3`}
                  onChange={e=>setOption(e.target.value)}
                /> */}
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

                <Form.Label htmlFor="basic-email">Табельный номер</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Номер"
                    aria-label="Номер"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setTableNum(e.target.value)}
                    value={tabelNum}
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
                
                  
                
                <Form.Label htmlFor="basic-organization">Организация</Form.Label>
                <InputGroup className="mb-3">
                  <input ref={inputEl} onChange={handleInputChange} style={{width: '100%'}} placeholder="Название организации" />
                  {results.length > 0 && show == true && (
                    <div style={{position: 'absolute', marginTop: '2rem', width: '50%', paddingLeft: '1em', zIndex: '1'}}>
                      {results.map((result, i) => 
                        <>
                          <button style={{border: '0', background: 'white', width: '100%', textAlign: 'left'}} onClick={() => { setOrgId(result.id); handleTintClick(result.medical_org_name, result.id)}} key={result.id}>
                            {result.medical_org_name}
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </InputGroup>
                <Form.Label htmlFor="basic-dolzhnost">Должность</Form.Label>
                <InputGroup className="mb-3">
                  <input ref={inputElPost} onChange={handleInputChangePost} style={{width: '100%'}} placeholder="Должность" />
                  {posts.length > 0 && showPost == true && orgId && (
                    <div style={{position: 'absolute', marginTop: '2rem', width: '50%', paddingLeft: '1em', zIndex: '1'}}>
                      {posts.map((result, i) => 
                        <>
                          <button style={{border: '0', background: 'white', width: '100%', textAlign: 'left'}} onClick={() => handleTintClickPost(result.med_post_name, result.id)} key={result.id}>
                            {result.med_post_name}
                          </button>
                        </>
                      )}
                    </div>
                  )}
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
              </>
            :
            <p>Пользователь {registred.data.full_name} успешно зарегестрирован!</p>  
            
            }
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
        Закрыть
      </Button>
      { !registred && <Button variant="primary" onClick={register}>Зарегестрировать</Button>}
    </Modal.Footer>
  </Modal>
  )
}

export default RegisterUser