import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, { Component } from 'react';
import './login_form.css';

class LoginForm extends Component {

    handleSubmit = (event) => {
        
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        return (
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        <br />
                        {
                            getFieldDecorator('username', {
                                rules: [{ required: true, message: 'User name required!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />
                            )
                        }
                        <br />
                    </Form.Item>
                    <Form.Item>
                        <br />
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        /><br />
                    </Form.Item>
                    <Form.Item>
                        <br />
                        <Checkbox>Remember me</Checkbox>
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a><br />
                        <br />
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
        );
    }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default LoginForm;