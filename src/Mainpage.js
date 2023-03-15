import React, { useEffect, useContext } from 'react'
import { Button, Container, Row, Col, Card } from 'react-bootstrap'
import Header from './Components/Header'
import { useHistory } from "react-router-dom";
import { Context } from '.';
function Mainpage() {


  const { store } = useContext(Context);
  useEffect (() => {
    
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
    
  }, [store])

  const history = useHistory()

  const showTonometr = () => {
    history.push("/userTonometr")
  }
  
  const showMonitoring = () => {
    history.push("/monitoring")
  }

  return (
    <>
      <Header/>
        <Container className='d-flex align-items-center justify-content-around' style={{marginTop: '10em', paddingLeft: '72px'}}>
          <Row className='flex-row'>
            <Col className='flex-column' style={{margin: '0em 5em 0em 0em'}}>
              <Button className="btn-secondary btn-lg px-2" style={{minHeight: '140px', minWidth: '300px', maxWidth: '320px'}}>
                Статистика Врач -&gt; Пациент
              </Button>
            </Col>
            <Col className='flex-column' style={{margin: '0em 0em 0em 5em'}}>
              <Button onClick={showTonometr} className="btn-secondary btn-lg px-2" style={{minHeight: '140px', minWidth: '300px', maxWidth: '320px'}}>
                Дистанционная тонометрия
              </Button>
            </Col>
          </Row>
        </Container>
        <Container className='d-flex align-items-center justify-content-around' style={{marginTop: '10em', paddingLeft: '72px'}}>
          <Row className='flex-row'>
            <Col className='flex-column' style={{margin: '0em 5em 0em 0em'}}>
              <Button onClick={showMonitoring} className="btn-secondary btn-lg px-2" style={{minHeight: '140px', minWidth: '300px', maxWidth: '320px'}}>
                Мониторинг ключевых показателей
              </Button>
            </Col>
            <Col className='flex-column' style={{margin: '0em 0em 0em 5em'}}>
              <Button className="btn-secondary btn-lg px-2 " style={{minHeight: '140px', minWidth: '300px', maxWidth: '320px'}}>
                Справочники
              </Button>
            </Col>
          </Row>
        </Container>

        <Container className='d-flex align-items-center justify-content-around' style={{paddingLeft: '72px'}}>
          <Card style={{ width: '18rem', height: '15rem' }} className ="my-5">
            <Card.Body>
              <Row d-flex my-5 align-items-center justify-content-center>
                 <Card.Title>Информация о враче</Card.Title>
                  <Card.Text className ="my-3">ФИО</Card.Text>
                  <Card.Text>Email</Card.Text>
                  <Card.Text>Телефон</Card.Text>
                  <Card.Text>Должность</Card.Text>
                  {/* {
                  doctors.map((doctor, index) => 
                    <tr key={`tr_${doctor.id}`}>
                      <Card.Text>ФИО: {doctor.full_name}</Card.Text>
                      <Card.Text>Email: {doctor.email}</Card.Text>
                      <Card.Text>Телефон: {doctor.phone}</Card.Text>
                      <Card.Text>Должность: {doctor.med_post_id}</Card.Text>
                    </tr>
                  )
                  } */}
              </Row>
                      {/* <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link> */}
            </Card.Body>
          </Card>
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

