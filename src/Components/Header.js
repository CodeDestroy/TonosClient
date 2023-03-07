import React, { useContext, useEffect } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useHistory } from "react-router-dom";
import UserProfileModal from './Modals/UserProfileModal';
import { Context } from '..';


function Header() {
  const { store } = useContext(Context);
  const [modalShow, setModalShow] = React.useState(false);
  const history = useHistory();

  const showTonometr = () => {
    history.push("/userTonometr");
  }

  const showMeasure = () => {
    history.push("/userMeasure")
  }

  const goToMain = () => {
    history.push('/')
  }

  const showMonitoring = () => {
    history.push('/monitoring')
  }

  const showAdministration = () => {
    history.push('/administration')
  }


  const Logout = () => {
    store.logout();
  }
  /* useEffect ( () => {
    
    if (localStorage.getItem('token')) {
      console.log(store.user.is_admin);
    }
  }, [store]) */
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand onClick={goToMain} style={{cursor:'pointer', marginRight: '3em'}}><Icon.HouseFill className="px-1 pb-1" size={30}/>Главная</Navbar.Brand>
            { 
              store.user.is_admin ? 
                <>
                  <NavDropdown className="me-auto" title="Статистика" style={{color: '#ffffff8c'}} id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">Статистика Врач -&gt; Пациент</NavDropdown.Item>
                  </NavDropdown>
                  <Nav className="me-auto">
                    <Nav.Link onClick={showMonitoring}>Мониторинг ключевых показателей</Nav.Link>
                  </Nav>
                  <NavDropdown className="me-auto" title="Дистанционная тонометрия" style={{color: '#ffffff8c'}} id="navbarScrollingDropdown">
                    <NavDropdown.Item onClick={showTonometr}>Измерить давление пациенту</NavDropdown.Item>
                    <NavDropdown.Item onClick={showMeasure}>Показать статистику измерений</NavDropdown.Item>
                  </NavDropdown>
                </>
                :
                <>
                  <Nav className="me-auto">
                    <Nav.Link onClick={showTonometr}>Дистанционная тонометрия</Nav.Link>
                  </Nav>
                </>
            }
            {
              store.user.is_admin ? 
              <>
                <Nav className="me-auto">
                  <Nav.Link href="#home">Администрирование</Nav.Link>
                </Nav>
              </>
              :
              <></>
            }
            
            {/* <Navbar.Collapse className="justify-content-end">
                <Navbar.Link className="d-flex justify-content-end">
                    <a href="#login">Андрей Новичихин</a>
                </Navbar.Link>
            </Navbar.Collapse> */}
            <NavDropdown title={store.user.name + ' ' + store.user.otch} style={{color: '#fff'}} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => setModalShow(true)}>Профиль</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={Logout}>
                Выйти
              </NavDropdown.Item>
            </NavDropdown>
            <UserProfileModal show={modalShow} onHide={() => setModalShow(false)}/>
        </Container>
      </Navbar>
  )
}
export default Header