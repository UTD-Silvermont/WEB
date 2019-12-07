import React from 'react';

import 'echarts/lib/chart/line'

import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'
import Nav from '../../components/navigation';

import axios from 'axios';

import qs from 'qs';

class LineChart extends React.Component {
    constructor(props){
        super(props);
        this.state = {xAxis: [], data: [], symbol: this.props.symbol, fun: this.props.fun};
    }

    componentDidMount(){
        var data = {
            'interval': '5',
            'symbol': this.props.symbol
        };
        var test = {
            "username": "abc"
        };
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };
        axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        var url = "https://silvermont-market-user.herokuapp.com/stock/v1/" + this.state.fun;
        //console.log(option);
        //var content = qs.stringify(data);
        axios.get('https://silvermont-market-user.herokuapp.com/stock/v1/' + this.state.fun, data, config)
        //axios.get(option)
            .then(response => {
                console.log(response);
                return response.data;
            })
            .then(obj => {
                console.log(JSON.stringify(obj)); 
                var xAxis = this.state.xAxis.slice();
                var data = this.state.xAxis.slice();
                for(var t in obj.history)
                {
                    xAxis.push(t);
                    data.push(obj.history[t].close);
                }
                this.setState({xAxis: xAxis, data: data, symbol: this.props.symbol, fun: this.props.fun});
                console.log(xAxis);
                console.log(data);
            })
    }

    componentWillReceiveProps(nextProps) {
        var data = {
            'interval': '5',
            'symbol': nextProps.symbol
        };
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        //var content = qs.stringify(data);
        axios.get('https://silvermont-market-user.herokuapp.com/stock/v1/'+ nextProps.fun, data, config)
            .then(response => {
                return response.data;
            })
            .then(obj => {
                console.log(JSON.stringify(obj)); 
                var xAxis = [];
                var data = [];
                for(var t in obj.history)
                {
                    xAxis.push(t);
                    data.push(obj.history[t].close);
                }
                this.setState({xAxis: xAxis, data: data, symbol: nextProps.symbol, fun: nextProps.fun});
                console.log(xAxis);
                console.log(data);
            })
    }

    getOption = ()=>{
        let option = {
            title: {  
                text: this.props.symbol,
                x: 'center',
                textStyle: { 
                    color: '#ccc'
                }
            },
            tooltip:{ 
                trigger: 'axis'
            },
            xAxis: { 
                data: this.state.xAxis, //x value
                show: false
            },
            yAxis: {
                type: 'value',
                min: 'dataMin',
                axisLabel: {formatter:'${value}'}
            },
            series : [
                {
                    name:'Price', 
                    type:'line', 
                    data: this.state.data //y value
                }
            ]
        }
        return option;
    }

    render() {
        return (
            <React.Fragment>
                <Nav />
                <ReactEcharts option={this.getOption()} theme="ThemeStyle" />
            </React.Fragment>
        )
    }
}

export default LineChart;
