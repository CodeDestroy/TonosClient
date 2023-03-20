import React from 'react'
import Header from './Components/Header'
import { Container, InputGroup, Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useState } from "react";

function PersonalSettings() {
  return (
    <>
        <Header/>
        <Container className='my-5'>
            <Card>
                <Card.Header as="h5">Смена пароля</Card.Header>
                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Текущий пароль</Form.Label>
                        <Form.Control placeholder="Введите текущий пароль"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Новый пароль</Form.Label>
                        <Form.Control placeholder="Придумайте новый пароль"/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Подтверждение пароля</Form.Label>
                        <Form.Control placeholder="Введите новый пароль еще раз"/>
                    </Form.Group>
                    <Button variant="primary">Сменить пароль</Button>
                </Card.Body>
            </Card>
            <Card className='my-2'>
                <Card.Header as="h5">Аватар</Card.Header>
                <Card.Body>
                    <Form.Group className="mb-3">
                        <Button variant="primary">Загрузить/Сменить аватар</Button>
                        </Form.Group>
                </Card.Body>
            </Card>
        </Container>
    </>
  )
}

export default PersonalSettings