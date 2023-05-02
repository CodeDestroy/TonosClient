import React, { useEffect, useContext, useState, useDebugValue } from 'react'
import { Button, Container, Row, Col, Card, Table } from 'react-bootstrap'
import Header from './Components/Header'
import { useHistory } from "react-router-dom";
import { Context } from '.';
import './MainPage.css';
import AuthService from './services/AuthService';
import {socket} from './socket'


function Mainpage() {
  const [ doctor, setDoctor ] = useState(null);

  const { store } = useContext(Context);
  const [measures, setMeasures] = useState([])
  const [showMeasures, setShow] = useState(false)
  useEffect (() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
      getDoctor();
    }
    socket.on('connect', () => {
     console.log('Подключение установлено')
    })


    
  }, [store])

  const parseDateTime = (val) => {
    
    const timezoneOffset = new Date().getTimezoneOffset() / 60; 
    const moscowOffset = -3;
    const hourOffset = moscowOffset - timezoneOffset;

    let date = new Date(val.replace(/\.\d+Z/,'').replace('T', ' '));
    date.setHours(date.getHours() + hourOffset);
    
    return date.toLocaleString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'});
  }

  useEffect(() => {
    if (store.user.role == 4) {
      socket.on('connect', () => {
        console.log('connected')
        
        
      });
      socket.emit('room:join', store.user.doctor_id)
      
      socket.on('disconnect', () => { 
/*         socket.emit('leave', store.user.id)
        console.log('leave') */
        console.log('disconnected')
      }); 
      
    }
    socket.on('hello', (measures) => {
      setMeasures(measures)
    })

    socket.on('rooms', (rooms, map) => console.log(rooms, map))
    
    socket.on('room:joined', async (roomId) => {
      console.log('joined room', roomId)
    })
    
    
  },[])

  useEffect(()=>{
    
  })

  useEffect(() => {
    setShow(false)
    setShow(true)
  }, [measures])


  const getDoctor = async () => {
    if (store.user) {
      const response = await AuthService.getDoctor(store.user.patient_id)
      setDoctor(response.data[0])
    }
  }
  const history = useHistory()

  const showTonometr = () => {
    history.push("/userTonometr")
    socket.emit('leave', store.user.id)
  }
  
  const showMonitoring = () => {
    history.push("/monitoring")
    socket.emit('leave', store.user.id)
  }

  const showTonosStat = () => {
    history.push("/tonosStat")
    socket.emit('leave', store.user.id)
  }

  const showMeasure = () => {
    history.push("/userMeasure")
    socket.emit('leave', store.user.id)
  }

  const showAdministration = () => {
    history.push("/administration")
    socket.emit('leave', store.user.id)
    
  }

  return (
    <>
      <Header/>
        <Container className='align-items-center justify-content-around' style={{marginTop: '10em', paddingLeft: '72px'}}>
        { store.user.role == 2 && 
          <Row className='my-5'>
            <Col className='my-3 flex-column align-items-center justify-content-around'>
              <Button className="main-btn btn-secondary btn-lg px-2" /* style={{minHeight: '140px', minWidth: '246px', maxWidth: '320px'}}  */ style={{width: '100%', minHeight: '140px'}} onClick={showTonosStat}>
                Статистика измерений
              </Button>
            </Col>  
            
            
            <Col className='my-3 flex-column align-items-center justify-content-around'>
              <Button onClick={showTonometr} className="main-btn btn-secondary btn-lg px-2"/*  style={{minHeight: '140px', minWidth: '246px', maxWidth: '320px'}} */ style={{width: '100%', minHeight: '140px'}}>
                Дистанционная тонометрия
              </Button>
            </Col>
          </Row>
        }
          { store.user.role != 2 &&
            <>
             <Row className='my-5'>
                <Col className='my-3 flex-column align-items-center justify-content-around'>
                  <Button onClick={showMonitoring} className="main-btn btn-secondary btn-lg px-1" /* style={{minHeight: '140px', minWidth: '320px', maxWidth: '400px'}} */ style={{width: '100%', minHeight: '140px'}}>
                    Мониторинг ключевых показателей
                  </Button>
                </Col>
                
                <Col className='my-3 flex-column align-items-center justify-content-around'>
                  <Button className="main-btn btn-secondary btn-lg px-1 " onClick={showAdministration} /* style={{minHeight: '140px', minWidth: '320px', maxWidth: '400px'}} */ style={{width: '100%', minHeight: '140px'}}>
                    Администрирование
                  </Button>
                </Col>
                <Col className='my-3 flex-column align-items-center justify-content-around'>
                  <Button onClick={showMeasure} className="main-btn btn-secondary btn-lg px-1" /* style={{minHeight: '140px', minWidth: '320px', maxWidth: '400px'}} */ style={{width: '100%', minHeight: '140px'}}>
                    Статистика
                  </Button>
                </Col>
              </Row>
              {/* <Row className='mx-5 my-5'>
                <Col className='my-3 flex-column align-items-center justify-content-around'>
                  <Button onClick={showMeasure} className="main-btn btn-secondary btn-lg px-2" style={{minHeight: '140px', minWidth: '246px', maxWidth: '320px'}}>
                    Статистика
                  </Button>
                </Col>
              </Row> */}
            </>
           
            
          }
          
          { store.user.role == 2 &&
            <Row className='mx-5 my-5'>
              <Col md={4}>
                <Card className ="my-5">
                  <Card.Body>
                    {doctor && 
                      <Row >
                        <Card.Title>Информация о враче</Card.Title>
                          <Card.Text className ="my-3">ФИО: {doctor.full_name}</Card.Text>
                          <Card.Text>Email: {doctor.email}</Card.Text>
                          <Card.Link className="mb-3" href={"tel:" + doctor.phone}>Телефон: {doctor.phone}</Card.Link>
                          <Card.Text>Должность: {doctor.med_post}</Card.Text>
                      </Row>
                    }
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          }
          { store.user.role == 4 &&
            <Row>
              {showMeasures && <Table striped hover responsive="md">
                <thead key='head'>
                  <tr key='0'>
                    {Array.from({ length: 1 }).map((_, index) => (
                      <th key='th_0'>#</th>
                    ))}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <th key='th_1'>Пациент</th>
                    ))}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <th key='th_2'>Номер телефона пациента</th>
                    ))}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <th key='th_3'>SYS</th>
                    ))}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <th key='th_4'>DIA</th>
                    ))}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <th key='th_5'>PUL</th>
                    ))}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <th key='th_6'>Адрес</th>
                    ))}
                    {Array.from({ length: 1 }).map((_, index) => (
                      <th key='th_8'>Дата измерения</th>
                    ))}
                  </tr>
                </thead>
                <tbody key='body'>
                  {measures.map((measure, index) => {
                  return (
                    <>
                      <tr key={`tr_${index}`}>
                        <td key={`td_${measure.id}`}>{measure.id}</td>
                        <td key={`td_${measure.full_name}`}>{measure.full_name}</td>
                        <td key={`td_${measure.phone}`}>{measure.phone}</td>
                        <td key={`td_${measure.upper_pressure}`}>{measure.upper_pressure}</td>
                        <td key={`td_${measure.lower_pressure}`}>{measure.lower_pressure}</td>
                        <td key={`td_${measure.heart_rate}`}>{measure.heart_rate}</td>
                        <td key={`td_${measure.address}`}>{measure.address}</td>
                        <td key={`td_${measure.dt_dimension}`}>{parseDateTime(measure.dt_dimension)}</td>
                      </tr>
                    </>)
                    }
                  )}
                                    
                </tbody>
              </Table>}
            </Row>

          }
          
        </Container>
    </>
  )
}

export default Mainpage

