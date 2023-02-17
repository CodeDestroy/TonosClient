import React from 'react'
import { useState } from 'react';
import { Button, Col, Container, Row, Dropdown, ButtonGroup, SplitButton, DropdownButton  } from 'react-bootstrap';
import Header from './Components/Header';
function UserTonos() {

    const [ device, setDevice ] = useState();
    const connect = async () => {
    const device = await navigator.bluetooth.requestDevice({
      // Philips Hue Light Control Service
        acceptAllDevices:true, 
        optionalServices: [0x2A35, 0x180A, 0x1810],
        });
        setDevice(device)
    };

    const getValues = async () => {
        device.gatt.connect().then(server => {
        return server.getPrimaryService(0x1810);
        })
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
            console.log(val)
            value = parseValue(val);
            console.log(JSON.stringify(value))
        }
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
    
    return (
        <>
        <Header/>
          <div>
            <Container>
              <div className="mt-5 vh-100 justify-content-center align-items-center">
                <Row className="justify-content-center align-items-center">
                  <Col md={8} lg={6} xs={12}>
                    <div className="d-flex my-5 align-items-center justify-content-center">
                      <DropdownButton
                        as={ButtonGroup}
                        key={1}
                        id={`dropdown-button-drop-1`}
                        size="lg"
                        title="Подключить"
                      >
                        <Dropdown.Item>
                          <Button className='mx-3' >Подключить прошлое устройство</Button>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Button className='mx-3' onClick={connect}>Подключить новое устройство</Button>
                        </Dropdown.Item>
                      </DropdownButton>
                      
                    </div>
                  </Col>
                  <Col md={8} lg={6} xs={12}>
                    <div className="d-flex my-5 align-items-center justify-content-center">
                      <Button className='mx-3 btn-primary btn-lg' onClick={getValues}>Считать данные</Button>
                    </div>
                  </Col>
                </Row>
                <Row className="justify-content-center align-items-center">
                  <Col>
                    <div class="badge bg-primary text-wrap main-elem" >
                      SYS Верхнее давление
                    </div>
                  </Col>  
                </Row>
              </div>
              
            </Container>
          </div>
          {/* <button onClick={connect}>Connect</button>
          <button onClick={getValues}>GetVal</button> */}
        </>
    )
}

export default UserTonos