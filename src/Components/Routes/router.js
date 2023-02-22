import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Mainpage from '../../Mainpage';
import UserTonos from '../../UserTonos';
import Monitoring from '../../Monitoring';

function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Mainpage}/>
            <Route exact path="/userTonometr" component={UserTonos}/>
            <Route exact path="/monitoring" component={Monitoring}/>
        </Switch>
      </BrowserRouter>
    </>
    
  )
}

export default Router