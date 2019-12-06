import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, message} from 'antd';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';
import Register from './pages/register/register';
import Navigation from './components/navigation';
import Profile from './pages/profile/profile';
import Account from './pages/account/account';
import AddAccount from './pages/account/addAccount';
import AllStocks from './pages/stock/StockList';
import UserStock from './pages/stock/StockUserList';
import StockDetail from './pages/stock/StockDisplay';
import BuyStock from './pages/stock/StockBuy';
import SellStock from './pages/stock/StockSell';

class App extends Component {

  globalUserName(user){
    this.setState({
      globalUser: user
    })
    console.log('from app.js')
    console.log(this.state.globalUser);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path='/account' component={Account}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/profile' component={Profile}></Route>
          <Route path='/addaccount' component={AddAccount}></Route>

          <Route path='/allstocks' component={AllStocks}></Route>
          <Route path='/userstocks' component={UserStock}></Route>s
          <Route path='/stockdetail/:symbol' component={StockDetail}></Route>
          <Route path='/stockbuy' component={BuyStock}></Route>
          <Route path='/stocksell' component={SellStock}></Route>

        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;