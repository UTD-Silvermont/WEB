import React from 'react';
import { Table, Button, Input, Icon, InputNumber, Row, Col, Checkbox, Card } from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { getStockSym, getGlobalUser } from '../../globalLoginStateMaintain';
import Nav from '../../components/navigation';

class StockBuy extends React.Component {
    state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      data: [],
      num: 0,
      check: false,
      every: 0,
      limit: 0,
      redirect: false
    };

    setRedirect = () => {
        this.setState({redirect: true});
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/userstocks' />
        }
    }

    start = () => {
        var param = {
            username: getGlobalUser(),
            symbol: getStockSym(),
            quantity: this.state.num
        };
        if(this.state.check)
        {
            var recur = {
                every: this.state.every,
                limit: this.state.limit
            };
            param.recur = recur;
            var url = "https://silvermont-market-user.herokuapp.com/stock/buy/recur";
        }
        else
        {
            var url = "https://silvermont-market-user.herokuapp.com/stock/buy/one";
        }
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          };
        axios.post(url, param, config)
        .then(response => {
            if(response.success)
            {
                alert("Buying stock succeeded!");
                this.setState({redirect: true});
            }
            else
            {
                alert("Buying stock failed!");
            }
        })
    }

    componentDidMount(){
      console.log("get stock list");
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      const param = {symbol: getGlobalUser()};
      axios.get('https://silvermont-market-user.herokuapp.com/stock/v1/current', param, config)
          .then(response => {
              console.log(response);
              var obj = response;
              var data = [];
              data.push({"key":"0","symbol": obj.symbol, "name": obj.name, "price": obj.price});
              
              //console.log(options);
              
              console.log(data);
              this.setState({data: data});
          })
          //var data = [{"key":"0","symbol":"AAPL", "name": "Apple Inc", "price": "231"}];
          //this.setState({data: data});
  }
  
    onNumChange = value => {
        this.setState({num: value});
    }

    onSelectChange = e => {
        this.setState({check: e.target.checked});
    }
  
    onSchNumChange = value => {
        this.setState({every: value});
    }

    onSchLimChange = value => {
        this.setState({limit: value});
    }

    render() {
      const columns = [
        {
            title: 'Symbol',
            dataIndex: 'symbol',
        },
        {
            title: 'Name',
            dataIndex: 'name',

        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
          title: 'Action',
          render: (text, record) => (
              <span>
                  <InputNumber min={1} max={10000} defaultValue={1} onChange={this.onNumChange}></InputNumber>
              </span>
          ),
         }
      ];

      let schedule;
      if(this.state.check)
      {
          schedule = (
              <Card title="Schedule" style={{ width: 300 }}>
                <table>
                    <tbody>
                    <tr>
                        <td>Time(ms):</td>
                        <td><InputNumber size="large" min={1} max={1000000} defaultValue={1} onChange={this.onSchNumChange}></InputNumber></td>
                    </tr>
                    <tr>
                        <td>Limit:</td>
                        <td><InputNumber size="large" min={1} max={1000000} defaultValue={1} onChange={this.onSchLimChange}></InputNumber></td>
                    </tr>
                    </tbody>
                </table>
              </Card>
          );
      }
      else schedule = (<br></br>);

      return (
        <div>
          {this.renderRedirect}
          <Nav />
          <Table pagination={false} columns={columns} dataSource={this.state.data} />
          <br></br>
          Schedule
          <Checkbox onChange={this.onSelectChange}></Checkbox>
          {schedule}
          <Row>
              <Col span={20}></Col>
              <Button type="primary" onClick={this.start}>
              Submit
            </Button>
          </Row>
        </div>
      );
    }
  }
  
export default StockBuy;