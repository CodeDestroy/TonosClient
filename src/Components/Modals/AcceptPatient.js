import { Form, Button, Modal } from 'react-bootstrap'
import React, { useEffect, useState, useContext } from 'react'
import TonosService from '../../services/TonosService'
import FileService from '../../services/FileService'
import { Context } from '../..';

export default function AcceptPatient(props) {
    const [patient, setPatient] = useState(null)
    const { store } = useContext(Context);
    const [deviceId, setId] = useState(null)
    const [ error, setError ] = useState(null);
    const [ appontment, setAppointment ] = useState(null);
    const [device, setDevice] = useState(null)
    
    useEffect(()=> {
        setPatient(props.patient)
        TonosService.getDirByDoctorId(store.user.doctor_id)
    }, [])

    useEffect (() => {
        if (localStorage.getItem('token')) {
          store.checkAuth();
        }
        
    }, [store])

    const connectNew = async () => {
        await navigator.bluetooth.requestDevice({
        // Philips Hue Light Control Service
          acceptAllDevices:true, 
          optionalServices: [0x2A35, 0x180A, 0x1810],
          }).then(device => {
              device.gatt.connect()
              console.log(device)
              setId(device.name)
            device.addEventListener('gattserverdisconnected', onDisconnected);
          });
      };
      function onDisconnected() {
        console.log(`Устройство ${deviceId} отключено`)
      }
  
    const sendResults = async () => {
      if (deviceId != undefined) {
        try {
          const response = await TonosService.findTonometrByBtId(deviceId)
          setDevice(response.data)
        }
        catch (e) {
          setError(e.response.data)
        }   
      }
    }
    useEffect(()=>{
        
        if (deviceId != null)
            sendResults()
    }, [deviceId])

    const endAccepting = async () => {
        /* const state = {
            DATE_DOC: Date.now(),
        } */
        console.log(store.user)
        const response = await TonosService.addAppointment(patient.p_id, store.user.doctor_id, device.id)
        const files = await FileService.print(patient.p_id, store.user.doctor_id, device.serial_number, response.data.id)
        setAppointment(response.data)
    }

    return (
        <Modal
        {...props}
        //backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
        <Modal.Title>Принять пациента</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>

            {(patient && !appontment) ? 
                <>

                    <p>ФИО: {patient.p_full_name}</p>
                    <p>СНИЛС: {patient.snils}</p>
                    <p>Полис: {patient.polis}</p>
                    <p>Телефон: {patient.p_phone}</p>
                    <p>Почта: {patient.p_email}</p>
                    <p>Дата рождения: {patient.p_birth_date}</p>
                    <p>Адрес: {patient.p_address}</p>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    
                    {
                        device ?
                        <>
                            <p>Серийный номер: {device.serial_number}</p>
                            <p>Bluetooth Id: {device.bluetoth_id}</p>
                            <Button onClick={e=>{setDevice(null); setId(undefined)}}>Подключить другое устройство</Button>
                        </>
                        :
                        <Button className='mx-3 btn-primary btn' onClick={connectNew}>Подключить устройство</Button>
                    }
                </>
                :
                <>
                    <p>Запись создана!</p>
                </>
            }
            
        </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
            Закрыть
        </Button>
        {(patient && !appontment) && <Button variant="primary" onClick={endAccepting}>Завершить приём</Button>}
        </Modal.Footer>
    </Modal>
    )
}
