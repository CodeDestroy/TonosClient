import React, { useEffect, useState, useContext } from 'react'
import Header from './Components/Header'
import { Context } from '.';
import { DataGrid, GridColDef, GridValueGetterParams, ruRU } from '@mui/x-data-grid';
import AdminService from './services/AdminService'
import { Form, Container, Row, Table, Col } from 'react-bootstrap'
import ChangeAndAddPostModal from './Components/Modals/ChangeAndAddPostModal'
import Button from '@mui/material/Button';


export default function AdministrationMedPosts() {
    const { store } = useContext(Context);
    const [checkboxSelection, setCheckboxSelection] = useState(false);
    const [rows, setRows] = useState([])
    
    const [selectedRows, setSelected] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [modalShowCreation, setModalShowCreation] = useState(false)

    const [available, setAvailable] = useState(false)
    const [availableCreation, setAvailableCreation] = useState(false)

    const handleShow = () => {
        setAvailable(true)
        setModalShow(true)
    }
    
    const handleShowCreation = () => {
        setAvailableCreation(true)
        setModalShowCreation(true)
    }

    useEffect(() => {
        AdminService.getMedPostsWithMO()
        .then((result) => {
            setRows(result.data)
        })
    }, [])
    useEffect(() => {
        console.log(selectedRows)
    }, [selectedRows])
    

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'med_post_name', headerName: 'Название должности', width: 350 },
        {
          field: 'parent_id',
          headerName: 'Id родительской должности',
          width: 150,
        },
        {
          field: 'mo_medical_org_name_small',
          headerName: 'Организация',
          width: 350,
        },
        
      ];

      const onRowsSelectionHandler = (ids) => {
        setAvailable(false)
        const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
        setSelected(selectedRowsData)
      };

    return (
        <>
            <Header/>
            <Container style={{paddingLeft: '65px'}}>
                {rows.length > 0 && 
                    <div className='my-5' style={{ height: 600, width: '100%' }}>
                        <Button
                            sx={{ mb: 2 }}
                            onClick={() => setCheckboxSelection(!checkboxSelection)}
                        >
                            {!checkboxSelection ? 'Выбрать несколько' : 'Выбрать один'}
                        </Button>
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
                            Добавить новую должность
                        </Button>
                        <DataGrid
                            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection={checkboxSelection}
                            onRowSelectionModelChange={itm => onRowsSelectionHandler(itm)}
                        />
                        {available && <ChangeAndAddPostModal medpost={selectedRows} show={modalShow} onHide={() => setModalShow(false)}/>}
                        {availableCreation && <ChangeAndAddPostModal show={modalShowCreation} onHide={() => setModalShowCreation(false)}/>}
                    </div>
                    
                }
            </Container>
            

        </>
    )
}
