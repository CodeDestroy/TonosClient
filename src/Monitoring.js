import React from 'react'
import Header from './Components/Header'
import { Container, InputGroup, Form, Button, Row, Col } from 'react-bootstrap'
import { useState } from "react";
// import Form from 'react-bootstrap/Form';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Monitoring() {
  const [value_start, setValue1] = useState(null);
  const [value_end, setValue2] = useState(null);
  return (
    <>
        <Header/>
          <div>
            <Container>
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
                <Row className="mb-5 justify-content-center align-items-center">
                  <Col md={4} lg={3} xs={4}>
                    <div className="d-flex align-items-center justify-content-center">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Начало периода"
                          value={value_start}
                          onChange={(newValue) => {
                            setValue1(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                      </div>
                  </Col>
                  <Col md={4} lg={3} xs={4}>
                    <div className="d-flex align-items-center justify-content-center">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Конец периода"
                          value={value_end}
                          onChange={(newValue) => {
                            setValue2(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>
                  </Col>
                </Row>
                <div className="vh-100 justify-content-center align-items-center">  
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Найти по количеству"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <Button variant="outline-secondary" id="button-addon2">
                    Найти
                  </Button>
                </InputGroup>
              </div>
            </Container>
          </div>
    </>
  )
}

export default Monitoring