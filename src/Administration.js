import React, { useContext, useEffect, useState } from 'react'
import Header from './Components/Header'
import { Container, Row, Col } from 'react-bootstrap'
import { height } from '@mui/system'
import { useHistory } from "react-router-dom";
import {Button, ButtonGroup, Box, Typography, Popover  } from '@mui/material/';
import { Context } from '.';

function Administration() {
  const { store } = useContext(Context);
  const history = useHistory();
  const showUserAdmin = () => {
    history.push("/userAdmin");
  }

  const addTonometr =() => {
    history.push('/addTonometr')
  }

  const medOrgAdmin = () => {
    history.push('/administrationMedOrg')
  }
  const postsAdmin = () => {
    history.push('/administrationMedPosts')
  }
  const adminDistrict = () => {
    history.push('/administrationDistricts')
  }

  const [anchorTonometrEl, setAnchorTonometrEl] = React.useState(null);

  const handlePopoverTonometrOpen = (event) => {
    setAnchorTonometrEl(event.currentTarget);
  };

  const handlePopoverTonometrClose = () => {
    setAnchorTonometrEl(null);
  };

  const openTonometr = Boolean(anchorTonometrEl);

  const [anchorUserEl, setAnchorUserEl] = React.useState(null);

  const handlePopoverUserOpen = (event) => {
    setAnchorUserEl(event.currentTarget);
  };

  const handlePopoverUserClose = () => {
    setAnchorUserEl(null);
  };

  const openUser = Boolean(anchorUserEl);

  const [anchorMOEl, setAnchorMOEl] = React.useState(null);

  const handlePopoverMOOpen = (event) => {
    setAnchorMOEl(event.currentTarget);
  };

  const handlePopoverMOClose = () => {
    setAnchorMOEl(null);
  };

  const openMO = Boolean(anchorMOEl);

  const [anchorPostEl, setAnchorPostEl] = React.useState(null);

  const handlePopoverPostOpen = (event) => {
    setAnchorPostEl(event.currentTarget);
  };

  const handlePopoverPostClose = () => {
    setAnchorPostEl(null);
  };

  const openPost = Boolean(anchorPostEl);

  const [anchorDistrictEl, setAnchorDistrictEl] = React.useState(null);

  const handlePopoverDistrictOpen = (event) => {
    setAnchorDistrictEl(event.currentTarget);
  };

  const handlePopoverDistrictClose = () => {
    setAnchorDistrictEl(null);
  };

  const openDistrict = Boolean(anchorDistrictEl);
  
  const [buttons, setButtons] = useState([])

  useEffect(() => {
    if (store.user.role > 4) {
      const buttons = [
        <Button 
          className="my-3"
          size="large"
          onMouseEnter={handlePopoverTonometrOpen}
          onMouseLeave={handlePopoverTonometrClose} 
          onClick={addTonometr}>
            Зарегестрировать новый тонометр
        </Button>,
        <Button 
          className="my-3" 
          size="large" 
          onClick={showUserAdmin}
          onMouseEnter={handlePopoverUserOpen}
          onMouseLeave={handlePopoverUserClose}>
            Админитрование пользователей</Button>,
        <Button   
          className="my-3" 
          size="large" 
          onClick={medOrgAdmin}
          onMouseEnter={handlePopoverMOOpen}
          onMouseLeave={handlePopoverMOClose}>
            Администрирование Медицинских Организаций</Button>,
        <Button 
          className="my-3" 
          size="large" 
          onClick={postsAdmin}
          onMouseEnter={handlePopoverPostOpen}
          onMouseLeave={handlePopoverPostClose}>
            Администрирование должностей</Button>,
        <Button 
          className="my-3" 
          size="large" 
          onClick={adminDistrict} 
          onMouseEnter={handlePopoverDistrictOpen}
          onMouseLeave={handlePopoverDistrictClose}>
            Администрирование районов</Button>,
      ];
      setButtons(buttons)
    }
    else if (store.user.role == 1) {
      const buttons = [
        <Button 
          className="my-3" 
          size="large" 
          onClick={showUserAdmin}
          onMouseEnter={handlePopoverUserOpen}
          onMouseLeave={handlePopoverUserClose}>
            Админитрование пользователей</Button>,
      ];
      setButtons(buttons)
    }
    else if (store.user.role >= 3 && store.user.role < 5) {
      const buttons = [
        <Button 
          className="my-3"
          size="large"
          onMouseEnter={handlePopoverTonometrOpen}
          onMouseLeave={handlePopoverTonometrClose} 
          onClick={addTonometr}>
            Зарегестрировать новый тонометр
        </Button>,
        <Button 
          className="my-3" 
          size="large" 
          onClick={showUserAdmin}
          onMouseEnter={handlePopoverUserOpen}
          onMouseLeave={handlePopoverUserClose}>
            Админитрование пользователей</Button>,
      ];
      setButtons(buttons)
    }
  }, [store])

  


  return (
    <>
        <Header/>
            {/*  */}
        <Container style={{paddingLeft: '72px', marginTop: '8rem'}}>
          <Typography variant="h3">
            Администрирование
          </Typography>
          <Col lg={6} md={6} sm={6}>
            <Box
              sx={{
                display: 'flex',
                '& > *': {
                  m: 2,
                },
                marginTop: '1rem',
              }}
            >
              
              <ButtonGroup
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="text"
              >
                {buttons}
              </ButtonGroup>
            </Box>
          </Col>
          <Col lg={6} md={6} sm={6}>
            <Box
              sx={{
                display: 'flex',
                '& > *': {
                  m: 2,
                },
                marginTop: '1rem',
              }}
            >
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={openTonometr}
                anchorEl={anchorTonometrEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                style={{width: '80%', marginLeft: '5rem'}}
                onClose={handlePopoverTonometrClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>Регистрация в базе данных нового тонометра. Будте внимательны и правильно вводите серийный номер устройства!</Typography>
              </Popover>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={openUser}
                anchorEl={anchorUserEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                style={{width: '80%', marginLeft: '5rem'}}
                onClose={handlePopoverUserClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>Администрирование пациентов и других пользователей системы. </Typography>
              </Popover>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={openMO}
                anchorEl={anchorMOEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                style={{width: '80%', marginLeft: '5rem'}}
                onClose={handlePopoverMOClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>Администрирование медицинских учреждений (добавление и изменение) , подключённых к системе.</Typography>
              </Popover>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={openPost}
                anchorEl={anchorPostEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                style={{width: '80%', marginLeft: '5rem'}}
                onClose={handlePopoverPostClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>Администрирование должностей (добавление и изменение) у медицинских организаций.</Typography>
              </Popover>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={openDistrict}
                anchorEl={anchorDistrictEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                style={{width: '80%', marginLeft: '5rem'}}
                onClose={handlePopoverDistrictClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>Администрирование райнов (добавление и изменение).</Typography>
              </Popover>
            </Box>
          </Col>
          
          
          {/* <Button variant="primary" className ="my-3">Персональные настройки</Button>
          <Button variant="primary" className ="my-3" onClick={showUserAdmin}>Админитрование пользователей</Button>
          <Button variant="primary" className ="my-3">Администрирование ролей пользователей</Button>
          <Card style={{ width: '18rem', height: '20rem' }} className ="my-5">
            <Card.Body>
              <Row className="d-flex my-5 align-items-center justify-content-center">
                
              </Row>
                      <Card.Link href="#">Card Link</Card.Link>
                      <Card.Link href="#">Another Link</Card.Link> 
            </Card.Body>
          </Card> */}
        </Container>
            
    </>
  )
}

export default Administration
