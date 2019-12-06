import React, { Component } from 'react';
import { Descriptions } from 'antd';
import Nav from '../../components/navigation';
import ProfileHeader from './profileHeader';
import { reqProfile } from '../../api';
import { getGlobalUser, isLoggedIn } from '../../globalLoginStateMaintain';
import { Redirect } from 'react-router-dom';
import './profile.css';

class profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
        }

        console.log(isLoggedIn());
    
        if(!isLoggedIn){
            this.setState({
                redirect: true,
            })
        }

        let user = getGlobalUser();
        this.getFillingData(user);
    }

    getFillingData(user){
        console.log(reqProfile(user));
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
            <div className="profile">
                {this.renderRedirect()}
                <Nav />
                <section className="profile-header">
                    <ProfileHeader />
                </section>
                <section className="user-info">
                    <Descriptions title="User Info">
                        <Descriptions.Item label="UserName">User</Descriptions.Item>
                        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                        <Descriptions.Item label="Remark">empty</Descriptions.Item>
                        <Descriptions.Item label="Address">
                            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                        </Descriptions.Item>
                    </Descriptions>
                </section>
            </div>
        )
    }
}

export default profile;