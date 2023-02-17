import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
function Header() {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home"><Icon.HouseFill className="px-1 pb-1" size={30}/>Главная</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="#home">Статистика</Nav.Link>
            </Nav>
            {/* <Navbar.Collapse className="justify-content-end">
                <Navbar.Link className="d-flex justify-content-end">
                    <a href="#login">Андрей Новичихин</a>
                </Navbar.Link>
            </Navbar.Collapse> */}
            <NavDropdown title="Новичихин Андрей" style={{color: '#fff'}} id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Профиль</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">
                Выйти
              </NavDropdown.Item>
              
            </NavDropdown>
        </Container>
      </Navbar>
  )
}
export default Header