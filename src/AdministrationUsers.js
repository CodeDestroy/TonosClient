import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Table } from 'react-bootstrap'
import Header from './Components/Header'
import AdminService from './services/AdminService'

function AdministrationUsers() {
    const handleShow = () => setModalShow(true);
    const [modalShow, setModalShow] = useState(false);

    const [users, setUsers] = useState([])
    useEffect(() => {
        async function fetchData() {
            const users = await AdminService.showAllUsers(1, 10)
            setUsers(users.data)
          }
        fetchData();
    }, [])
    return (
        <>
            <Header/>
            <Container>
                <Row className='mt-5'>
                    {
                        users.length > 0 ? 
                            <>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr key='0'>
                                        <th>#</th>
                                        <th key='th_1'>Пациент/Врач/Админ.</th>
                                        <th key='th_2'>Логин</th>
                                        <th key='th_3'>Фамилия</th>
                                        <th key='th_4'>Имя</th>
                                        <th key='th_5'>Отчество</th>
                                        <th key='th_6'>Дата рожения</th>
                                        <th key='th_7'>Телефон</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { 
                                    users.map((user, index) => {
                                        if (user.p_id == null) {
                                            return <tr key={`tr_${user.uud_id}`}>
                                                <td>{user.uud_id}</td>
                                                <td>{user.uu_role_id > 1 ? (user.uu_role_id == 2 ? `Пациент` : `Администратор`) : `Врач`}</td>
                                                <td>{user.uud_login}</td>
                                                <td>{user.d_surname}</td>
                                                <td>{user.d_name}</td>
                                                <td>{user.d_patronomic_name}</td>
                                                <td>{user.d_birth_date}</td>
                                                <td>{user.d_phone}</td>
                                                
                                            </tr>
                                        }
                                        else {
                                            return <tr key={`tr_${user.uud_id}`}>
                                                <td>{user.uud_id}</td>
                                                <td>{user.uu_role_id > 1 ? (user.uu_role_id == 2 ? `Пациент` : `Администратор`) : `Врач`}</td>
                                                <td>{user.uud_login}</td>
                                                <td>{user.p_surname}</td>
                                                <td>{user.p_name}</td>
                                                <td>{user.p_patronomic_name}</td>
                                                <td>{user.p_birth_date}</td>
                                                <td>{user.p_phone}</td>
                                                
                                            </tr>
                                        }
                                    }
                                        
                                    )
                                    }
                                    
                                    </tbody>
                                </Table>
                            </>
                        :
                        <></>
                    }
                    
                </Row>
            {/* <Button>Зарегестрировать нового пользователя</Button> */}
            </Container>
        </>
    )
}

export default AdministrationUsers