import React, { Component } from 'react';
import LoginForm from './login_form';
import './login.css';


/*
    For login
*/

class Login extends Component {
    render() {
        return (
            <div className="login">
                <section className="login-content">
                    <div id="form">
                        <div className="login-left-column">
                            <img src="../../images/login_company_logo.png" alt="logo" />
                        </div>
                        <div className="login-right-column">
                            <LoginForm />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Login;