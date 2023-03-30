import React, { useEffect, useContext, useState } from 'react'
import { Table, Container, Row } from 'react-bootstrap'
import Header from './Components/Header'
import { Context } from '.';
import TonosService from './services/TonosService';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Icon from 'react-bootstrap-icons'

function TonosStat() {
    const { store } = useContext(Context);
    const [ measures, setMeasures ] = useState([])
    const [ numPages, setNumPages ] = useState(null)
    const [ currentPage, setCurrentPage ] = useState(1)
    const [order, setOrder] = useState('id_desc')
    useEffect (() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
            getCountMeasuresByPatientId()
            
        }
    }, [store])

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
        let string = val.replace(/\.\d+Z/,'')
        string = string.replace('T', ' ')
        return string
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
                                                
                                                <tr key={`tr_${index}`}>
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
                            </div>
                        
                    }
                </Row>
            </Container>
        </>
    )
}

export default TonosStat