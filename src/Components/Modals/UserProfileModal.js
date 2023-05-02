import React, { useContext, useEffect, useState } from 'react'
import { Button }from '@mui/material/';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../..';
import FileService from '../../services/FileService'
import TonosService from '../../services/TonosService';
function UserProfileModal(props) {
  const { store } = useContext(Context);
  const [patient, setPatient] = useState(null)
  const [doctor, setDoctor] = useState(null)
  const getContract = async () => {
    if (store.user != undefined) {
      FileService.getContractFileName(store.user.patient_id)
      .then((fileName) => {
        FileService.fetch_pdf(fileName)
      })

    }
  }
  useEffect(() => {
    console.log(store.user)
    if (store.user.patient_id) {
      TonosService.getPatientsById(store.user.patient_id).then((res) => {
        setPatient(res.data)
      }) 
    }
    else {
      TonosService.getDoctorById(store.user.doctor_id).then((res) => {
        setDoctor(res.data[0])
      })
    }
  }, [store])

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Профиль
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{store.user.full_name}</h4>
        {patient && 
          <>
            <p>СНИЛС: {patient.snils}</p>
            <p>ПОЛИС: {patient.polis}</p>
            <p>Телефон: {patient.phone}</p>
            <p>Email: {patient.email}</p>
            <h5>Документы</h5>          
            <Button onClick={getContract}>
              Скачать контракт и акт получения
            </Button>
          </>
        }
        {doctor &&
          <>
            <p>Должность: {doctor.med_post_name}</p>
            <p>Медицинская организация: {doctor.medical_org_name}</p>
          </>
        }
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserProfileModal