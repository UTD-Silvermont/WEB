import React, { Component } from 'react';
import './login.css';
import LoginForm from './login_form';


/*
    For login
*/

class Login extends Component {
    render() {
        return (
            <div className="login">
                <section className="login-content">
                    <div id="form">
                        <h2>User Login</h2>
                        <LoginForm />
                    </div>
                </section>
                <footer>

                </footer>
            </div>
        );
    }
}

export default Login;