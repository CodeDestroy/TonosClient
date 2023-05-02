import React, { useEffect, useState, useContext } from 'react'
import { Form, Button, Container, Row, Table, Col } from 'react-bootstrap'
import Header from './Components/Header'
import RegisterUser from './Components/Modals/RegisterUser';
import SearchUserModal from './Components/Modals/SearchUserModal';
import AdminService from './services/AdminService'
import * as Icon from 'react-bootstrap-icons';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import ChangePatientModal from './Components/Modals/ChangePatientModal';
import ChangeUserModal from './Components/Modals/ChangeUserModal';
import Multiselect from 'multiselect-react-dropdown';
import TonosService from './services/TonosService'
import { Context } from '.';
function AdministrationUsers() {
    const handleShowSearch = () => setModalShowSearch(true);
    const [modalShowSearch, setModalShowSearch] = useState(false);

    const handleShowRegistration = () => setModalRegisterUserModalShow(true);
    const [modalRegisterUserModalShow, setModalRegisterUserModalShow] = useState(false);

    const handleShowPatinetEdit = () => setModalPatinetEdit(true);
    const [modalPatientEdit, setModalPatinetEdit] = useState(false);
    
    const handleShowUserEdit = () => setModalUserEdit(true);
    const [modalUserEdit, setModalUserEdit] = useState(false);

    const [ currentPage, setCurrentPage ] = useState(1)
    const [ numPages, setNumPages ] = useState(null)

    const [userId, setUserId] = useState(null)

    const handleShowPatient = () => setModalChangePatientShow(true);
    const [modalChangePatientShow, setModalChangePatientShow] = useState(false);
    const { store } = useContext(Context);
    const [options, setOptions] = useState([])
    
    useEffect (() => {
      if (localStorage.getItem('token')) {
        store.checkAuth();
      }
      TonosService.getAvailableRoles(store.user.role).then((roles) => {
        setOptions(roles.data)
      });
    }, [store])

    
    const onSelect = async (selectedList, selectedItem) => {
        const users = await AdminService.showAllUsers(currentPage, 10, selectedList)
        setUsers(users.data)
    }
    
    const onRemove = async (selectedList, removedItem) => {
        const users = await AdminService.showAllUsers(currentPage, 10, selectedList)
        setUsers(users.data)
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
        const users = await AdminService.showAllUsers(page, 10, [options[0]])
        console.log(users.data)
        setUsers(users.data)
    }
    useEffect(() => { 
        if (options.length > 0)
            getCountUsers()
        //fetchData();
    }, [options])

    const changePatient = event => {
        setModalPatinetEdit(false)
        if (users[event.currentTarget.id].uu_role_id == 2) {
            setUserId(event.currentTarget.id)
            handleShowPatinetEdit()
        }
        else
            console.log('Врач/Администратор')
    }

    const changeUser = event => {
        setModalUserEdit(false)
        setUserId(event.currentTarget.id)
        handleShowUserEdit()
    }
    // const parseDate = (val) => {
    //     const timezoneOffset = new Date().getTimezoneOffset() / 60; 
    //     const moscowOffset = 3;
    //     const hourOffset = moscowOffset - timezoneOffset;

    //     let date = new Date(val.replace(/\.\d+Z/,'').replace('T', ' '));
    //     date.setHours(date.getHours() + hourOffset);
        
    //     return date.toLocaleString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit'});
    // }
    const parseDate = (val) => {
    
        const timezoneOffset = new Date().getTimezoneOffset() / 60; 
        const moscowOffset = 3;
        const hourOffset = moscowOffset - timezoneOffset;
        if (val != null) {
            let date = new Date(val.replace(/\.\d+Z/,''));
            date.setHours(date.getHours() + hourOffset);
            return date.toLocaleString('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit' });
        }                      
    }
    return (
        <>
            <Header/>
            <Container style={{paddingLeft: '65px'}}>
                <Row style={{marginLeft: '10px'}}>
                    {store.user.role > 2 &&
                    <Col md={8} className='mt-5'>
                        <Button onClick={handleShowRegistration}>Зарегестрировать нового пользователя</Button>
                    </Col>}
                    <Col md={4} className='mt-5'>
                        <Button onClick={handleShowSearch}>Найти пользователя</Button>
                    </Col>
                    <RegisterUser show={modalRegisterUserModalShow} onHide={() => setModalRegisterUserModalShow(false)}/>
                    <SearchUserModal show={modalShowSearch} sendData={getData} onHide={() => setModalShowSearch(false)}/>
                </Row>
                <Row className='mt-5'>
                    
                            <>
                                <Table striped hover responsive="md">
                                    <thead>
                                    {options.length > 0 && 
                                    <tr key='0'>
                                        {Array.from({ length: 1 }).map((_, index) => (
                                            <th key='th_0'>#</th>
                                        ))}
                                        {Array.from({ length: 1 }).map((_, index) => (
                                            <th key='th_1'>{/* Пациент/Врач/Админ. */}
                                            <Multiselect
                                                options={options} // Options to display in the dropdown
                                                selectedValues={[options[0]]} // Preselected value to persist in dropdown
                                                onSelect={onSelect} // Function will trigger on select event
                                                onRemove={onRemove} // Function will trigger on remove event
                                                displayValue="role" // Property name to display in the dropdown options
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
                                                    borderBottom: '1px solid blue',
                                                    borderRadius: '0px'
                                                    }
                                                }}
                                            />
                                            </th>
                                        ))}
                                        {Array.from({ length: 1 }).map((_, index) => (
                                            <th key='th_2'>Логин</th>
                                        ))}
                                        {Array.from({ length: 1 }).map((_, index) => (
                                            <th key='th_3'>Фамилия</th>
                                        ))}
                                        {Array.from({ length: 1 }).map((_, index) => (
                                            <th key='th_4'>Имя</th>
                                        ))}
                                        {Array.from({ length: 1 }).map((_, index) => (
                                            <th key='th_5'>Отчество</th>
                                        ))}
                                        {Array.from({ length: 1 }).map((_, index) => (
                                            <th key='th_6' style={{width: '140px'}}>Дата рожения</th>
                                        ))}
                                        {Array.from({ length: 1 }).map((_, index) => (
                                            <th key='th_7' style={{width: '160px'}}>Телефон</th>
                                        ))}
                                        {Array.from({ length: 1 }).map((_, index) => (
                                            <th key='th_8'></th>
                                        ))}
                                    </tr>}
                                    </thead>
                                    <tbody>
                                    { users && 
                                        users.map((user, index) => {
                                            if (user.p_id == null) {
                                                
                                                return (
                                                    <>
                                                        <tr key={`tr_${user.uud_id}`}>
                                                            <td>{user.uud_id}</td>
                                                            <td>{user.role_name}</td>
                                                            <td>{user.uud_login}</td>
                                                            <td>{user.d_surname}</td>
                                                            <td>{user.d_name}</td>
                                                            <td>{user.d_patronomic_name}</td>                                                                                                                                                                                 
                                                            <td>{parseDate(user.d_birth_date)}</td>                                                                                                             
                                                            <td>{user.d_phone}</td>    
                                                            <td>
                                                                <Button id={index} onClick={e => { changeUser(e)}}>
                                                                    <Icon.PencilFill width={'20px'}/>
                                                                </Button>
                                                            </td>
                                                            {/* <ChangePatientModal user={users[index]} show={modalPatientEdit} onHide={() => setModalPatinetEdit(false)}/> */}
                                                        </tr>
                                                        {users[userId] && modalUserEdit && <ChangeUserModal user={users[userId]} show={modalUserEdit} onHide={() => setModalUserEdit(false)}/>}
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
                                                            <td>{parseDate(user.p_birth_date)}</td>
                                                            <td>{user.p_phone}</td>
                                                            <td>
                                                                <Button id={index} onClick={e => {changePatient(e)}}>
                                                                    <Icon.PencilFill width={'20px'}/>
                                                                </Button> 
                                                            </td>
                                                            {users[userId] && modalPatientEdit && <ChangePatientModal patient={users[userId]} show={modalPatientEdit} onHide={() => setModalPatinetEdit(false)}/>}
                                                            
                                                        </tr>
                                                        
                                                    </>
                                                )
                                            }
                                        })
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
                                
                            
                            </>
                        :
                        <></>
                    
                    
                    
                </Row>
                
            </Container>
        </>
    )
}

export default AdministrationUsers