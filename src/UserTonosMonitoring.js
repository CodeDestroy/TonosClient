import React from 'react'
import Header from './Components/Header'
import { Container, InputGroup, Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react';
import SearchPatientModal from './Components/Modals/SearchPatientModal';
import * as Icon from 'react-bootstrap-icons';
import { Context } from '.';
import TonosService from './services/TonosService'
import { PaginationControl } from 'react-bootstrap-pagination-control';
import Chart from './Components/Chart';
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import AppointmentModal from './Components/Modals/AppointmentModal'
import SearchMeasuresByPatient from './Components/Modals/SearchMeasuresByPatient'

function UserTonosMonitoring() {

  const handleShowTwo = () => setModalShow(true);
  const [modalShow, setModalShow] = useState(false);
  const handleShowOne = () => setModalShowTwo(true);
  const [modalShowTwo, setModalShowTwo] = useState(false)

  

  const [ chartShow, setChartShow] = useState(false)

  const [ appointmentShow, setAppointmentShow] = useState(false)


  const [choice, setChoice] = useState('0')
  const [ numPages, setNumPages ] = useState(null)
  const [ currentPage, setCurrentPage ] = useState(1)
  const [order, setOrder] = useState('id_desc')
  const [allMeasures, setAllMeasures] = useState([])
  const { store } = useContext(Context);
  const [ allPatients, setAllPatients ] = useState([])

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  const [ patinetIndex, setPatinetIndex ] = useState(null)
  const [ measuresByPatinet, setMeasuresByPatinet ] = useState([])

  const handleAppointment = async event => {
    setPatinetIndex(event.currentTarget.id)
    setAppointmentShow(true)
  }



  const handleChart = async event => {
    setChartShow(false);
    setMeasuresByPatinet([])
    /* var endtime = new Date().getTime(int); // get your number
    var endDate = new Date(time); */
    const data = await TonosService.getAllMeasuresByPatientIdWithDataFormat(event.currentTarget.id, startDate, endDate)
    setMeasuresByPatinet(data.data)
    setChartShow(true);
  }


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
      case '2':
        getPatientsByDoctorId(order);
      default:
        break;
    }
    
  }, [currentPage])

  const getCountMeasuresByDoctorId = async event => {

    if (store.user.role > 3) {
      let numPages;
      switch (event) {
        case '1':
          numPages = await TonosService.getCountMeasuresByMO(store.user.med_post_id)
          setNumPages(numPages.data[0].count)
          break;
        case '2':
          numPages = await TonosService.getCountPatientsByMO(store.user.med_post_id)
          setNumPages(numPages.data[0].count)
          break;
        default:
          break;

      }
      getData(event)
    }
    else {
      let numPages;
      switch (event) {
        case '1':
          numPages = await TonosService.getCountMeasuresByDoctorId(store.user.doctor_id)
          setNumPages(numPages.data[0].count)
          break;
        case '2':
          numPages = await TonosService.getCountPatientsByDoctorId(store.user.doctor_id)
          setNumPages(numPages.data[0].count)
          break;
        default:
          break;

      }
      getData(event)
    }
  }

  const getData = async event => {
    await handeChoice(event)    
  }

  useEffect(() => {
    switch(choice) {
      
      case '1':
        if (store.user.role > 3) {
          getMesuaresByMO(order)
        }
        else {
          getMesuaresByDoctorId(order);
        }
        break;
      case '2':
        if (store.user.role > 3) {
          getPatientsByMO(order)
        }
        else {
          getPatientsByDoctorId(order);
        }
        break;
      default:
        break;
    }
  }, [choice])
  
  const getMesuaresByDoctorId = async (order) => {
    const measure = await TonosService.getMesuaresByDoctorId(store.user.doctor_id, currentPage, order)
    setAllMeasures(measure.data)
  }

  const getPatientsByDoctorId = async (order) => {
    const patient = await TonosService.getPatientsByDoctorId(store.user.doctor_id, currentPage, order)
    setAllPatients(patient.data)
  }

  const getMesuaresByMO = async (order) => {
    const measure = await TonosService.getMesuaresByMO(store.user.med_post_id, currentPage, order)
    setAllMeasures(measure.data)
  }

  const getPatientsByMO = async (order) => {
    const patient = await TonosService.getPatientsByMO(store.user.med_post_id, currentPage, order)
    setAllPatients(patient.data)
  }

  // const getCountPatientsByGender = async (order) => {
  //   const gender = await TonosService.getPatientsByGender(store.user.gender_id, currentPage, order)
  // }

  // const parseDate = (val) => {
  //   /* console.log(val)
  //   let string = val.replace(/\.\d+Z/,'')
  //   string = string.replace('T', ' ')
  //   return string.substring(0, 10) */
    
  //   return val
  // }

  const parseDateTime = (val) => {
    
    const timezoneOffset = new Date().getTimezoneOffset() / 60; 
    const moscowOffset = 3;
    const hourOffset = moscowOffset - timezoneOffset;

    let date = new Date(val.replace(/\.\d+Z/,'').replace('T', ' '));
    date.setHours(date.getHours() + hourOffset);
    
    return date.toLocaleString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'});
  }

  const parseDate = (val) => {
    
    const timezoneOffset = new Date().getTimezoneOffset() / 60; 
    const moscowOffset = 3;
    const hourOffset = moscowOffset - timezoneOffset;

    let date = new Date(val.replace(/\.\d+Z/,'').replace('T', ' '));
    date.setHours(date.getHours() + hourOffset);
    
    return date.toLocaleString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit'});
  }

  const snilsView = (snils) => {
    var snilsNew = snils.slice(0, 3) + "-" + snils.slice(3, 6) + "-" + snils.slice(6, 9) + " " + snils.slice(9);
    console.log(snilsNew)
    return snilsNew
  }

  const getUser = (val) => {
      val.data.forEach(element => {
        element.full_name = element.p_full_name;
        element.birth_date = element.p_birth_date;
        element.phone = element.p_phone;
        element.patient_id = element.p_id;        
      });
      setAllPatients(val.data)
  } 

  const getMeasures = (val) => {
    /* val.data.forEach(element => {
      element.full_name = element.p_full_name;
      element.birth_date = element.p_birth_date;
      element.phone = element.p_phone;
      element.patient_id = element.p_id;        
    }); */
    setAllMeasures(val.data)
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
                <Container>
                <Row className="justify-content-center align-items-center">
                  <Col md={8} lg={6} xs={12}>
                    <div className="d-flex my-5 align-items-center justify-content-center">
                      <Form.Select onChange={e => {getCountMeasuresByDoctorId(e.target.value);}} aria-label="Вид сведений">
                        <option value="0">Вид сведений</option>
                        <option value="1">Данные измерений пациентов</option>
                        <option value="2">Пациенты записанные на приём</option>
                        {/* <option value="3">Статистика по пациентам в медициских учереждениях</option> */}
                        {/* <option value="4">Данные о пациентах</option> */}
                        <option value="5">...</option>
                      </Form.Select>
                    </div>
                  </Col>
                  <Col md={8} lg={6} xs={12}>
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
                  <SearchMeasuresByPatient show={modalShowTwo} sendData={getMeasures} onHide={() => setModalShowTwo(false)}/>
                </Row>
                <Row>
                  <Table striped hover responsive="md">
                    <thead>
                      <tr key='0'>
                        {
                          choice == 1 ? 
                          <>
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th onClick={orderById} style={{cursor: 'pointer', width: '50px'}}>
                              # 
                              {order == 'id_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th onClick={orderByFIO} style={{cursor: 'pointer'}}>
                              ФИО 
                              {order == 'full_name_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th key='th_1' onClick={orderByDate} style={{cursor: 'pointer'}}>
                              Дата измерения
                              {order == 'dt_dimension_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}    
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th key='th_2' onClick={orderBySYS} style={{cursor: 'pointer'}}>
                              Верхнее давление
                              {order == 'upper_pressure_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th key='th_3' onClick={orderByDIA} style={{cursor: 'pointer'}}>
                              Нижнее давление
                              {order == 'lower_pressure_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th key='th_4' onClick={orderByPUL} style={{cursor: 'pointer'}}>
                              Пульс
                              {order == 'heart_rate_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                          ))}
                          </> 
                          : choice == 2 ? 
                          <>
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th onClick={orderById} style={{cursor: 'pointer', width: '50px'}}>
                              # 
                              {order == 'id_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th onClick={orderByFIO} style={{cursor: 'pointer'}}>
                              ФИО 
                              {order == 'full_name_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                             <th key='th_1' /* onClick={orderByDate} */ style={{cursor: 'pointer', width: '160px'}}>
                              Дата рожения
                              {order == 'dt_dimension_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}    
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th key='th_2' /* onClick={orderBySYS} */ style={{cursor: 'pointer'}}>
                              СНИЛС
                              {order == 'upper_pressure_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th key='th_3' /* onClick={orderByDIA} */ style={{cursor: 'pointer'}}>
                              ПОЛИС
                              {order == 'lower_pressure_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th key='th_4' /* onClick={orderByPUL} */ style={{cursor: 'pointer', width: '160px'}}>
                              Телефон
                              {order == 'phone_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th key='th_5' /* onClick={orderByPUL} */ style={{cursor: 'pointer', width: '140px'}}>
                              Дата записи
                              {order == 'dt_dimension_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th key='th_6' /* onClick={orderByPUL} */ style={{cursor: 'pointer'}}>
                              Имя врача
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th key='th_7' /* onClick={orderByPUL} */ style={{cursor: 'pointer'}}>
                              График/Редактирование 
                            </th>
                          ))}
                          </> 
                          : choice == 3 ? 
                          <>
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th /* onClick={orderByDate} */ style={{cursor: 'pointer'}}>
                              Название медицинской организации 
                              {order == 'med_org_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th /* onClick={orderByDate} */ style={{cursor: 'pointer'}}>
                              Количество состоявших М/Ж  
                              {order == 'p_quantity_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                             <th key='th_1' /* onClick={orderByDate} */ style={{cursor: 'pointer'}}>
                              Количество выбывших
                              {order == 'p_drop_out_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}    
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th key='th_2' /* onClick={orderBySYS} */ style={{cursor: 'pointer'}}>
                              Количество вызовов неотложки
                              {order == 'ambulance_calls_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                          ))}
                          </> 
                          : choice == 4 ? 
                          <>
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th /* onClick={orderByDate} */ style={{cursor: 'pointer'}}>
                              Название медицинской организации
                              {order == 'med_org_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th /* onClick={orderByDate} */ style={{cursor: 'pointer'}}>
                              ФИО 
                              {order == 'full_name_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                             <th key='th_1' /* onClick={orderByDate} */ style={{cursor: 'pointer'}}>
                              Дата рождения
                              {order == 'dt_dimension_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}    
                            </th>
                          ))}
                          {Array.from({ length: 1 }).map((_, index) => (
                            <th key='th_2' /* onClick={orderBySYS} */ style={{cursor: 'pointer'}}>
                              ДЗ
                              {order == 'dz_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                          ))}
                           {Array.from({ length: 1 }).map((_, index) => (
                            <th key='th_3' /* onClick={orderBySYS} */ style={{cursor: 'pointer'}}>
                              Сопутствующая паталогия
                              {order == 'patalog_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                          ))}
                           {Array.from({ length: 1 }).map((_, index) => (
                            <th key='th_4' /* onClick={orderBySYS} */ style={{cursor: 'pointer'}}>
                              Количество вызовов неотложки
                              {order == 'ambulance_calls_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                          ))}
                           {Array.from({ length: 1 }).map((_, index) => (
                            <th key='th_5' /* onClick={orderBySYS} */ style={{cursor: 'pointer'}}>
                              Целевые значения
                              {order == 'target_val_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                          ))}
                           {Array.from({ length: 1 }).map((_, index) => (
                            <th key='th_6' /* onClick={orderBySYS} */ style={{cursor: 'pointer'}}>
                              Обследование
                              {order == 'survey_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>} 
                            </th>
                          ))}
                          </> 
                          :
                          <></> 
                          
                        }
                        
                      </tr>
                    </thead>
                    <tbody>
                      { (allMeasures && choice == 1) && 
                        allMeasures.map((measure, index) => 
                          <tr style={{color: (measure.upper_pressure > 135 ? 'white' : 'black'), backgroundColor: (measure.upper_pressure > 135 && (measure.upper_pressure >= 180 ? 'rgba(255, 0, 0, 0.8)' : 'rgba(255, 165, 0, 0.8)'))}} key={`tr_${index}`}>
                            <td>{measure.id}</td>
                            <td>{measure.full_name}</td>
                            <td>{parseDateTime(measure.dt_dimension)}</td>
                            <td>{measure.upper_pressure}</td>
                            <td>{measure.lower_pressure}</td>
                            <td>{measure.heart_rate}</td>  
                          </tr>                                    
                          ) 
                      }
                      { (allPatients && choice == 2) && 
                        allPatients.map((patient, index) =>
                          <tr key={`tr_${index}`}>
                            <td>{patient.id}</td>
                            <td>{patient.full_name}</td>
                            <td>{parseDate(patient.birth_date)}</td>
                            <td>{snilsView(patient.snils)}</td>
                            <td>{patient.polis}</td>
                            <td>{patient.phone}</td>  
                            <td>{patient.ap_date ? parseDate(patient.ap_date) : <p>Не был записан</p>}</td>
                            <td>{patient.d_full_name ? patient.d_full_name : store.user.full_name}</td>
                            <td>
                              <Button id={patient.patient_id} onClick={handleChart} className='mx-1'>
                                <Icon.BarChart></Icon.BarChart>
                              </Button>
                              <Button id={index} onClick={handleAppointment} className='mx-1'>
                                <Icon.CardChecklist></Icon.CardChecklist>
                              </Button>
                              {patinetIndex && <AppointmentModal show={appointmentShow} patient={allPatients[patinetIndex]} /* doctor_id={store.user.doctor_id} */ /* sendData={getUser} */ onHide={() => setAppointmentShow(false)}/>}
                            </td>
                          </tr>                                    
                          ) 
                      }
                    </tbody>
                  </Table>
                  { choice != 0 && 
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
                  }
                    {/* {allMeasures && 
                      allMeasures.map((measure, index) => {
                        <a>measure.</a>
                      })
                    } */}
                </Row>
                </Container>
                <Container id='chartContainer'>
                  {choice == 2 &&
                    <Row className='mb-5'>
                      <Col  md={{ span: 3, offset: 2 }} lg={4} xs={{ span: 10, offset: 2}}>
                        <p>Дата начальная</p>
                        <DatePicker
                          locale={ru}
                          selected={startDate}
                          onChange={(date) => {setStartDate(date)}} 
                          showYearDropdown
                          maxDate={new Date()}
                          dropdownMode="select"
                          dateFormat="dd MMMM, yyyy"
                          scrollableYearDropdown
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="Время"
                        />
                      </Col>
                      <Col  md={{ span: 3, offset: 1 }} lg={4} xs={{ span: 10, offset: 2}}>
                        <p>Дата конечная</p>
                        <DatePicker
                         
                          locale={ru}
                          selected={endDate}
                          onChange={(date) => setEndDate(date)}
                          showYearDropdown
                          maxDate={new Date()}
                          dropdownMode="select"
                          dateFormat="dd MMMM, yyyy"
                          scrollableYearDropdown
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={30}
                          timeCaption="Время"
                        />
                      </Col>
                      <Col className='mt-5'>
                        {chartShow && measuresByPatinet.length > 0 && <Chart measure={measuresByPatinet}/>}
                      </Col>
                    </Row>                    
                    }
                </Container>
    </>
    

  )
}

export default UserTonosMonitoring