import React, {useContext, useEffect, useRef, useState} from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import * as Icon from 'react-bootstrap-icons';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import './Css/SideBar.css';
import { Navbar } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Context } from '..';
import Administration from '../Administration';
import {socket} from '../socket'

function SideBar() {
    const windowHeight = useRef(window.innerHeight);
    const { store } = useContext(Context);
    const [modalShow, setModalShow] = React.useState(false);
    const history = useHistory();

    const [expended, setExpended] = React.useState(false);

    const addTonometr =() => {
        history.push('/addTonometr')
        if (store.user.role == 4)
            socket.emit('leave', store.user.id)
    }

    const showTonometr = () => {
        history.push("/userTonometr");
        if (store.user.role == 4)
            socket.emit('leave', store.user.id)
    }

    const showMeasure = () => {
        history.push("/userMeasure")
        if (store.user.role == 4)
            socket.emit('leave', store.user.id)
    }

    const goToMain = () => {
        history.push('/')
        if (store.user.role == 4)
            socket.emit('leave', store.user.id)
    }

    const showMonitoring = () => {
        history.push('/monitoring')
        if (store.user.role == 4)
            socket.emit('leave', store.user.id)
    }

    const showAdministration = () => {
        history.push('/administration')
        if (store.user.role == 4)
            socket.emit('leave', store.user.id)
    }

    const showPersonalSettings = () => {
        history.push('/personalSettings')
        if (store.user.role == 4)
            socket.emit('leave', store.user.id)
    }


    const Logout = () => {
        store.logout();
        if (store.user.role == 4)
            socket.emit('leave', store.user.id)
    }

    const addPatient = () => {
        history.push('/addPatient')
        if (store.user.role == 4)
            socket.emit('leave', store.user.id)
    }

    const userAdmin = () => {
        history.push('/userAdmin')
        if (store.user.role == 4)
            socket.emit('leave', store.user.id)
    }
    const showTonosStat = () => {
        history.push("/tonosStat")
        if (store.user.role == 4)
            socket.emit('leave', store.user.id)
    }

    const roleAdmin = () => {
        history.push('/roleAdministration')
        if (store.user.role == 4)
            socket.emit('leave', store.user.id)
    }

    const medOrgAdmin = () => {
        history.push('/administrationMedOrg')
        if (store.user.role == 4)
            socket.emit('leave', store.user.id)
    }

    const postsAdmin = () => {
        history.push('/administrationMedPosts')
        if (store.user.role == 4)
            socket.emit('leave', store.user.id)
    }
    
    const showStatistic = () => {
        history.push('/userMeasure')
        if (store.user.role == 4)
            socket.emit('leave', store.user.id)
    }
    
    const adminDistrict = () => {
        history.push('/administrationDistricts')
        if (store.user.role == 4)
            socket.emit('leave', store.user.id)
    }

    return (
        <SideNav
            onToggle ={() => {
                if (!expended) {
                    setExpended(true)
                }
                else {
                    setExpended(false)
                }    
            }}
            style={{ backgroundColor: '#212529', minWidth: expended ? '320px' : '64px', position: 'fixed', maxHeight: windowHeight}}
            onSelect={(selected) => {
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                <NavItem className='side-bar-titles' onClick={goToMain} style={{cursor:'pointer'}}>
                    <NavIcon>
                        <Icon.HouseFill className="px-1 pb-1" size={30}/>
                    </NavIcon>
                    <NavText>Главная</NavText>
                </NavItem>
                { 
                store.user.role != 2 ? 
                    <NavItem eventKey="statistic">
                        <NavIcon>
                            <Icon.GraphUp className="px-1 pb-1" size={30}/>
                        </NavIcon>
                        <NavText>
                            Статистика
                        </NavText>
                        <NavItem onClick={showStatistic} eventKey="statistic/vrach-pacient">
                            <NavText>
                                Статистика Врач -&gt; Пациент
                            </NavText>
                        </NavItem>
                        <NavItem>
                            <NavText>
                                <div className="line"></div>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="statistic/kluch-pokazat" onClick={showMonitoring}>
                            <NavText>
                                Мониторинг ключевых показателей
                            </NavText>
                        </NavItem>
                    </NavItem>
                    :
                    <></>
                }
                { 
                store.user.role != 2 ?
                    <NavItem eventKey="distancTonom" >
                        <NavIcon>
                            <Icon.HeartPulse className="px-1 pb-1" size={30}/>
                        </NavIcon>
                        <NavText>
                            Дистанционная тонометрия
                        </NavText>
                        <NavItem eventKey="distancTonom/addPatient" onClick={addPatient}>
                            <NavText>
                                Принять пациента
                            </NavText>
                        </NavItem>
                        {/* <NavItem>
                            <NavText>
                                <div className="line"></div>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="distancTonom/pokaz-stat" onClick={showMeasure}>
                            <NavText>
                                Показать статистику измерений
                            </NavText>
                        </NavItem> */}
                    </NavItem>
                    :
                    <NavItem  eventKey="distancTonom" style={{cursor:'pointer'}}>
                        <NavIcon>
                            <Icon.HeartPulse className="px-1 pb-1" size={30}/> 
                        </NavIcon>
                        <NavText style={{lineHeight: '30px'}}>Дистанционная тонометрия</NavText>
                        <NavItem eventKey="distancTonom/pokaz-stat" onClick={showTonometr}>
                            <NavText>
                                Измерить давление
                            </NavText>
                        </NavItem>
                        <NavItem>
                            <NavText>
                                <div className="line"></div>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="distancTonom/pokaz-stat" onClick={showTonosStat}>
                            <NavText>
                                Показать статистику измерений
                            </NavText>
                        </NavItem>
                    </NavItem>
                }
                {/* Administration */}
                {
                    
                    store.user.role == 1 && 
                    <NavItem onDoubleClick={showAdministration} eventKey="administration">
                        <NavIcon>
                            <Icon.Gear className="px-1 pb-1" size={30}/>
                        </NavIcon>
                        <NavText>
                            Администрирование
                        </NavText>
                        {/* <NavItem eventKey="administration/add-patient">
                            <NavText>
                                Добавить нового пациента
                            </NavText>
                        </NavItem>
                        <NavItem>
                            <NavText>
                                <div className="line"></div>
                            </NavText>
                        </NavItem> */}
                        <NavItem onClick={userAdmin} eventKey="administration/add-patient">
                            <NavText>
                                Администрировани пациентов
                            </NavText>
                        </NavItem>
                        {/* <NavItem> !!!!!!!!!!!!!Персональные настройки
                            <NavText>
                                <div className="line"></div>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="administration/person-setting" onClick={showPersonalSettings}>
                            <NavText>
                                Персональные настройки
                            </NavText>
                        </NavItem> */}
                         {/*<NavItem>
                            <NavText>
                                <div className="line"></div>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="administration/admin-patient" onClick={showAdministration}>
                            <NavText>
                                Администрирование пациентов
                            </NavText>
                        </NavItem> */}
                    </NavItem>
                }
                {
                (store.user.role >= 3 && store.user.role < 5) && 
                    <NavItem onDoubleClick={showAdministration} eventKey="administration">
                        <NavIcon>
                            <Icon.Gear className="px-1 pb-1" size={30}/>
                        </NavIcon>
                        <NavText>
                            Администрирование
                        </NavText>
                        <NavItem onClick={addTonometr} eventKey="administration/add-patient">
                            <NavText>
                                Зарегестрировать новый тонометр
                            </NavText>
                        </NavItem>
                        <NavItem>
                            <NavText>
                                <div className="line"></div>
                            </NavText>
                        </NavItem>
                        <NavItem onClick={userAdmin} eventKey="administration/admin-patient">
                            <NavText>
                                Администрировани пользователей
                            </NavText>
                        </NavItem>

                        {/* <NavItem className='py-0'> !!!!!!!!!
                            <NavText>
                                <div className="line"></div>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="administration/person-setting" onClick={showPersonalSettings}>
                            <NavText>
                                Персональные настройки
                            </NavText>
                        </NavItem> */}

                    </NavItem>
                }
                {
                store.user.role > 4  && 
                    <NavItem onDoubleClick={showAdministration} eventKey="administration">
                        <NavIcon>
                            <Icon.Gear className="px-1 pb-1" size={30}/>
                        </NavIcon>
                        <NavText>
                            Администрирование
                        </NavText>
                        <NavItem onClick={addTonometr} eventKey="administration/add-patient">
                            <NavText>
                                Зарегестрировать новый тонометр
                            </NavText>
                        </NavItem>
                        <NavItem>
                            <NavText>
                                <div className="line"></div>
                            </NavText>
                        </NavItem>
                        <NavItem onClick={userAdmin} eventKey="administration/admin-patient">
                            <NavText>
                                Администрировани пользователей
                            </NavText>
                        </NavItem>
                        <NavItem>
                            <NavText>
                                <div className="line"></div>
                            </NavText>
                        </NavItem>
                        <NavItem onClick={medOrgAdmin} eventKey="administration/admin-medOrg">
                            <NavText>
                                Администрирование Медицинских Организаций
                            </NavText>
                        </NavItem>
                        <NavItem>
                            <NavText>
                                <div className="line"></div>
                            </NavText>
                        </NavItem>
                        <NavItem onClick={postsAdmin} eventKey="administration/admin-medPost">
                            <NavText>
                                Администрирование должностей
                            </NavText>
                        </NavItem>
                        <NavItem>
                            <NavText>
                                <div className="line"></div>
                            </NavText>
                        </NavItem>
                        <NavItem onClick={adminDistrict} eventKey="administration/admin-district">
                            <NavText>
                                Администрирование районов
                            </NavText>
                        </NavItem>

                        {/* <NavItem className='py-0'> !!!!!!!!!
                            <NavText>
                                <div className="line"></div>
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="administration/person-setting" onClick={showPersonalSettings}>
                            <NavText>
                                Персональные настройки
                            </NavText>
                        </NavItem> */}

                    </NavItem>
                }
                {/* { 
                store.user.role != 2 ?
                    <NavItem  eventKey="administartion" style={{cursor:'pointer'}} onDoubleClick={showAdministration}>
                        
                        <NavIcon>
                            <Icon.Gear className="px-1 pb-1" size={30}/>
                        </NavIcon>
                        <NavText>Администрирование</NavText>
                        <NavItem eventKey="administartion/addPatient" onClick={addPatient}>
                            <NavText>
                                Добавить нового пациента
                            </NavText>
                        </NavItem>
                    </NavItem>
                    :
                    <></>
                } */}
                <NavItem style={{cursor:'pointer', position: 'absolute', bottom: '10px'}} onClick={Logout}>
                    <NavIcon>
                        <Icon.Escape className="px-1 pb-1" size={30}/>
                    </NavIcon>
                    <NavText>Выйти</NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    )
}

export default SideBar