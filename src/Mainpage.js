import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import Header from './Components/Header'
import { useHistory } from "react-router-dom";
function Mainpage() {

  const history = useHistory()

  const showTonometr = () => {
    history.push("/userTonometr")
  }

  return (
    <>
      <Header/>
      <Container className='d-flex align-items-center justify-content-around' style={{marginTop: '10em'}}>
        <Row className='flex-row'>
          <Col className='flex-column' style={{margin: '0em 5em 0em 0em'}}>
            <Button className="btn-secondary btn-lg px-2" style={{minHeight: '140px', minWidth: '320px', maxWidth: '320px'}}>
              Статистика Врач -&gt; Пациент
            </Button>
          </Col>
          <Col className='flex-column' style={{margin: '0em 0em 0em 5em'}}>
            <Button onClick={showTonometr} className="btn-secondary btn-lg px-2" style={{minHeight: '140px', minWidth: '320px', maxWidth: '320px'}}>
              Дистанционная тонометрия
            </Button>
          </Col>
        </Row>
      </Container>
      <Container className='d-flex align-items-center justify-content-around' style={{marginTop: '10em'}}>
        <Row className='flex-row'>
          <Col className='flex-column' style={{margin: '0em 5em 0em 0em'}}>
            <Button className="btn-secondary btn-lg px-2" style={{minHeight: '140px', minWidth: '320px', maxWidth: '320px'}}>
              Мониторинг ключевых показателей
            </Button>
          </Col>
          <Col className='flex-column' style={{margin: '0em 0em 0em 5em'}}>
            <Button className="btn-secondary btn-lg px-2" style={{minHeight: '140px', minWidth: '320px', maxWidth: '320px'}}>
              Справочники
            </Button>
          </Col>
        </Row>
      </Container>
    </>
    
  )
}

export default Mainpage

