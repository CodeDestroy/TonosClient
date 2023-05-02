import { Container, InputGroup, Form, Row, Col } from 'react-bootstrap'
import React, { useEffect, useState, useContext } from 'react'
import Header from './Components/Header'
import { Context } from '.';
import { DataGrid, ruRU, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import AdminService from './services/AdminService'
import Button from '@mui/material/Button';
import TonosService from './services/TonosService'

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function Monitoring() {
  const [value_start, setValue1] = useState(null);
  const [value_end, setValue2] = useState(null);
  const [rows, setRows] = useState([])

  const [columns, setColumns] = useState([])

  

  const handleChoice = async (choice) => {
    let columns = []
    let statistic;
    switch (choice) {
      case '1':
        columns = [
          { field: 'id', headerName: 'ID', width: 70 },
          { field: 'medical_org_name_small', headerName: 'Название мед организации', width: 350 },
          { field: 'gender_name', headerName: 'Пол', width: 100 },
          { field: 'count', headerName: 'Количество состоявших М/Ж', width: 250 },
          {
            field: 'cnt',
            headerName: 'Общее количество выбывших',
            width: 250,
          },
        ];
        setColumns(columns)
        statistic = await TonosService.getPatientStatistic();
        statistic.data.map((element, index) => {
          element.id = index
        });
        
        setRows(statistic.data)
        break;
      case '2':
        /* columns = [
          { field: 'id', headerName: 'ID', width: 70 },
          { field: 'medical_org_name_small', headerName: 'Название мед организации', width: 350 },
          { field: 'full_name', headerName: 'ФИО', width: 100 },
          { field: 'birth_date', headerName: 'Дата рождения', width: 100 },
          { field: 'gender_name', headerName: 'Пол', width: 100 },
          { field: 'count', headerName: 'Количество состоявших М/Ж', width: 250 },
          {
            field: 'cnt',
            headerName: 'Общее количество выбывших',
            width: 250,
          },
        ];
        setColumns(columns)
        statistic = await TonosService.getPatientStatistic();
        statistic.data.map((element, index) => {
          element.id = index
        });
        
        setRows(statistic.data) */
        break;
      default:
        break;
    }
  }



  return (
    <>
        <Header/>
          <div style={{paddingLeft: '72px'}}>
            
            <Container>
            <Row className="justify-content-center align-items-center">
                  <Col md={8} lg={6} xs={12}>
                    <div className="d-flex my-5 align-items-center justify-content-center">
                      <Form.Select onChange={e => {handleChoice(e.target.value);}} aria-label="Вид сведений">
                        <option value="0">Вид сведений</option>
                        <option value="1">Статистика по пациентам в медициских учереждениях</option>
                        {/* <option value="2">Данные о пациентах</option> */}
                      </Form.Select>
                    </div>
                  </Col>
                  {/* <Col md={8} lg={6} xs={12}>
                  {choice == 1 &&
                      <Button variant="primary" onClick={handleShowOne} className='mx-3 btn-primary btn-lg'>
                        Найти пациента
                      </Button>
                    }
                    {choice == 2 &&
                      <Button variant="primary" onClick={handleShowTwo} className='mx-3 btn-primary btn-lg'>
                        Найти пациента
                      </Button>
                    }
                  </Col>
                  <SearchPatientModal show={modalShow} role={store.user.role} sendData={getUser} onHide={() => setModalShow(false)}/>
                  <SearchMeasuresByPatient show={modalShowTwo} sendData={getMeasures} onHide={() => setModalShowTwo(false)}/> */}
                </Row>
                {/* <Row className="mb-5 justify-content-center align-items-center">
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
                </Row> */}
                {rows.length > 0 && 
                    <div className='my-5' style={{ height: 600, width: '100%' }}>
                        <DataGrid
                            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            slots={{
                              toolbar: CustomToolbar,
                            }}
                        />
                    </div>
                    
                }

            </Container>
          </div>
    </>
  )
}


function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}


export default Monitoring



