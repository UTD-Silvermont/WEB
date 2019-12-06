import React from 'react';
import LineChart from './LineChart';
import 'antd/dist/antd.css';
import { Button, Row, Col, Statistic, Icon } from 'antd';
import axios from 'axios'
import {Redirect} from 'react-router-dom';
import qs from 'querystring'
import { setStockSym } from '../../globalLoginStateMaintain';
import Nav from '../../components/navigation';

class StockDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 'current-week', current: {}, redirect: false};
        this.handleChange = this.handleChange.bind(this);
        setStockSym(this.props.match.params.symbol);
    }

    setRedirect = () => {
        this.setState({redirect: true});
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/stockbuy' />
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value, current: this.state.current});
        this.forceUpdate();
    }

    start = () => {
        this.setState({redirect: true});
    }

    componentDidMount(){
        var data = {
            'symbol': this.props.match.params.symbol
        };
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        //var content = qs.stringify(data);
        axios.get('https://silvermont-market-user.herokuapp.com/stock/v1/current/', data, config)
            .then(response => {
                return response;
            })
            .then(obj => {
                console.log(JSON.stringify(obj));
                this.setState({value: this.state.value, current: obj});
            })
    }

    render() {
        let display;
        if(this.state.current.change_pct >= 0) {
            display = (<Statistic
                title="Day Change"
                value={this.state.current.change_pct}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon type="arrow-up" />}
                suffix="%"
              />);
        }
        else {
            display = (
            <Statistic
            title="Day Change"
            value={this.state.current.change_pct}
            precision={2}
            valueStyle={{ color: '#cf1322' }}
            prefix={<Icon type="arrow-down" />}
            suffix="%"
          />);
        }
        return (
                <div>
                    {this.renderRedirect}
                    <Nav />
                    <Row>
                        <Col span={1}></Col>
                        <h1>{this.state.current.name}</h1>
                    </Row>
                    <Row>
                    <Col span={1}></Col>
                    <Col span={4}><Statistic title="Current Price (USD)" value={this.state.current.price} /></Col>
                    <Col span={1}></Col>
                    <Col span={6}>{display}</Col>
                    </Row>
                    <hr></hr>
                    <Row></Row>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={3}><select value={this.state.value} onChange={this.handleChange}>
                            <option value="current-week">Current Week</option>
                            <option value="past-week">Past Week</option>
                            <option value="month-to-date">Month-to-date</option>
                            <option value="year-to-date">Year-to-date</option>
                            <option value="past-5-years">Past-5-years</option>
                        </select></Col>
                        <Col span={17}></Col>
                        <Button type="primary" 
                            onClick={this.start}
                            className="r-button">Buy
                        </Button>
                    </Row>
                    <LineChart fun={this.state.value} symbol={this.props.match.params.symbol}></LineChart>
                </div>
        )
    }
}
export default StockDisplay;