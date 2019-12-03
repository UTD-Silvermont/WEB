import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, message} from 'antd';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';
import Register from './pages/register/register';
import Navigation from './components/navigation';

function App() {


  return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/nav' component={Navigation}></Route>
          <Route path='/' component={Admin}></Route> 
        </Switch>
      </BrowserRouter>
  );
}

export default App;
