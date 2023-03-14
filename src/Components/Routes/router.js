import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Mainpage from '../../Mainpage';
import UserTonos from '../../UserTonos';
import Monitoring from '../../Monitoring';
import Administration from '../../Administration';
import UserTonosMonitoring from '../../UserTonosMonitoring';
import AddPatient from '../../AddPatient';
import AdministrationUsers from '../../AdministrationUsers';

function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Mainpage}/>
            <Route exact path="/userTonometr" component={UserTonos}/>
            <Route exact path="/monitoring" component={Monitoring}/>
            <Route exact path="/administration" component={Administration}/>
            <Route exact path="/userMeasure" component={UserTonosMonitoring}/>
            <Route exact path="/addPatient" component={AddPatient}/>
            <Route exact path="/userAdmin" component={AdministrationUsers}/>
        </Switch>
      </BrowserRouter>
    </>
    
  )
}

export default Router