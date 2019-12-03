import React, { Component } from 'react';
import RegistrationForm from './registration_form';
import './register.css';

class register extends Component {
    render() {
        return (
            <section className="reg-form">
                <RegistrationForm />
            </section>
        );
    }
}

export default register;