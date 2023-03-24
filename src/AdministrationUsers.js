import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Row, Table, Col } from 'react-bootstrap'
import Header from './Components/Header'
import RegisterUser from './Components/Modals/RegisterUser';
import SearchUserModal from './Components/Modals/SearchUserModal';
import AdminService from './services/AdminService'
import * as Icon from 'react-bootstrap-icons';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import ChangeUserModal from './Components/Modals/ChangeUserModal'
import Multiselect from 'multiselect-react-dropdown';

function AdministrationUsers() {
    const handleShowSearch = () => setModalShowSearch(true);
    const [modalShowSearch, setModalShowSearch] = useState(false);

    const handleShowRegistration = () => setModalRegisterUserModalShow(true);
    const [modalRegisterUserModalShow, setModalRegisterUserModalShow] = useState(false);

    const handleShowUserEdit = () => setModalUserEdit(true);
    const [modalUserEdit, setModalUserEdit] = useState(false);

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ numPages, setNumPages ] = useState(null)

    const [userId, setUserId] = useState(null)


    const state = {
        options: [{name: 'Врач', id: 1},{name: 'Пациент', id: 2}, ,{name: 'Администратор', id: 3}]
    };


    function onSelect(selectedList, selectedItem) {
        console.log(state.options[0])

    }
    
    function onRemove(selectedList, removedItem) {
        console.log(selectedList)
    }

    const getCountUsers = () => {
        AdminService.getCountUsers()
        .then((result) => {
            setNumPages(result.data.length);
            fetchData();
        })
        
    }

    const [users, setUsers] = useState([])
    const getData = (val) => {
        // do not forget to bind getData in constructor
        //console.log(val);
        setUsers(val.data)
    } 

    const fetchData = async (page) => {
        const users = await AdminService.showAllUsers(page, 10)
        setUsers(users.data)
    }
    useEffect(() => { 
        getCountUsers()
        //fetchData();
    }, [])

    const changeUser = event => {
        setUserId(event.currentTarget.id)
        handleShowUserEdit()
    }
    return (
        <>
            <Header/>
            <Container>
                <Row>
                    <Col md={8} className='mt-5'>
                        <Button onClick={handleShowRegistration}>Зарегестрировать нового пользователя</Button>
                    </Col>
                    <Col md={4} className='mt-5'>
                        <Button onClick={handleShowSearch}>Найти пользователя</Button>
                    </Col>
                    <RegisterUser show={modalRegisterUserModalShow} onHide={() => setModalRegisterUserModalShow(false)}/>
                    <SearchUserModal show={modalShowSearch} sendData={getData} onHide={() => setModalShowSearch(false)}/>
                </Row>
                <Row className='mt-5'>
                    {
                        users.length > 0 ? 
                            <>
                                <Table striped hover>
                                    <thead>
                                    <tr key='0'>
                                        <th key='th_0'>#</th>
                                        <th key='th_1'>{/* Пациент/Врач/Админ. */}
                                        <Multiselect
                                            options={state.options} // Options to display in the dropdown
                                            selectedValues={[state.options[0]]} // Preselected value to persist in dropdown
                                            onSelect={onSelect} // Function will trigger on select event
                                            onRemove={onRemove} // Function will trigger on remove event
                                            displayValue="name" // Property name to display in the dropdown options
                                            placeholder="Параметры поиска"
                                            style={{
                                                chips: {
                                                  /* background: 'red', */
                                                  borderRadius: '0px'
                                                },
                                                multiselectContainer: {
                                                    width: '80%'
                                                  /* color: 'red' */
                                                },
                                                searchBox: {
                                                  border: 'none',
                                                  'border-bottom': '1px solid blue',
                                                  'border-radius': '0px'
                                                }
                                              }}
                                        />
                                        </th>
                                        <th key='th_2'>Логин</th>
                                        <th key='th_3'>Фамилия</th>
                                        <th key='th_4'>Имя</th>
                                        <th key='th_5'>Отчество</th>
                                        <th key='th_6'>Дата рожения</th>
                                        <th key='th_7'>Телефон</th>
                                        <th key='th_8'></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { 
                                    users.map((user, index) => {
                                        if (user.p_id == null) {
                                            return (
                                                <>
                                                    <tr key={`tr_${user.uud_id}`}>
                                                        <td>{user.uud_id}</td>
                                                        <td>{user.uu_role_id > 1 ? (user.uu_role_id == 2 ? `Пациент` : `Администратор`) : `Врач`}</td>
                                                        <td>{user.uud_login}</td>
                                                        <td>{user.d_surname}</td>
                                                        <td>{user.d_name}</td>
                                                        <td>{user.d_patronomic_name}</td>
                                                        <td>{user.d_birth_date}</td>
                                                        <td>{user.d_phone}</td>    
                                                        <td>
                                                            <Button>
                                                            <Icon.PencilFill width={'20px'}/>
                                                            </Button>
                                                        </td>
                                                        
                                                    </tr>
                                                    
                                                </>
                                            )       
                                        }
                                        else {
                                            return (
                                                <>
                                                    <tr key={`tr_${user.uud_id}`}>
                                                        <td>{user.uud_id}</td>
                                                        <td>{user.uu_role_id > 1 ? (user.uu_role_id == 2 ? `Пациент` : `Администратор`) : `Врач`}</td>
                                                        <td>{user.uud_login}</td>
                                                        <td>{user.p_surname}</td>
                                                        <td>{user.p_name}</td>
                                                        <td>{user.p_patronomic_name}</td>
                                                        <td>{user.p_birth_date}</td>
                                                        <td>{user.p_phone}</td>
                                                        <td>
                                                            <Button id={index} onClick={changeUser}>
                                                                <Icon.PencilFill width={'20px'}/>
                                                            </Button>
                                                        </td>
                                                        
                                                    </tr>
                                                    
                                                </>
                                            )
                                        }
                                    }
                                        
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
                                        await fetchData(page);
                                    }}            
                                    ellipsis={1}
                                />
                                {userId && <ChangeUserModal user={users[userId]} show={modalUserEdit} onHide={() => setModalUserEdit(false)}/>}
                            
                            </>
                        :
                        <></>
                    }
                    
                    
                </Row>
                
            </Container>
        </>
    )
}

export default AdministrationUsers