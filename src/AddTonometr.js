
import React from 'react'
import './Components/Css/UserTonos.css'
import { useState, useContext, useEffect } from 'react';
import { Button, Col, Container, Row, Form, InputGroup, OverlayTrigger, Popover, Table  } from 'react-bootstrap';
import Header from './Components/Header';
import * as Icon from 'react-bootstrap-icons';
import { Context } from '.';
import TonosService from './services/TonosService'

function AddTonometr() {
    const [deviceId, setId] = useState(null);
    const [device, setDevice] = useState(null)
    const [ deviceName, setName ] = useState(null)
    const { store } = useContext(Context);
    useEffect (() => {
      
      if (localStorage.getItem('token')) {
        store.checkAuth();
      }
    }, [store])
    const [ serialNum, setSerialNum ] = useState('')
    const [ error, setError ] = useState(null);

    const connectNew = async () => {
      await navigator.bluetooth.requestDevice({
      // Philips Hue Light Control Service
        acceptAllDevices:true, 
        optionalServices: [0x2A35, 0x180A, 0x1810],
        }).then(device => {
            device.gatt.connect()
            console.log(device)
            setId(device.id)
            setName(device.name)
            console.log(device.name, deviceName)
          device.addEventListener('gattserverdisconnected', onDisconnected);
        });
    };
    function onDisconnected() {
      console.log(`Устройство ${deviceId} отключено`)
    }

  const sendResults = async () => {
    if (deviceId != undefined && deviceName != undefined) {
      try {
        console.log(deviceName)
        const response = await TonosService.addTonometr(deviceId, serialNum, deviceName)
        console.log(response)
        setDevice(response.data)
      }
      catch (e) {
        setError(e.response.data)
      }   
    }
  }
    
    return (
        <>
        <Header/>
          <div  style={{paddingLeft: '72px'}}>
            <Container className='mt-5'>
              {!device ? 
                <>
                  <div className="mt-5 vh-100 justify-content-center align-items-center">
                    <Row className="justify-content-center align-items-center">
                      <Col  md={8} lg={6} xs={12}>
                        <div className="d-flex my-5 align-items-center justify-content-center">
                          <Button className='mx-3 btn-primary btn-lg' onClick={connectNew}>Подключить устройство</Button>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      {error && <p style={{color: 'red'}}>{error}</p>}
                        
                        <Form.Label htmlFor="basic-email">Серийный номер устройства</Form.Label>
                        
                        <InputGroup className="mb-3">
                            <Form.Control 
                                placeholder="Серийный номер"
                                aria-label="Серийный номер" 
                                id="basic-sn" 
                                required={true}
                                onChange={(e) => setSerialNum(e.target.value)}
                                value={serialNum}
                            />
                            <OverlayTrigger
                                delay={{ show: 250, hide: 400 }}
                                trigger={["hover", "hover"]}
                                key={`popOver`}
                                placement={'top'}
                                overlay={
                                    <Popover id={`popover-positioned-top`}>
                                    <Popover.Header as="h3">{`Серийный номер`}</Popover.Header>
                                    <Popover.Body>
                                        <strong>Располагается на нижней части тонометра после "SN"</strong>
                                    </Popover.Body>
                                    </Popover>
                                }
                                >
                                <Icon.PatchQuestion className='mt-1 mx-1' width={'30px'} height={'30px'}></Icon.PatchQuestion>    
                            </OverlayTrigger>
                            
                        </InputGroup>
                    </Row>
                    <Row>
                      <div className="d-flex my-5 align-items-center justify-content-center">
                        <Button className='mx-3 btn-primary btn-lg px-5 py-3' onClick={sendResults}>Зарегистрировать тонометр</Button>
                      </div>
                    </Row>
                    {/* <Row>
                      <div className="d-flex my-5 align-items-center justify-content-center">
                        <Button className='mx-3 btn-primary btn-lg px-5 py-3' onClick={}>Распечатать данные</Button>
                      </div>
                    </Row> */}
                  </div>
                </>
                :
                <>
                <Button onClick={e=>setDevice(null)}>Назад</Button>
                  <Table className='mt-5 justify-content-center align-items-center' striped hover>
                    <thead>
                      <tr key='0'>
                        <th key='th_1'>#</th>
                        <th key='th_2'>Серийный номер</th>
                        <th key='th_3'>Bluetoth Id</th>
                        <th key='th_4'>Название тонометра</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={`tonometr`}>
                        <td>{device.id}</td>
                        <td>{device.serial_number}</td>
                        <td>{device.bluetoth_id}</td>
                        <td>{device.name}</td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              }
              
            </Container>
          </div>
        </>
    )
}

export default AddTonometr