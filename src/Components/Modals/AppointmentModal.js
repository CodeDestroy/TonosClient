import { Container, InputGroup, Form, Button, Row, Col, Modal } from 'react-bootstrap'
import MaskedFormControl from 'react-bootstrap-maskedinput'
import DatePicker from "react-datepicker";
import React, { useEffect, useState, useRef } from 'react'
import TonosService from '../../services/TonosService'
import ru from 'date-fns/locale/ru';
import AdminService from '../../services/AdminService';
import FileService from '../../services/FileService'
import {Button as MuiButton} from '@mui/material/';
import {Autocomplete, TextField} from '@mui/material/';


function AppointmentModal(props) {


  const [mkb10, setMkb10] = useState([])
  const [components, setComponents] = useState([]);
  const [saved ,setSaved] = useState(false)
  const [anamnesis, setAnamnesis] = useState([])
  const handleAddComponent = (anamnesis) => {

    if (!anamnesis.target) {
      anamnesis.forEach((el, i) => {
        components.push(<ChildComponent hint={el} setvalue={getMkb} key={el.id}/>)
      })
      setComponents([...components, <ChildComponent setvalue={getMkb}/>]); // Добавляем новый компонент в массив состояния
      handleRemoveComponent(components.length)
    }
    else {
      setComponents([...components, <ChildComponent setvalue={getMkb}/>]); // Добавляем новый компонент в массив состояния
    }
  };
  const getMkb = (mkb) => {
    mkb10.push(mkb)
  }

  const handleRemoveComponent = (index) => {
    // Функция для удаления компонента
    const updatedComponents = [...components]; // Создаем копию массива компонентов
    updatedComponents.splice(index, 1); // Удаляем компонент по индексу
    const mkb = mkb10
    mkb.splice(index, 1)
    setMkb10(mkb)/* 
    mkb10.slice(index, 1) */
    setComponents(updatedComponents); // Устанавливаем обновленный массив состояния
  };


  useEffect(() => {
    setComponents([])
    setMkb10([])
    setAnamnesis([])
    TonosService.getAnamnesisByPatinetId(props.patient.patient_id)
    .then((result) => {
      setAnamnesis(result.data)
    })
  },[props.patient])

  useEffect(() => {
    if (anamnesis.length > 0) {
      handleAddComponent(anamnesis)
      anamnesis.forEach((el) => {
        getMkb(el)
      })
    }
  }, [anamnesis])

  const getContract = async () => {
      FileService.getContractFileNameByApID(props.patient.id)
      .then((fileName) => {
        FileService.fetch_pdf(fileName)
      })
  }

  const getReturnAct = async () => {
    FileService.getReturnActFileNameByApID(props.patient.id)
    .then((fileName) => {
      FileService.fetch_pdf(fileName)
    })
  }


  const closeAppointment = async () => {
    TonosService.closeAppointment(props.patient.id)
    FileService.createReturnAct(props.patient.id)
      .then((fileName) => {
        FileService.fetch_pdf(fileName)
      })
  }

  const saveChanges = async () => {
    const anamnesis = await TonosService.setChangesToPatient(props.patient.patient_id, mkb10)
    if (anamnesis.data.count) {
      setSaved(true)
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
      
        <h4>{props.patient.full_name}</h4>
        <p>
          Инфорамация
        </p>
        
        <p>
            <Button onClick={getContract}>
            Скачать контракт и акт получения
            </Button>
        </p>
        <p>
            { !props.patient.finished ? 
                <Button onClick={closeAppointment}>
                    Завершить приём и распечатать акт возврата
                </Button> 
                :
                <Button onClick={getReturnAct}>
                    Скачать акт возврата
                </Button>
            }
        </p>
        {!saved ?
        <>
          <MuiButton onClick={handleAddComponent}>Добавить диагноз</MuiButton>
          <Container>
            {components.map((component, index) => (
              
              <Row>
                <div key={index} style={{display: 'flex'}}>
                  <Col sm='12' md='6' lg='9'>
                    {component}
                  </Col>
                  <Col sm='12' md='6' lg='3'>
                    <MuiButton className="my-2 mx-1" onClick={() => handleRemoveComponent(index)}>Удалить</MuiButton>
                  </Col>
                </div>
              </Row>
              
            ))}
          </Container>
        </>
        :
        <>
          <h4>Изменения сохранены!</h4>
        </>
        }
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
        Закрыть
      </Button>
      {!saved && <Button variant="primary" onClick={saveChanges}>Сохранить изменения</Button>}
    </Modal.Footer>
  </Modal>
  )
}

function ChildComponent (props) {

  const [hints, setHinst] = useState([])

  const handleInputChange = async e => {
      const value = e.target.value;
      if (value.length>=  3) {
        const results = await TonosService.getMKB(value);
        setHinst(results.data)
      }
  }
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={hints}
        onChange={(event, newValue) => {
          props.setvalue(newValue);
        }}
        value={props.hint ? props.hint : null}
        renderInput={(params) => <TextField {...params} onChange={e => handleInputChange(e)} label="Диагноз" />}
      />
    </>
  )
}


export default AppointmentModal