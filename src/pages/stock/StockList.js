import React from 'react';
import { Table, Button, Input, Icon } from 'antd';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Nav from '../../components/navigation';


class StockList extends React.Component {
    state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      data: [],
      searchText: '',
      searchedColumn: '',
      redirect: false
    };

    setRedirect = () => {
      this.setState({redirect: true});
  }

  renderRedirect = () => {
      if (this.state.redirect) {
          return <Redirect to='/stockdetail' />
      }
  }
  
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

    onClick = text => {
      //this.setState({redirect: true});
    }

    componentDidMount(){
      console.log("get stock list");
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      };
      const param = {};
      axios.get('http://localhost:80/stock/name/all', param, config)
          .then(response => {
              console.log(response.data.stocks);
              var obj = response.data.stocks;
              var param = [];
              for(var t in obj)
              {
                param.push({"symbol": obj[t].symbol});
              }
              var data = {"data": param};
              console.log(data);
              axios.post("http://localhost:8081/stock/v1/current", data)
              .then(reponse => {
                return reponse.data;
              })
              .then(list => {
                this.setState({data: list.data});
              })
          })
  }
  
    render() {
      const columns = [
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            render: text => <a href={"/stockdetail/"+text}>{text}</a>,
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
      }
      ];
      return (
        <div>
          {this.renderRedirect}
          <Nav />
          <Table columns={columns} dataSource={this.state.data} />
        </div>
      );
    }
  }
  
export default StockList;