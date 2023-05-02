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
import PatientStatistic from "../../PatientStatistic"
import RoleAdministration from '../../RoleAdministration'
import AdministrationMedOrg from '../../AdministrationMedOrg'
import AdministrationMedPosts from '../../AdministrationMedPosts'
import AdministrationDistricts from '../../AdministrationDistricts'

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
            <Route exact path="/patientStatistic" component={PatientStatistic}/>
            <Route exact path="/roleAdministration" component={RoleAdministration}/>
            <Route exact path="/administrationMedOrg" component={AdministrationMedOrg}/>
            <Route exact path="/administrationMedPosts" component={AdministrationMedPosts}/>
            <Route exact path="/administrationDistricts" component={AdministrationDistricts}/>
            
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