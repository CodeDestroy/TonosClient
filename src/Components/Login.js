import React from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState, useContext, useEffect } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
function Login() {

    
    const [User_nick, setUser_nick] = useState('');
    const [User_pass, setUser_pass] = useState('');
    const { store } = useContext(Context);


    useEffect (() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    })

    const Login = () => {
        store.login(User_nick, User_pass);
    }

  return (
    <div>
        <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <div className="border border-3 border-primary"></div>
                    <Card className="shadow">
                        <Card.Body>
                            <div className="mb-3 mt-md-4">
                                <h2 className="fw-bold mb-2 text-uppercase ">Тонометрия</h2>
                                <p className=" mb-5">Войдите в систему для продолжения</p>
                                <div className="mb-3">
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label className="text-center">
                                                Логин
                                            </Form.Label>
                                        <Form.Control
                                            type="email" 
                                            placeholder="Введите логин" 
                                            onChange={e => setUser_nick(e.target.value)}
                                            value={User_nick}
                                        />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formBasicPassword"
                                        >
                                            <Form.Label>Пароль</Form.Label>
                                            <Form.Control 
                                                type="password" 
                                                placeholder="Введите пароль" 
                                                onChange={e => setUser_pass(e.target.value)}
                                                value={User_pass}
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formBasicCheckbox"
                                        >
                                            <p className="small">
                                                <a className="text-primary" href="#!">
                                                    Забыли пароль?
                                                </a>
                                            </p>
                                        </Form.Group>
                                        <div className="d-grid">
                                            <Button variant="primary" onClick={Login} type="button">
                                                Войти
                                            </Button>
                                        </div>
                                    </Form>
                                    <div className="mt-3">
                                        <p className="mb-0  text-center">
                                            Не зарегестрированы?{" "}
                                            <a href="{''}" className="text-primary fw-bold">
                                                Зарегистрирроваться
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default observer(Login)