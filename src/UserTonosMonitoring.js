import React from 'react'
import Header from './Components/Header'
import { Container, InputGroup, Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react';

import * as Icon from 'react-bootstrap-icons';
import { Context } from '.';
import TonosService from './services/TonosService'
import { PaginationControl } from 'react-bootstrap-pagination-control';



function UserTonosMonitoring() {

  const [choice, setChoice] = useState('')
  const [ numPages, setNumPages ] = useState(null)
  const [ currentPage, setCurrentPage ] = useState(1)
  const [order, setOrder] = useState('id_desc')
  const [allMeasures, setAllMeasures] = useState([])
  const { store } = useContext(Context);
  const [ allPatients, setAllPatients ] = useState([])

  const handeChoice = async (choice) => {
    setChoice(choice)
  }

  useEffect (() => {    
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store])

  useEffect(() => {
    switch(choice) {
      case '1':
        getMesuaresByDoctorId(order);
        break;
      default:
        break;
    }
    
  }, [currentPage])

  const getCountMeasuresByDoctorId = async event => {
    let numPages;
    switch (event) {
      case '1':
        numPages = await TonosService.getCountMeasuresByDoctorId(store.user.doctor_id)
        setNumPages(numPages.data[0].count)
        break;
      case '2':
        numPages = await TonosService.getCountPatientsByDoctorId(store.user.doctor_id)
        console.log(numPages)
        setNumPages(numPages.data[0].count)
        break;
      default:
        break;

    }
    
    
    getData(event)
    /* .then((result) => {
        setNumPages(result.data[0].count);
        getData('1');
    }) */
    
  }

  /* const handeChange = async (page) => {
    if (store.user) {
        const response = await TonosService.getAllMeasuresByPatientId(store.user.patient_id, page, order)
        setMeasures(response.data)
        //handlePages(response.data.length)
        
    }
  } */

  const getData = async event => {
    await handeChoice(event)    
  }

  useEffect(() => {
    switch(choice) {
      case '1':
        getMesuaresByDoctorId(order);
        break;
      case '2':
        getPatientsByDoctorId(order);
      default:
        break;
    }
  }, [choice])
  
  const getMesuaresByDoctorId = async (order) => {
    const measure = await TonosService.getMesuaresByDoctorId(store.user.doctor_id, currentPage, order)
    setAllMeasures(measure.data)
  }

  const getPatientsByDoctorId = async (order) => {
    const measure = await TonosService.getPatientsByDoctorId(store.user.doctor_id, currentPage, order)
    setAllPatients(measure.data)
  }

  const parseDate = (val) => {
    let string = val.replace(/\.\d+Z/,'')
    string = string.replace('T', ' ')
    return string
  }

  

  const orderByFIO = async () => {
    switch (order) {
        case 'full_name_desc':
            setOrder('full_name_asc');
            await getMesuaresByDoctorId('full_name_asc')
            break;
        default:
            setOrder('full_name_desc');
            await getMesuaresByDoctorId('full_name_desc')
            break;
    }
  }

  const orderByDate = async () => {
    switch (order) {
        case 'dt_dimension_desc':
            setOrder('dt_dimension_asc');
            await getMesuaresByDoctorId('dt_dimension_asc')
            break;
        default:
            setOrder('dt_dimension_desc');
            await getMesuaresByDoctorId('dt_dimension_desc')
            break;
    }
  }
  const orderBySYS = async () => {
      switch (order) {
          case 'upper_pressure_desc':
              setOrder('upper_pressure_asc');
              await getMesuaresByDoctorId(`upper_pressure_asc`)
              break;
          default:
              setOrder('upper_pressure_desc');
              await getMesuaresByDoctorId(`upper_pressure_desc`)
              break;
      }
  }
  const orderByDIA = async () => {
      switch (order) {
          case 'lower_pressure_desc':
              setOrder('lower_pressure_asc');
              await getMesuaresByDoctorId(`lower_pressure_asc`)
              break;
          default:
              setOrder('lower_pressure_desc');
              await getMesuaresByDoctorId(`lower_pressure_desc`)
              break;
      }
  }
  const orderByPUL = async () => {
      switch (order) {
          case 'heart_rate_desc':
              setOrder('heart_rate_asc');
              await getMesuaresByDoctorId(`heart_rate_asc`)
              break;
          case 'heart_rate_asc':
              setOrder('heart_rate_desc');
              await getMesuaresByDoctorId(`heart_rate_desc`)
              break;
          default:
              setOrder('heart_rate_desc');
              await getMesuaresByDoctorId(`heart_rate_desc`)
              break;
      }
  }

  const orderById = async () => {
      switch (order) {
          case 'id_asc':
              setOrder('id_desc');
              await getMesuaresByDoctorId(`id_desc`)
              break;
          case 'id_desc':
              setOrder('id_asc');
              await getMesuaresByDoctorId(`id_asc`)
              break;
          default:
              setOrder('id_asc');
              await getMesuaresByDoctorId(`id_asc`)
              break;
      }
      
  }


  return (
    <>
        <Header/>
                <Container  style={{paddingLeft: '72px'}}>
                <Row className="justify-content-center align-items-center">
                  <Col md={8} lg={6} xs={12}>
                    <div className="d-flex my-5 align-items-center justify-content-center">
                      <Form.Select onChange={e => {getCountMeasuresByDoctorId(e.target.value);}} aria-label="Вид сведений">
                        <option>Вид сведений</option>
                        <option value="1">Данные измерений пациентов</option>
                        <option value="2">Пациенты записанные на приём</option>
                        <option value="3">...</option>
                      </Form.Select>
                    </div>
                  </Col>
                  <Col md={8} lg={6} xs={12}>
                    {/* <div className="d-flex my-5 align-items-center justify-content-center">
                      <Form.Select aria-label="Мед организация">
                        <option>Медицинская организация</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </Form.Select>
                    </div> */}
                  </Col>
                </Row>
                <Row>
                  <Table striped hover>
                    <thead>
                      <tr key='0'>
                        {
                          choice == 1 ? 
                          <>
                            <th onClick={orderById} style={{cursor: 'pointer'}}>
                              # 
                              {order == 'id_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}
                            </th>
                            <th onClick={orderByFIO} style={{cursor: 'pointer'}}>
                              ФИО 
                              {order == 'full_name_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}
                            </th>
                            <th key='th_1' onClick={orderByDate} style={{cursor: 'pointer'}}>
                              Дата измерения
                              {order == 'dt_dimension_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}    
                            </th>
                            <th key='th_2' onClick={orderBySYS} style={{cursor: 'pointer'}}>
                              Верхнее давление
                              {order == 'upper_pressure_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                            <th key='th_3' onClick={orderByDIA} style={{cursor: 'pointer'}}>
                              Нижнее давление
                              {order == 'lower_pressure_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                            <th key='th_4' onClick={orderByPUL} style={{cursor: 'pointer'}}>
                              Пульс
                              {order == 'heart_rate_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                          </> 
                          : choice == 2 ? 
                          <>
                            <th onClick={orderById} style={{cursor: 'pointer'}}>
                              # 
                              {order == 'id_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}
                            </th>
                            <th onClick={orderByFIO} style={{cursor: 'pointer'}}>
                              ФИО 
                              {order == 'full_name_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}
                            </th>
                             <th key='th_1' /* onClick={orderByDate} */ style={{cursor: 'pointer'}}>
                              Дата рожения
                              {order == 'dt_dimension_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}    
                            </th>
                            <th key='th_2' /* onClick={orderBySYS} */ style={{cursor: 'pointer'}}>
                              Снилс
                              {order == 'upper_pressure_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                            <th key='th_3' /* onClick={orderByDIA} */ style={{cursor: 'pointer'}}>
                              Полис
                              {order == 'lower_pressure_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                            <th key='th_4' /* onClick={orderByPUL} */ style={{cursor: 'pointer'}}>
                              Телефон
                              {order == 'heart_rate_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                          </> 
                          : 
                          
                          <></> 
                          
                        }
                        
                      </tr>
                    </thead>
                    <tbody>
                      { allMeasures && 
                        allMeasures.map((measure, index) =>
                          <tr key={`tr_${index}`}>
                            <td>{measure.id}</td>
                            <td>{measure.full_name}</td>
                            <td>{parseDate(measure.dt_dimension)}</td>
                            <td>{measure.upper_pressure}</td>
                            <td>{measure.lower_pressure}</td>
                            <td>{measure.heart_rate}</td>  
                          </tr>                                    
                          ) 
                      }
                      { allPatients && 
                        allPatients.map((patient, index) =>
                          <tr key={`tr_${index}`}>
                            <td>{patient.id}</td>
                            <td>{patient.full_name}</td>
                            <td>{parseDate(patient.birth_date)}</td>
                            <td>{patient.snils}</td>
                            <td>{patient.polis}</td>
                            <td>{patient.phone}</td>  
                          </tr>                                    
                          ) 
                      }
                    </tbody>
                  </Table>
                  <PaginationControl
                    page={currentPage}
                    between={4}
                    total={numPages}
                    limit={10}
                    changePage={async (page) => {
                      setCurrentPage(page); 
                    }}
                    ellipsis={1}
                  />
                    {/* {allMeasures && 
                      allMeasures.map((measure, index) => {
                        <a>measure.</a>
                      })
                    } */}
                </Row>
                </Container>
    </>
    

  )
}

export default UserTonosMonitoring