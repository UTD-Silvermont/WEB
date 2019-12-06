import React from 'react';
import { Table, Button, Input, Icon } from 'antd';
import axios from 'axios'
import {Redirect} from 'react-router-dom';
import { getGlobalUser } from '../../globalLoginStateMaintain';
import Nav from '../../components/navigation';

class StockUserList extends React.Component {
    state = {
      data: [],
      searchText: '',
      searchedColumn: '',
    };
  
    getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select());
        }
      },
    });
  
    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };

    componentDidMount(){
      console.log("get user stock list");
      const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
      };
      const param = {
          username: getGlobalUser()
      };

      axios.get('https://silvermont-market-user.herokuapp.com/stock/user/all', param, config)
          .then(response => {
              console.log(response);
              console.log(response.data.stocks);
              var obj = response.data.stocks;
              var param = [];
              for(var t in obj)
              {
                param.push({"symbol": obj[t].symbol});
              }
              var data = {"data": param};
              //var data = {data: [{"symbol":"AAPL"}]};
              console.log(data);
              //console.log(options);
              const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
              axios.post("https://silvermont-market-user.herokuapp.com/stock/v1/current-list", data, config)
              .then(reponse => {
                return reponse.data;
              })
              .then(list => {
                for(var t in obj)
                {
                    for(var p in list.data)
                    {
                        if(obj[t].symbol == list.data[p].symbol)
                        {
                            list.data[p].quantity = obj[t].quantity;
                        }
                    }
                }
                this.setState({selectedRowKeys:this.state.selectedRowKeys, loading:this.state.loading, data: list.data});
              })
          })
  }
  
    render() {
      const columns = [
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            render: text => <a href={"/stockdetail/" + {text}}>{text}</a>,
            ...this.getColumnSearchProps('symbol'),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            ...this.getColumnSearchProps('name'),

        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
          title: 'Day Change',
          dataIndex: 'day_change',
      },
      {
        title: 'Change Percent',
        dataIndex: 'change_pct',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
      }
      ];
      return (
        <div>
          <Nav />
          <Table columns={columns} dataSource={this.state.data} />
        </div>
      );
    }
  }
  
export default StockUserList;