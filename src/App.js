import './Components/Css/App.css';
import { observer } from 'mobx-react-lite';
import { useState, useContext, useEffect } from 'react';
import Router from './Components/Routes/router';
import { Context } from './';
import Login from './Components/Login';

function App() {

  const { store } = useContext(Context);


  useEffect ( () => {
    
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store])


  return (
    
    <>
      { !store.isAuth ?
        <Login/>
        :
        <Router/>
      } 
    </>
  )
}

export default observer(App);
