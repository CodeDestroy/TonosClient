import React, { useEffect ,useContext } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Mainpage from '../../Mainpage';
import UserTonos from '../../UserTonos';
import Monitoring from '../../Monitoring';
import Administration from '../../Administration';
import UserTonosMonitoring from '../../UserTonosMonitoring';
import AddPatient from '../../AddPatient';
import AdministrationUsers from '../../AdministrationUsers';
import AddTonometr from '../../AddTonometr';
import PersonalSettings from '../../PersonalSettings';
import { Context } from '../..';
import TonosStat from '../../TonosStat';

function Router() {
  const { store } = useContext(Context);
  useEffect (() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store])
  return (
    <>
      <BrowserRouter>
      { store.user.role != 2 ?
        <Switch>
            <Route exact path="/" component={Mainpage}/>
            {/* <Route exact path="/userTonometr" component={UserTonos}/> */}
            <Route exact path="/userMeasure" component={UserTonosMonitoring}/>
            <Route exact path="/monitoring" component={Monitoring}/>
            <Route exact path="/administration" component={Administration}/>
            <Route exact path="/addPatient" component={AddPatient}/>
            <Route exact path="/userAdmin" component={AdministrationUsers}/>
            <Route exact path='/addTonometr' component={AddTonometr}/>
            <Route exact path="/personalSettings" component={PersonalSettings}/>  
        </Switch>
        :
        <Switch>
            <Route exact path="/" component={Mainpage}/>
            <Route exact path="/userTonometr" component={UserTonos}/>
            <Route exact path="/tonosStat" component={TonosStat}/>
        </Switch>
      }
      </BrowserRouter>
    </>
    
  )
}

export default Router