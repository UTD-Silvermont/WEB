import React, { Component } from 'react';
import Nav from '../../components/navigation';
import Header from './accountHeader';
import Bank from './bankAccount';
import Change from './change';
import './account.css';

class account extends Component {

    render() {
        return (
            <div>
                <Nav />
                <div className="account-box">
                    <Header />
                    <h1>Your default purchase accounts</h1>
                    <div className="account-content">
                        <Bank accountType/>
                        <Bank accountType/>
                    </div>
                    <Change />
                </div>
            </div>
        );
    }
}

export default account;