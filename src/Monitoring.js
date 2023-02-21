import React from 'react'
import Header from './Components/Header'
import { Container, InputGroup, Form, Button, Row, Col, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap'
import { useState } from "react";

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Monitoring() {
  // const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = React.useState(null);
  return (
    <>
        <Header/>
          <div>
            <Container>
              <Row className="justify-content-center align-items-center">
                  <Col md={8} lg={6} xs={12}>
                    <div className="d-flex my-5 align-items-center justify-content-center">
                      <DropdownButton
                        as={ButtonGroup}
                        key={1}
                        id={`dropdown-button-drop-1`}
                        size="lg"
                        title="Вид сведений"
                      >
                        <Dropdown.Item href="#/action-1">Количество записавшихся пациентов</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Количество принятых пациентов по видам приема</Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </Col>
                  <Col md={8} lg={6} xs={12}>
                    <div className="d-flex my-5 align-items-center justify-content-center">
                      <DropdownButton
                        as={ButtonGroup}
                        key={1}
                        id={`dropdown-button-drop-1`}
                        size="lg"
                        title="Медицинская организация"
                      >
                        <Dropdown.Item href="#/action-1">ХХХХХХХХХХХХХХХХХХХХХХХХХ</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">ХХХХХХХХХХХХХХХХХХХХХХХХХ</Dropdown.Item>
                      </DropdownButton>
                    </div>
                  </Col>
                </Row>
                <Row className="mb-5 justify-content-center align-items-center">
                  <div className="d-flex align-items-center justify-content-center">
                    {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}></DatePicker> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Basic example"
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
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