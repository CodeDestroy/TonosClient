import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { useHistory } from "react-router-dom";
import UserProfileModal from './Modals/UserProfileModal';
function Header() {
  const [modalShow, setModalShow] = React.useState(false);
  const history = useHistory();

  const showTonometr = () => {
    history.push("/userTonometr");
  }

  const goToMain = () => {
    history.push('/')
  }

  const showMonitoring = () => {
    history.push('/monitoring')
  }

  return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand onClick={goToMain}><Icon.HouseFill className="px-1 pb-1" size={30}/>Главная</Navbar.Brand>
            <NavDropdown className="me-auto" title="Статистика" style={{color: '#ffffff8c'}} id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Статистика Врач -&gt; Пациент</NavDropdown.Item>
            </NavDropdown>
            <Nav className="me-auto">
                <Nav.Link onClick={showMonitoring}>Мониторинг ключевых показателей</Nav.Link>
            </Nav>
            <Nav className="me-auto">
                <Nav.Link onClick={showTonometr}>Дистанционная тонометрия</Nav.Link>
            </Nav>
            <Nav className="me-auto">
                <Nav.Link href="#home">Администрирование</Nav.Link>
            </Nav>
            {/* <Navbar.Collapse className="justify-content-end">
                <Navbar.Link className="d-flex justify-content-end">
                    <a href="#login">Андрей Новичихин</a>
                </Navbar.Link>
            </Navbar.Collapse> */}
            <NavDropdown title="Новичихин Андрей" style={{color: '#fff'}} id="navbarScrollingDropdown">
              <NavDropdown.Item onClick={() => setModalShow(true)}>Профиль</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">
                Выйти
              </NavDropdown.Item>
            </NavDropdown>
            <UserProfileModal show={modalShow} onHide={() => setModalShow(false)}/>
        </Container>
      </Navbar>
  )
}
export default Header