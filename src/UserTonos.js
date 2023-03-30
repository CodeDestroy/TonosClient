
import React from 'react'
import './Components/Css/UserTonos.css'
import { useState, useContext, useEffect } from 'react';
import { Button, Col, Container, Row, Card  } from 'react-bootstrap';
import Header from './Components/Header';
import { Context } from '.';
import TonosService from './services/TonosService'

function UserTonos() {
    const [sys, setSys] = useState();
    const [dia, setDia] = useState();
    const [pul, setPul] = useState();
    const [deviceId, setId] = useState();
    const [deviceName, setName] = useState();
    const { store } = useContext(Context);
    useEffect (() => {
      
      if (localStorage.getItem('token')) {
        store.checkAuth();
      }
      
    }, [store])
    const handleShow = () => setModalShow(true);
    const [modalShow, setModalShow] = React.useState(false);

    /* const print = async () => {
      const state = {
        sys: sys,
        dia: dia,
        pul: pul,
      }

      const response = await FileService.print(state)
    } */

    const connectNew = async () => {
      await navigator.bluetooth.requestDevice({
      // Philips Hue Light Control Service
        acceptAllDevices:true, 
        optionalServices: [0x2A35, 0x180A, 0x1810],
        }).then(device => {
          store.setDevice(device);
          
          device.addEventListener('gattserverdisconnected', onDisconnected);
          getValues();
        });
        console.log(store.device)
        setId(store.device.id);
        setName(store.device.name)
    };
    function onDisconnected() {
      console.log('disconnected')
      getValues();
    }
    function exponentialBackoff(max, delay, toTry, success, fail) {
      toTry().then(result => success(result))
      .catch(_ => {
        if (max === 0) {
          return fail();
        }
        setTimeout(function() {
          console.log('set timeout')
          exponentialBackoff(--max, delay * 2, toTry, success, fail);
        }, delay * 1000);
      });
    }
    const getValues = async () => {
        exponentialBackoff(7, 2, 
        function toTry(){
          console.log(store.device)
          return store.device.gatt.connect();
        },
        function success(server) {
          console.log('success')
          server.getPrimaryService(0x1810)
          .then(service => {
            return service.getCharacteristic(0x2A35);
            })
            .then(characteristic => {
            return characteristic.startNotifications();
            })
            .then(characteristic => {
            characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
            })
            .catch(error => { console.log(error); });
            var value;
            const handleCharacteristicValueChanged = (event) => {
                var val = event.target.value;
                //console.log(val)
                value = parseValue(val);
                setDia(value.DIA) 
                setSys(value.SYS)
                setPul(value.PUL)
                //console.log(JSON.stringify(value))
            }
        },
        function fail() {
          console.log('Failed to reconnect.');
        });
        
    };

  const parseValue = (value) => {
    // В Chrome 50+ используется DataView.
    value = value.buffer ? value : new DataView(value);
    let flags = value.getUint8(0);

    // Определяем формат
    let rate16Bits = flags & 0x1;
    let result = {};
    let index = 1;
    

    // Читаем в зависимости от типа
    if (rate16Bits) {
      result.SYS = value.getUint16(index, /*littleEndian=*/true);
      index = 3;
      result.DIA = value.getUint16(index, true);
      index = 7;
      result.PUL = value.getUint16(index, true);
      result.Artim = value.getUint16(9, true);
    } else {
      result.SYS = value.getUint8(index);
      index = 3;
      result.DIA = value.getUint8(index);
      index = 7;
      result.PUL = value.getUint8(index);
      result.Artim = value.getUint8(9);
    }
    return result;
  }  
  const sendResults = () => {
    TonosService.sendResults(sys, dia, pul, deviceId, store.user.patient_id, deviceName)
  }
    
    return (
        <>
        <Header/>
          <div  style={{paddingLeft: '72px'}}>
            <Container>
              <div className="mt-5 vh-100 justify-content-center align-items-center">
                <Row className="justify-content-center align-items-center">
                  {/* <Col md={8} lg={6} xs={12}>
                    <div className="d-flex my-5 align-items-center justify-content-center">
                      <Button variant="primary" onClick={handleShow} className='mx-3 btn-primary btn-lg'>
                        Выбрать пациента
                      </Button>
                      <SearchPatientModal show={modalShow} onHide={() => setModalShow(false)}/>
                    </div>
                  </Col> */}
                  <Col  md={8} lg={6} xs={12}>
                    <div className="d-flex my-5 align-items-center justify-content-center">
                      <Button className='mx-3 btn-primary btn-lg' onClick={connectNew}>Подключить устройство</Button>
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-center mb-4 mt-5 align-items-center">
                  <Col md={8} lg={6} xs={12}>
                    <div className="text-wrap d-flex align-items-center justify-content-center" >
                      <p className='mesurment-main d-flex bg-primary px-3 py-3'>SYS Верхнее давление</p>
                    </div>
                  </Col>  
                  <Col md={8} lg={6} xs={12}>
                    <div className="text-wrap d-flex align-items-center justify-content-center" >
                      <p className='alert alert-dark d-flex bg-light justify-content-center align-items-center' id="SYS_id" style={{fontSize: '1.25rem',minHeight:'3em', minWidth: '4em'}}>{sys}</p>
                    </div>
                  </Col>   
                </Row>
                <Row className="justify-content-center my-4 align-items-center">
                  <Col md={8} lg={6} xs={12}>
                    <div className="text-wrap d-flex align-items-center justify-content-center" >
                      <p className='mesurment-main d-flex bg-primary px-3 py-3'>DIA Нижнее давление</p>
                    </div>
                  </Col>
                  <Col md={8} lg={6} xs={12}>
                    <div className="text-wrap d-flex align-items-center justify-content-center" >
                      <p className='alert alert-dark d-flex bg-light justify-content-center align-items-center' id="DIA_id" style={{fontSize: '1.25rem', minHeight:'3em', minWidth: '4em'}}>{dia}</p>
                    </div>
                  </Col> 
                </Row>
                <Row className="justify-content-center my-4 align-items-center">
                  <Col md={8} lg={6} xs={12}>
                    <div className="text-wrap d-flex align-items-center justify-content-center" >
                      <p className='mesurment-main d-flex bg-primary px-5 py-3 '>PUL Пульс</p>
                    </div>
                  </Col>
                  <Col md={8} lg={6} xs={12}>
                    <div className="text-wrap d-flex align-items-center justify-content-center" >
                      <p className='alert alert-dark d-flex bg-light justify-content-center align-items-center' id="PUL_id" style={{fontSize: '1.25rem',minHeight:'3em', minWidth: '4em'}}>{pul}</p>
                    </div>
                  </Col> 
                </Row>
                <Row>
                  <div className="d-flex my-5 align-items-center justify-content-center">
                    <Button className='mx-3 btn-primary btn-lg px-5 py-3' onClick={sendResults}>Передать данные</Button>
                  </div>
                </Row>
                  <Row className='align-items-center justify-content-center'>
                    <Col md={8}>
                      <Card className ="align-items-center justify-content-center">
                        <Card.Header as="h5">Как измерить давление и передать данные?</Card.Header>
                          <Card.Body>
                            <Row>
                              <Card.Text className="my-3">1. Включите тонометр и зажмите кнопку "Старт" на тонометре</Card.Text>
                              <Card.Text>2. Нажмите кнопку "Подключить устройство" на экране компьютера/телефона</Card.Text>
                              <Card.Text className="mb-3">3. В открывшемся окне выберите ваш тонометр и подключитесь к нему</Card.Text>
                              <Card.Text>4. Дождитесь пока тонометр выполнит измерение и данные отобразятся на экране компьютера/телефона</Card.Text>
                              <Card.Text>5. Нажмите кнопку "Передать данные" на экране компьютера/телефона</Card.Text>
                            </Row>
                          </Card.Body>
                      </Card>
                    </Col>
                  </Row>
              </div>
            </Container>
          </div>
        </>
    )
}

export default UserTonos