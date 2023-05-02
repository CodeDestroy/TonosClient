import { InputGroup, Form, Button, Modal } from 'react-bootstrap'
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import TonosService from '../../services/TonosService'
import AdminService from '../../services/AdminService';
import debounce from 'lodash/debounce';

function ChangeAndAddMOModal(props) {
  
    const [show, setShow] = useState(true)
    const inputEl = useRef();
    const [medOrgId, setMedOrgId] = useState(props.medorg ? props.medorg[0].id : 0)
    const [medOrgName, setMedOrgName] = useState(props.medorg ? props.medorg[0].medical_org_name : '')
    const [medOrgNameSmall, setMedOrgNameSmall] = useState(props.medorg ? props.medorg[0].medical_org_name_small : '')
    const [inn, setInn] = useState(props.medorg ? props.medorg[0].inn : '')
    const [region, setRegion] = useState(props.medorg ? props.medorg[0].region : '')
    const [parentOrgId, setOrgId] = useState(props.medorg ? props.medorg[0].parent_id : '')

    useEffect(() => {
        if (inputEl.current) {
            if (props.medorg)
                TonosService.getMedOrgById(props.medorg[0].parent_id).then((results) => {
                    inputEl.current.value = results.data.medical_org_name;
                })
            else
                inputEl.current.value = '';
        }
    }, [props])

    const [results, setResults] = useState([]);

    const [error, setError] = useState('')


    const handleTintClick = useCallback((value, id) => {
        setShow(false)
        inputEl.current.value = value;
    }, [inputEl]);

    const handleInputChange = useMemo(() => debounce(async e => {
        const { value } = e.target;
        if (value.length < 3) return;

        const results = await TonosService.getMedOrg(value);
        setResults(results.data)
        setShow(true)
    }, 800), []);

    const close = () => {
        props.onHide();
    }
    const saveChanges = () => {
        AdminService.saveOrAddOrg(medOrgId, medOrgName, medOrgNameSmall, inn, region, parentOrgId)
        .then((result) => {
            if (result.data.message) {
                setError(result.data.message)
            }
            else {
                alert('Изменения сохранены')
                props.onHide()
            }
        })
        console.log(parentOrgId, medOrgName)
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
            <Modal.Title>{!props.medorg ? 'Создать' : 'Изменить'} медицинскую организацию</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                {error.length > 0 && <h4 style={{color: 'red'}}>{error}</h4>}  
                <Form.Label >Полное название организации</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Организация"
                    aria-label="Организация"
                    onChange={e => setMedOrgName(e.target.value)}
                    value={medOrgName}
                  />
                </InputGroup>
                <Form.Label >Сокращённое название организации</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Организация"
                    aria-label="Организация"
                    onChange={e => setMedOrgNameSmall(e.target.value)}
                    value={medOrgNameSmall}
                  />
                </InputGroup>
                <Form.Label >Инн</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Инн"
                    aria-label="Инн"
                    onChange={e => setInn(e.target.value)}
                    value={inn}
                  />
                </InputGroup>
                <Form.Label >Код региона</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Код региона"
                    aria-label="Код региона"
                    onChange={e => setRegion(e.target.value)}
                    value={region}
                  />
                </InputGroup>
                <Form.Label htmlFor="basic-organization">Родительская организация</Form.Label>
                <InputGroup className="mb-3">
                    <input ref={inputEl} onChange={handleInputChange} style={{width: '100%'}} placeholder="Название организации" />
                    {results.length > 0 && show == true && (
                        <div style={{position: 'absolute', marginTop: '2rem', width: '50%', paddingLeft: '1em', zIndex: '1'}}>
                            {results.map((result, i) => 
                                <>
                                    <button style={{border: '0', background: 'white', width: '100%', textAlign: 'left'}} onClick={() => { setOrgId(result.id); handleTintClick(result.medical_org_name, result.id)}} key={result.id}>
                                        {result.medical_org_name}
                                    </button>
                                </>
                            )}
                        </div>
                    )}
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