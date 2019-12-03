import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

class navigation extends React.Component {
    state = {
        current: 'mail',
    };
  
    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };
  
    render() {
        return (
            <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                <Menu.Item key="app" disabled>
                    <Icon type="appstore" />
                    Get App
                </Menu.Item>
                <Menu.Item key="home">
                    <a href="http://www.google.com/">
                        <Icon type="home" />
                        Home
                    </a>
                </Menu.Item>
                <Menu.Item key="stock">
                    <a href="http://www.google.com/">
                        <Icon type="stock" />
                        Stocks
                    </a>
                </Menu.Item>
                <Menu.Item key="news">
                    <a href="http://www.google.com/">
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
                            <a href="http://www.google.com/">
                                Profile
                            </a>
                        </Menu.Item>
                        <Menu.Item key="user-bank-account">
                            <a href="http://www.google.com/">
                                Bank Account
                            </a>
                        </Menu.Item>
                        <Menu.Item key="user-stocks">
                            <a href="http://www.google.com/">
                                Your Stocks
                            </a>
                        </Menu.Item>
                        <Menu.Item key="usere-interests">
                            <a href="http://www.google.com/">
                                Stock Interested
                            </a>
                        </Menu.Item>
                        <Menu.Item key="user-shopping-carts">
                            <a href="http://www.google.com/">
                                Shopping Cart
                            </a>
                        </Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup title="Trading Center">
                        <Menu.Item key="trade-all-stocks">
                            <a href="http://www.google.com/">
                                All Stocks
                            </a>
                        </Menu.Item>
                        <Menu.Item key="trade-popular">
                            <a href="http://www.google.com/">
                                Popular
                            </a>
                        </Menu.Item>
                        <Menu.Item key="trade-unicorn">
                            <a href="http://www.google.com/">
                                Unicorn
                            </a>
                        </Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                <Menu.Item key="alipay">
                    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                        Navigation Four - Link
                    </a>
                </Menu.Item>
                <Menu.Item key="customer-service">
                    <a href="http://www.google.com/">
                        <Icon type="smile" />
                        Customer Service
                    </a>
                </Menu.Item>
            </Menu>
        );
    }
  }

export default navigation;