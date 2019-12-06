import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { clear, getGlobalUser } from '../globalLoginStateMaintain';
import { Redirect } from 'react-router-dom';
import { reqLogout } from '../api';
import './navigation.css';

const { SubMenu } = Menu;

class navigation extends React.Component {
    state = {
        current: 'mail',
        redirect: false
    };
  
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    handleLogOut = () => {
        let curUser = getGlobalUser();
        reqLogout(curUser);
        clear();
        this.setRedirect();
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
    }
  
    render() {
        return (
            <React.Fragment>
                {this.renderRedirect()}
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                    <Menu.Item key="app" disabled>
                        <Icon type="appstore" />
                        Get App
                    </Menu.Item>
                    <Menu.Item key="home">
                        <a href="/profile">
                            <Icon type="home" />
                            Home
                        </a>
                    </Menu.Item>
                    <Menu.Item key="stock">
                        <a href="/allstocks">
                            <Icon type="stock" />
                            Stocks
                        </a>
                    </Menu.Item>
                    <Menu.Item key="news">
                        <a href="https://www.foxnews.com//">
                            <Icon type="rise" />
                            News
                        </a>
                    </Menu.Item>
                    <SubMenu
                        title={
                            <span className="user-center">
                                <Icon type="crown" />
                                Member Center
                            </span>
                        }
                    >
                        <Menu.ItemGroup title="Your Account">
                            <Menu.Item key="user-profile">
                                <a href="/profile">
                                    Profile
                                </a>
                            </Menu.Item>
                            <Menu.Item key="user-bank-account">
                                <a href="/account">
                                    Bank Accounts
                                </a>
                            </Menu.Item>
                            <Menu.Item key="user-stocks">
                                <a href="/userstocks">
                                    Your Stocks
                                </a>
                            </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="Trading Center">
                            <Menu.Item key="trade-all-stocks">
                                <a href="/allstocks">
                                    All Stocks
                                </a>
                            </Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                    <Menu.Item key="alipay">
                        <a href="https://money.cnn.com/data/markets/" target="_blank" rel="noopener noreferrer">
                            CNN Business
                        </a>
                    </Menu.Item>
                    <Menu.Item key="customer-service">
                        <a href="http://www.google.com/">
                            <Icon type="smile" />
                            Customer Service
                        </a>
                    </Menu.Item>
                    <Menu.Item key="customer-service" onClick={this.handleLogOut}>
                        <Icon type="logout"/>
                        Log out
                    </Menu.Item>
                </Menu>
            </React.Fragment>
        );
    }
  }

export default navigation;