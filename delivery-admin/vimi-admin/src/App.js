import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class App extends Component {
  state = {orders: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(orders => this.setState({ orders }));
  }

  render() {

    const data = this.state.orders;
   
    const columns = [{
      Header: 'Name',
      accessor: 'user' // String-based value accessors! 
    }, {
      Header: 'Meal',
      accessor: 'meal'
    }]


    return (
      <div className="App">
        <h2> Orders </h2>
        <ReactTable data={data} columns={columns} />
      </div>      
    );
  }
}

export default App;
