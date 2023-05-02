import React, { useEffect, useState, useContext } from 'react'
import Header from './Components/Header'
import { Context } from '.';
import { DataGrid, GridColDef, GridValueGetterParams, ruRU } from '@mui/x-data-grid';
import AdminService from './services/AdminService'
import { Form, Container, Row, Table, Col } from 'react-bootstrap'
import Button from '@mui/material/Button';
import ChangeAndAddDistrictModal from './Components/Modals/ChangeAndAddDistrictModal'
export default function AdministrationDistricts() {
    const { store } = useContext(Context);
    const [rows, setRows] = useState([])
    const [selectedRows, setSelected] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [modalShowCreation, setModalShowCreation] = useState(false)

    const [available, setAvailable] = useState(false)
    const [availableCreation, setAvailableCreation] = useState(false)

    useEffect(() => {
        AdminService.getDistricts()
        .then((result) => {
            console.log(result.data)
            setRows(result.data)
        })
    }, [])
    const handleShow = () => {
        setAvailable(true)
        setModalShow(true)
    }
    
    const handleShowCreation = () => {
        setAvailableCreation(true)
        setModalShowCreation(true)
    }

    
    const onRowsSelectionHandler = (ids) => {
        setAvailable(false)
        const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
        setSelected(selectedRowsData)
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Полное название', width: 650 },
        /* { field: 'medical_org_name_small', headerName: 'Короткое название', width: 250 },
        {
          field: 'region',
          headerName: 'Регион',
          type: 'number',
          width: 90,
        },
        {
          field: 'parent_id',
          headerName: 'Id родительской организации',
          description: 'This column has a value getter and is not sortable.',
          width: 200,
        }, */
      ];

    return (
        <>
            <Header/>
            <Container style={{paddingLeft: '65px'}}>
                {rows.length > 0 && 
                    <div className='my-5' style={{ height: 600, width: '100%' }}>
                        {selectedRows.length > 0 && 
                            <Button
                                sx={{ mb: 2 }}
                                onClick={() => handleShow()}
                            >
                                Изменить
                            </Button>
                        }
                        <Button
                            sx={{ mb: 2 }}
                            onClick={() => handleShowCreation()}
                        >
                            Добавить новую организацию
                        </Button>
                        <DataGrid
                            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            onRowSelectionModelChange={itm => onRowsSelectionHandler(itm)}
                        />
                        {available && <ChangeAndAddDistrictModal district={selectedRows} show={modalShow} onHide={() => setModalShow(false)}/>}
                        {availableCreation && <ChangeAndAddDistrictModal show={modalShowCreation} onHide={() => setModalShowCreation(false)}/>}
                    </div>
                    
                }
            </Container>
            

        </>
    )
}
