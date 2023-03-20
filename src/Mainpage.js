import React, { useEffect, useContext, useState } from 'react'
import { Button, Container, Row, Col, Card } from 'react-bootstrap'
import Header from './Components/Header'
import { useHistory } from "react-router-dom";
import { Context } from '.';
import './MainPage.css';
import AuthService from './services/AuthService';


function Mainpage() {
  const [ doctor, setDoctor ] = useState(null);

  const { store } = useContext(Context);
  useEffect (() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
      getDoctor();
    }
  }, [store])

  /* useEffect(() => {
    
  }, []) */

  const getDoctor = async () => {
    if (store.user) {
      const response = await AuthService.getDoctor(store.user.patient_id)
      setDoctor(response.data[0])
    }
  }
  const history = useHistory()

  const showTonometr = () => {
    history.push("/userTonometr")
  }
  
  const showMonitoring = () => {
    history.push("/monitoring")
  }

  const showTonosStat = () => {
    history.push("/tonosStat")
  }

  return (
    <>
      <Header/>
        <Container className='align-items-center justify-content-around' style={{marginTop: '10em', paddingLeft: '72px'}}>
          
          <Row className='mx-5 my-5'>
            <Col className='my-3 flex-column align-items-center justify-content-around'>
              <Button className="main-btn btn-secondary btn-lg px-2" style={{minHeight: '140px', minWidth: '246px', maxWidth: '320px'}} onClick={showTonosStat}>
                Статистика измерений
              </Button>
            </Col>
            <Col className='my-3 flex-column align-items-center justify-content-around'>
              <Button onClick={showTonometr} className="main-btn btn-secondary btn-lg px-2" style={{minHeight: '140px', minWidth: '246px', maxWidth: '320px'}}>
                Дистанционная тонометрия
              </Button>
            </Col>
          </Row>
          { store.user.role != 2 &&
            <Row className='mx-5 my-5'>
              <Col className='my-3 flex-column align-items-center justify-content-around'>
                <Button onClick={showMonitoring} className="main-btn btn-secondary btn-lg px-2" style={{minHeight: '140px', minWidth: '246px', maxWidth: '320px'}}>
                  Мониторинг ключевых показателей
                </Button>
              </Col>
              <Col className='my-3 flex-column align-items-center justify-content-around'>
                <Button className="main-btn btn-secondary btn-lg px-2 " style={{minHeight: '140px', minWidth: '246px', maxWidth: '320px'}}>
                  Справочники
                </Button>
              </Col>
            </Row>
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
        </Container>
    </>

      // <>
      //     <Header/>
      //     <div className='align-items-center justify-content-around' style={{paddingLeft: '72px'}}>
      //     <Container className=''>
      //       <Row>
      //         <Col md={8} lg={6} xs={12} className='btn-group' >
      //           <Button className="btn-secondary btn-lg px-2" style={{minHeight: '140px', minWidth: '300px', maxWidth: '320px'}}>
      //             Статистика Врач -&gt; Пациент
      //           </Button>
      //         </Col>
      //         <Col md={8} lg={6} xs={12} className='btn-group' >
      //           <Button onClick={showTonometr} className="btn-secondary btn-lg px-2" style={{minHeight: '140px', minWidth: '300px', maxWidth: '320px'}}>
      //             Дистанционная тонометрия
      //           </Button>
      //         </Col>
      //       </Row>
      //       <Row>
      //         <Col md={8} lg={6} xs={12} className='btn-group' >
      //           <Button onClick={showMonitoring} className="btn-secondary btn-lg px-2" style={{minHeight: '140px', minWidth: '300px', maxWidth: '320px'}}>
      //             Мониторинг ключевых показателей
      //           </Button>
      //         </Col>
      //         <Col md={8} lg={6} xs={12} className='btn-group'>
      //           <Button className="btn-secondary btn-lg px-2 " style={{minHeight: '140px', minWidth: '300px', maxWidth: '320px'}}>
      //             Справочники
      //           </Button>
      //         </Col>
      //       </Row>
      //     </Container>
      //     </div>
      // </>
    
  )
}

export default Mainpage

