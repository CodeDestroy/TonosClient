import React, { useEffect, useContext, useState } from 'react'
import { Table, Container, Row, Button, Col } from 'react-bootstrap'
import Header from './Components/Header'
import { Context } from '.';
import TonosService from './services/TonosService';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons'
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import Chart from './Components/Chart';

function TonosStat() {
    const { store } = useContext(Context);
    const [ measures, setMeasures ] = useState([])
    const [ numPages, setNumPages ] = useState(null)

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [ chartShow, setChartShow] = useState(false)
    const [ measuresByPatinet, setMeasuresByPatinet ] = useState([])
    
    const [ currentPage, setCurrentPage ] = useState(1)
    const [order, setOrder] = useState('id_desc')
    useEffect (() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
            getCountMeasuresByPatientId()
            
        }
    }, [store])

    const handleChart = async event => {
        setChartShow(false);
        setMeasuresByPatinet([])
        /* var endtime = new Date().getTime(int); // get your number
        var endDate = new Date(time); */
        const data = await TonosService.getAllMeasuresByPatientIdWithDataFormat(store.user.patient_id, startDate, endDate)
        setMeasuresByPatinet(data.data)
        setChartShow(true);
    }

    const getCountMeasuresByPatientId = () => {
        TonosService.getCountMeasuresByPatientId(store.user.patient_id)
        .then((result) => {
            setNumPages(result.data[0].count);
            getAllMeasures();
        })
        
    }
    const getAllMeasures = async (order = 'id_desc') => {
        if (store.user) {
          const response = await TonosService.getAllMeasuresByPatientId(store.user.patient_id, currentPage, order);
          setMeasures(response.data)
          //setNumPages(response.data.length)
          
        }
    }

    const handeChange = async (page) => {
        if (store.user) {
            const response = await TonosService.getAllMeasuresByPatientId(store.user.patient_id, page, order)
            setMeasures(response.data)
            //handlePages(response.data.length)
            
        }
    }

    const parseDate = (val) => {
        // let string = val.replace(/\.\d+Z/,'')
        // string = string.replace('T', ' ')
        // return string
        
        const timezoneOffset = new Date().getTimezoneOffset() / 60; 
        const moscowOffset = 3;
        const hourOffset = moscowOffset - timezoneOffset;

        let date = new Date(val.replace(/\.\d+Z/,'').replace('T', ' '));
        date.setHours(date.getHours() + hourOffset);
        
        return date.toISOString().replace('T', ' ').replace(/\.\d+Z/,'');
    }

    const orderByDate = async () => {
        switch (order) {
            case 'dt_dimension_desc':
                setOrder('dt_dimension_asc');
                await getAllMeasures('dt_dimension_asc')
                break;
            default:
                setOrder('dt_dimension_desc');
                await getAllMeasures('dt_dimension_desc')
                break;
        }
    }
    const orderBySYS = async () => {
        switch (order) {
            case 'upper_pressure_desc':
                setOrder('upper_pressure_asc');
                await getAllMeasures(`upper_pressure_asc`)
                break;
            default:
                setOrder('upper_pressure_desc');
                await getAllMeasures(`upper_pressure_desc`)
                break;
        }
    }
    const orderByDIA = async () => {
        switch (order) {
            case 'lower_pressure_desc':
                setOrder('lower_pressure_asc');
                await getAllMeasures(`lower_pressure_asc`)
                break;
            default:
                setOrder('lower_pressure_desc');
                await getAllMeasures(`lower_pressure_desc`)
                break;
        }
    }
    const orderByPUL = async () => {
        switch (order) {
            case 'heart_rate_desc':
                setOrder('heart_rate_asc');
                await getAllMeasures(`heart_rate_asc`)
                break;
            case 'heart_rate_asc':
                setOrder('heart_rate_desc');
                await getAllMeasures(`heart_rate_desc`)
                break;
            default:
                setOrder('heart_rate_desc');
                await getAllMeasures(`heart_rate_desc`)
                break;
        }
    }

    const orderById = async () => {
        switch (order) {
            case 'id_asc':
                setOrder('id_desc');
                await getAllMeasures(`id_desc`)
                break;
            case 'id_desc':
                setOrder('id_asc');
                await getAllMeasures(`id_asc`)
                break;
            default:
                setOrder('id_asc');
                await getAllMeasures(`id_asc`)
                break;
        }
        
    }
    return (
        <>
            <Header/>
            <Container className='my-5' style={{paddingLeft: '65px'}}>
                <Row>
                    {measures.length > 0 && 
                            <div>
                                <Table striped hover responsive="md">
                                            <thead>
                                            <tr key='0'>
                                            {Array.from({ length: 1 }).map((_, index) => (
                                                <th onClick={orderById} style={{cursor: 'pointer'}}>
                                                    # 
                                                    {order == 'id_desc' ? <Icon.CaretDownSquare className='mx-1'></Icon.CaretDownSquare> : <Icon.CaretUpSquare className='mx-1'></Icon.CaretUpSquare>}
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
                                            </tr>
                                            </thead>
                                            <tbody>
                                            { 
                                            measures.map((measure, index) =>                                                 
                                                <tr key={`tr_${index}`} style={{color: (measure.upper_pressure > 135 ? 'white' : 'black'), backgroundColor: (measure.upper_pressure > 135 && (measure.upper_pressure >= 180 ? 'rgba(255, 0, 0, 0.8)' : 'rgba(255, 165, 0, 0.8)'))}}>
                                                    <td>{measure.id}</td>
                                                    <td>{parseDate(measure.dt_dimension)}</td>
                                                    <td>{measure.upper_pressure}</td>
                                                    <td>{measure.lower_pressure}</td>
                                                    <td>{measure.heart_rate}</td>  
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
                                        await handeChange(page);
                                    }}
                                    
                                    ellipsis={1}
                                />
                                <br />
                                {/* <Col  md={8} lg={6} xs={12}> */}
                                <div className="d-flex my-5 align-items-center justify-content-center">
                                    <Button  onClick={handleChart} className='mx-3 btn-primary btn-lg'>Показать график</Button>
                                </div>
                                <Row className='mb-2'>
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
                                </Row>

                            </div>
                        
                    }
                </Row>
                <Row id="chartContainer">
                    {chartShow && measuresByPatinet.length > 0 && <Chart measure={measuresByPatinet}/>}
                </Row>
            </Container>
        </>
    )
}

export default TonosStat