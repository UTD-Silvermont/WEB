import React, { Component } from 'react';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd';

import { reqReg } from '../../api';
import { Redirect } from 'react-router-dom';
import Nav from '../../components/navigation';
import './addAccount.css';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class addAccount extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        redirect: false
    };

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/account' />
        }
    }
    
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { username, password, email, address } = values;
                reqReg(username, password, email, address)
                .then( val => {
                    // 成功， 跳转accountyemian
                    this.setRedirect();
                })
            }
            else{

            }
        });
    };
    
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    
    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
    
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+1</Option>
                <Option value="87">+86</Option>
            </Select>,
        );
    
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
    
        return (
            <React.Fragment>
                {this.renderRedirect()}
                <Nav />
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <h1>Add new bank account</h1>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                Username&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Address">
                        {getFieldDecorator('address', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Address required!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout} className="btwo">
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>
                                I have read the <a href="">agreement</a>
                            </Checkbox>,
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout} className="btwo">
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </React.Fragment>
        );
      }
    }
    
const WrappedRegistrationForm = Form.create({ name: 'register' })(addAccount);

export default WrappedRegistrationForm;