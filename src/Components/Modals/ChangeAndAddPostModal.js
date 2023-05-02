import { InputGroup, Form, Button, Modal } from 'react-bootstrap'
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import TonosService from '../../services/TonosService'
import AdminService from '../../services/AdminService';
import debounce from 'lodash/debounce';

function ChangeAndAddPostModal(props) {
  
    const [show, setShow] = useState(true)
    const inputEl = useRef(null);
    const inputElPost = useRef(null);
    const [medPostName, setMedPostName] = useState(props.medpost ? props.medpost[0].med_post_name : '')

    const [parentOrgId, setOrgId] = useState(props.medpost ? props.medpost[0].medical_org_id : '')

    const [showPost, setShowPost] = useState(true)
    const [posts, setPosts] = useState([])
    const [id, setId] = useState(props.medpost ? props.medpost[0].id : 0)
    const [postId, setPostId] = useState(props.medpost ? props.medpost[0].parent_id : '')

    useEffect(() => {
        if (inputEl.current) {
            if (props.medpost)
                TonosService.getMedOrgById(props.medpost[0].medical_org_id).then((results) => {
                    inputEl.current.value = results.data.medical_org_name;
                    TonosService.getMedPostById(props.medpost[0].parent_id).then((results) => {
                        inputElPost.current.value = results.data.med_post_name;
                    })
                })
            else
                inputEl.current.value = '';
        }
    }, [props])

    const [results, setResults] = useState([]);

    const [error, setError] = useState('')

    const handleTintClick = useCallback((value, id) => {
        setShow(false)
        setPostId(null)
        inputEl.current.value = value;
      }, [inputEl]);
    
      const handleInputChange = useMemo(() => debounce(async e => {
        const { value } = e.target;
        setShowPost(false)
        if (value.length < 3) return;
    
        const results = await TonosService.getMedOrg(value);
        setResults(results.data)
        setShow(true)
      }, 800), []);
    
    
      const handleTintClickPost = useCallback((value, id) => {
        setShowPost(false)
        setPostId(id)
        inputElPost.current.value = value;
      }, [inputEl]);
    
      const handleInputChangePost = useMemo(() => debounce(async e => {
        const { value } = e.target;
    
        if (value.length < 3) return;
        
        if (parentOrgId != null) {
          const results = await TonosService.getPostByOrgId(value, parentOrgId);
    
          setPosts(results.data)
          setShowPost(true)
        }
        else {
          setError('Сначала выберите медицинскую организацию!')
        }
        
        
      }, 800), [parentOrgId]);

    const close = () => {
        props.onHide();
    }
    const saveChanges = () => {
        console.log(id, postId)
        AdminService.saveOrAddPost(id, medPostName, postId, parentOrgId)
        .then((result) => {
            if (result.data.message) {
                setError(result.data.message)
            }
            else {
                alert('Изменения сохранены')
                props.onHide()
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
            <Modal.Title>{!props.medorg ? 'Создать' : 'Изменить'} медицинскую организацию</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                {error.length > 0 && <h4 style={{color: 'red'}}>{error}</h4>}  
                <Form.Label >Название должности</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Должность"
                    aria-label="Должность"
                    onChange={e => setMedPostName(e.target.value)}
                    value={medPostName}
                  />
                </InputGroup>
                <Form.Label htmlFor="basic-organization">Организация</Form.Label>
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
                <Form.Label htmlFor="basic-dolzhnost">Родительская должность</Form.Label>
                <InputGroup className="mb-3">
                  <input ref={inputElPost} onChange={handleInputChangePost} style={{width: '100%'}} placeholder="Должность" />
                  {posts.length > 0 && showPost == true && parentOrgId && (
                    <div style={{position: 'absolute', marginTop: '2rem', width: '50%', paddingLeft: '1em', zIndex: '1'}}>
                      {posts.map((result, i) => 
                        <>
                          <button style={{border: '0', background: 'white', width: '100%', textAlign: 'left'}} onClick={() => handleTintClickPost(result.med_post_name, result.id)} key={result.id}>
                            {result.med_post_name}
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

export default ChangeAndAddPostModal