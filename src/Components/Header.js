import React, { useContext } from 'react'
import { Container, Navbar, NavDropdown } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import UserProfileModal from './Modals/UserProfileModal';
import { Context } from '..';
import SideBar from './SideBar';

function Header() {
  const { store } = useContext(Context);
  const [modalShow, setModalShow] = React.useState(false);
  const history = useHistory();

/*   const showTonometr = () => {
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
  } */


  const Logout = () => {
    store.logout();
  }

  return (
    <>
      <SideBar></SideBar>
        <Navbar bg="dark" variant="dark" style={{minHeight: '60px'}} >
          <Container>
              <NavDropdown title={store.user.full_name} style={{color: '#fff', marginLeft: 'auto'}} id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => setModalShow(true)}>Профиль</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={Logout}>
                  Выйти
                </NavDropdown.Item>
              </NavDropdown>
              <UserProfileModal show={modalShow} onHide={() => setModalShow(false)}/>
          </Container>
        </Navbar> 
    </>
  )
}
export default Header