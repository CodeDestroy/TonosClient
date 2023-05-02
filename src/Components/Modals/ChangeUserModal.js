import { Container, InputGroup, Form, Button, Row, Col, Modal } from 'react-bootstrap'
import MaskedFormControl from 'react-bootstrap-maskedinput'
import DatePicker from "react-datepicker";
import React, { useEffect, useState, useRef, useCallback, useMemo, useContext } from 'react'
import TonosService from '../../services/TonosService'
import ru from 'date-fns/locale/ru';
import AdminService from '../../services/AdminService';
import debounce from 'lodash/debounce';
import { Context } from '../..';
function ChangeUserModal(props) {
  
  const [changedPatinet, setChangedPatinet] = useState(null)

  const [doctor_id, setDoctor_id] = useState(props.user.d_id)
  const [tabelNum ,setTabelnum] = useState(props.user.tabel_num)
  const [secondName, setSecondName] = useState(props.user.d_surname)
  const [firstName, setFirstName] = useState(props.user.d_name) 
  const [patronomicName, setPatronomicName] = useState(props.user.d_patronomic_name)
  const [phone, setPhone] = useState(props.user.d_phone ? props.user.d_phone.substring(3) : null)
  const [email, setEmail] = useState(props.user.d_email ? props.user.d_email : null)
  const [birthDate, setBirthDate] = useState(Date.parse(props.user.d_birth_date));
  const [gender, setGender] = useState(props.user.d_gender_id)
  const [roles, setRoles] = useState([])
  const [userRole, setUserRole] = useState(props.user.uu_role_id)
  const { store } = useContext(Context);
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

  useEffect(() => {
    inputEl.current.value = props.user.mo_medical_org_name;
    inputElPost.current.value = props.user.med_post_name;
  }, [props.user])
  

  const [ orgId, setOrgId] = useState(props.user.medical_org_id)
  const [postId, setPostId] = useState(props.user.med_post_id)

  const [results, setResults] = useState([]);
  const inputEl = useRef(null);
  const inputElPost = useRef(null);
  const [show, setShow] = useState(true)
  
  const [showPost, setShowPost] = useState(true)
  const [posts, setPosts] = useState([])

  const [error, setError] = useState('')






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



  const saveChanges = async () => {
    const user = {
      doctor_id, tabelNum, secondName, firstName, patronomicName, phone, email, birthDate, postId, userRole

    }
    const response = await AdminService.saveChangesToUser(user);
    setChangedPatinet(response.data)
  }

  const close = () => {
    props.onHide();
    if (changedPatinet)
      window.location.reload(false);
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
        {error.length > 0 && <h4 style={{color: 'red'}}>{error}</h4>}
        { props.user && !changedPatinet ?
            <>
                <Form.Label >Фамилия</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Фамилия"
                    aria-label="Фамилия"
                    aria-describedby="basic-addon1"
                    onChange={e => setSecondName(e.target.value)}
                    value={secondName}
                  />
                </InputGroup>

                <Form.Label >Имя</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Имя"
                    aria-label="Имя"
                    aria-describedby="basic-addon1"
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                  />
                </InputGroup>

                <Form.Label >Отчество</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Отчество"
                    aria-label="Отчество"
                    aria-describedby="basic-addon1"
                    onChange={e => setPatronomicName(e.target.value)}
                    value={patronomicName}
                  />
                </InputGroup>

                <Form.Label >Табельный номер</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Номер"
                    aria-label="Номер"
                    aria-describedby="basic-addon1"
                    onChange={e => setTabelnum(e.target.value)}
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

                <Form.Label >Электронная почта</Form.Label>
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
                </div>
                <div className='mb-3'>
                  <Form.Label htmlFor="basic-dolzhnost">Роль</Form.Label>
                  {roles.length > 0 && 
                    <Form.Select 
                    onChange={e => {setUserRole(e.target.value);}} 
                    aria-label="Пол"
                    defaultValue={userRole}
                    >
                        {roles.map((role, index) => 
                          <option value={role.id}>{role.role}</option>
                        )}
                      
                    </Form.Select>}
                </div>
            </>   
            :
            <><h3>Изменения внесены!</h3></>
        }
        
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={close}>
        Закрыть
      </Button>
      {!changedPatinet && <Button variant="primary" onClick={saveChanges}>Сохранить изменения</Button>}
    </Modal.Footer>
  </Modal>
  )
}

export default ChangeUserModal