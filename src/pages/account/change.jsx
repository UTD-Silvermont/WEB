import React, { Component } from 'react';
import { Button } from 'antd';

class change extends Component {
    render() {
        return (
            <div className="buttons">
                <Button type="primary" block>
                    Add one account
                </Button>
                <Button type="dashed" block>
                    Change account
                </Button>
                <Button type="danger" block>
                    Delete account
                </Button>
                <Button type="link" block>
                    Terms & Agreements
                </Button>
            </div>
        );
    }
}

export default change;