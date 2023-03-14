import React from 'react'
import Header from './Components/Header'
import { Container, InputGroup, Form, Button, Row, Col, DropdownButton, Dropdown, ButtonGroup, Table, Card } from 'react-bootstrap'
import { height } from '@mui/system'
import { useHistory } from "react-router-dom";
function Administration() {
  const history = useHistory();
  const showUserAdmin = () => {
    history.push("/userAdmin");
  }
  return (
    <>
        <Header/>
            
        <Container style={{paddingLeft: '72px'}}>
          <Card style={{ width: '18rem', height: '20rem' }} className ="my-5">
            <Card.Body>
              <Row d-flex my-5 align-items-center justify-content-center>
                <Button variant="primary" className ="my-3">Персональные настройки</Button>
                <Button variant="primary" className ="my-3" onClick={showUserAdmin}>Админитрование пользователей</Button>
                <Button variant="primary" className ="my-3">Администрирование ролей пользователей</Button>
              </Row>
                      {/* <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link> */}
            </Card.Body>
          </Card>
        </Container>
            
    </>
  )
}

export default Administration
