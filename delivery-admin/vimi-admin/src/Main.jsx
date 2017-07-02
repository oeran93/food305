import React from 'react'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Switch, Route } from 'react-router-dom'


export class Main extends React.Component {
  state = {orders: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(orders => this.setState({ orders }));
  }

  render () {
  	const data = this.state.orders;
   	console.log(data);
    const User_Columns = [{
      Header: 'Name',
      accessor: 'user' // String-based value accessors! 
    }, {
      Header: 'Meal',
      accessor: 'meal'
    }]

    const Res_Columns = [{
      Header: 'Name',
      accessor: 'name' // String-based value accessors! 
    }, {
      Header: 'Amount',
      accessor: 'amount'
    }]

    var counts = {};
    for (var i = 0; i < data.length; i++){
    	var meal = data[i].meal;
    	
      var count = counts[meal] ? counts[meal][meal]+1 : 1;

      var obj = {};
      obj[meal] = count;

    	counts[meal] = obj;
    }
    var Orders_Today = []
     for (var key in counts){
      Orders_Today.push({name: key, amount: counts[key][key]});
     }

    console.log(Orders_Today);

    return (
    	<div>
	    	<ReactTable data={Orders_Today} columns={Res_Columns} />
	    	<ReactTable data={data} columns={User_Columns} />
    	</div>
    )
  }

}

