import { InputGroup, Form, Button, Modal } from 'react-bootstrap'
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import TonosService from '../../services/TonosService'
import AdminService from '../../services/AdminService';
import debounce from 'lodash/debounce';

function ChangeAndAddMOModal(props) {
  
    const [show, setShow] = useState(true)
    const inputEl = useRef();
    const [id, setDistrictId] = useState(props.district ? props.district[0].id : 0)
    const [name, setName] = useState(props.district ? props.district[0].name : '')
    const [error, setError] = useState('')

    const close = () => {
        props.onHide();
    }
    const saveChanges = () => {
        AdminService.saveOrAddDistrict(id, name)
        .then((result) => {
            if (result.data.message) {
                setError(result.data.message)
            }
            else {
                alert('Изменения сохранены')
                props.onHide()
                window.location.reload(false);
            }
        })
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
            <Modal.Title>{!props.medorg ? 'Создать' : 'Изменить'} район</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                {error.length > 0 && <h4 style={{color: 'red'}}>{error}</h4>}  
                <Form.Label >Полное название района</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Район"
                    aria-label="Район"
                    onChange={e => setName(e.target.value)}
                    value={name}
                  />
                </InputGroup>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={close}>
                Закрыть
            </Button>
            <Button variant="primary" onClick={saveChanges}>Сохранить изменения</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ChangeAndAddMOModal