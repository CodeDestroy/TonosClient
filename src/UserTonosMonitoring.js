import React from 'react'
import Header from './Components/Header'
import { Container, InputGroup, Form, Button, Row, Col } from 'react-bootstrap'

function UserTonosMonitoring() {
  return (
    <>
        <Header/>
                <Container  style={{paddingLeft: '72px'}}>
                <Row className="justify-content-center align-items-center">
                  <Col md={8} lg={6} xs={12}>
                    <div className="d-flex my-5 align-items-center justify-content-center">
                      <Form.Select aria-label="Вид сведений">
                        <option>Вид сведений</option>
                        <option value="1">Количество записавшихся пациентов</option>
                        <option value="2">Количество принятых пациентов по видам приема</option>
                        <option value="3">...</option>
                      </Form.Select>
                    </div>
                  </Col>
                  <Col md={8} lg={6} xs={12}>
                    <div className="d-flex my-5 align-items-center justify-content-center">
                      <Form.Select aria-label="Мед организация">
                        <option>Медицинская организация</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
                </Container>
    </>
    

  )
}

export default UserTonosMonitoring