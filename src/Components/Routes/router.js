import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Mainpage from '../../Mainpage';
import UserTonos from '../../UserTonos';
import Monitoring from '../../Monitoring';
import Administration from '../../Administration';
import UserTonosMonitoring from '../../UserTonosMonitoring';

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
        </Switch>
      </BrowserRouter>
    </>
    
  )
}

export default Router