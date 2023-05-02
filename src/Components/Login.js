import React, { useRef } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useState, useContext, useEffect } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import AuthService from '../services/AuthService';
import { useHistory } from "react-router-dom";

function Login() {

    const history = useHistory()
    const [User_nick, setUser_nick] = useState('');
    const [User_pass, setUser_pass] = useState('');
    const { store } = useContext(Context);
    const [ error, setError] = useState(null);
    const loginInputReference = useRef(null);
    const passwordInputReference = useRef(null);
    const buttonReference = useRef(null)
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect (() => {
        if (localStorage.getItem('token')) {
            //console.log(localStorage.getItem('token'))
            store.checkAuth();
        }
    }, [])

    useEffect (() => {
        if (passwordInputReference.current.value.length > 0 && loginInputReference.current.value.length > 0) {
            setIsDisabled(false)
        }
    })

    const Login = async () => {
        const res = await store.login(User_nick, User_pass);
        history.push("/")
        /* if (res.response.status == 401) {
            console.log(res.response.status)
            setError(res.response.data)
        } */
        
        //console.log(res)
    }

    const registration = async () => {
        await AuthService.registrarion('test4', 'test4', 1, 3)
    } 

    const handleLoginPress = e => {
        if (e.charCode == 13) {
            if (passwordInputReference.current.value.length > 0) {
                setIsDisabled(false)
                buttonReference.current.focus();
            }
            else {
                passwordInputReference.current.focus();
            }
        }
    }

    const handlePasswordPress = e => {
        if (e.charCode == 13) {
            if (loginInputReference.current.value.length > 0) {
                setIsDisabled(false)
                buttonReference.current.focus();
            }
            else {
                loginInputReference.current.focus();
            }
        }
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
                                <h2 className="fw-bold mb-2 text-uppercase ">Дистанционные прикладные помощники</h2>
                                <p className=" mb-5">Войдите в систему для продолжения</p>
                                {error && <p style={{color: 'red'}}>{error}</p>}
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
                                            ref={loginInputReference}
                                            onKeyPress={handleLoginPress} 
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
                                                ref={passwordInputReference}
                                                onKeyPress={handlePasswordPress} 
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
                                            <Button variant="primary" onClick={Login} type="button" ref={buttonReference} disabled={isDisabled} >
                                                Войти
                                            </Button>
                                        </div>
                                    </Form>
                                    <div className="mt-3">
                                        <p className="mb-0  text-center">
                                            Не зарегестрированы?{" "}
                                            <a onClick={registration} className="text-primary fw-bold">
                                                Зарегистрироваться
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