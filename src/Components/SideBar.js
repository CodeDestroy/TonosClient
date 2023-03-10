import React, {useContext} from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import * as Icon from 'react-bootstrap-icons';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Navbar } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Context } from '..';
function SideBar() {
    const { store } = useContext(Context);
    const [modalShow, setModalShow] = React.useState(false);
    const history = useHistory();

    const [expended, setExpended] = React.useState(false);

    const showTonometr = () => {
        history.push("/userTonometr");
    }

    const showMeasure = () => {
        history.push("/userMeasure")
    }

    const goToMain = () => {
        history.push('/')
    }

    const showMonitoring = () => {
        history.push('/monitoring')
    }

    const showAdministration = () => {
        history.push('/administration')
    }


    const Logout = () => {
        store.logout();
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
            style={{ backgroundColor: '#212529', minWidth: expended ? '280px' : '64px'}}
            onSelect={(selected) => {
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                <NavItem onClick={goToMain} style={{cursor:'pointer'}}>
                    <NavIcon>
                        <Icon.HouseFill className="px-1 pb-1" size={30}/>
                    </NavIcon>
                    <NavText>Главная</NavText>
                </NavItem>
                { 
                store.user.is_admin ? 
                    <NavItem eventKey="statistic">
                        <NavIcon>
                            <Icon.GraphUp className="px-1 pb-1" size={30}/>
                        </NavIcon>
                        <NavText>
                            Статистика
                        </NavText>
                        <NavItem eventKey="statistic/vrach-pacient">
                            <NavText>
                                Статистика Врач -&gt; Пациент
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
                store.user.is_admin ?
                    <NavItem eventKey="distancTonom" >
                        <NavIcon>
                            <Icon.HeartPulse className="px-1 pb-1" size={30}/>
                        </NavIcon>
                        <NavText>
                            Дистанционная тонометрия
                        </NavText>
                        <NavItem eventKey="distancTonom/izmerit-davlen" onClick={showTonometr}>
                            <NavText>
                                Измерить давление пациенту
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="distancTonom/pokaz-stat" onClick={showMeasure}>
                            <NavText>
                                Показать статистику измерений
                            </NavText>
                        </NavItem>
                    </NavItem>
                    :
                    <NavItem style={{cursor:'pointer'}} onClick={showTonometr}>
                        <NavIcon>
                            <Icon.HeartPulse className="px-1 pb-1" size={30}/>
                        </NavIcon>
                        <NavText>Дистанционная тонометрия</NavText>
                    </NavItem>
                }
                { 
                store.user.is_admin ?
                    <NavItem style={{cursor:'pointer'}}>
                        <NavIcon>
                            <Icon.Gear className="px-1 pb-1" size={30}/>
                        </NavIcon>
                        <NavText>Администрирование</NavText>
                    </NavItem>
                    :
                    <></>
                }
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